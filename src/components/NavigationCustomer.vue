<template>
    <v-layout class="ma-0 pa-0">
        <v-app v-if="customer">
            <v-card class="bg-deep-purple my-2 mx-2">
                <v-toolbar color="transparent">
                    <template v-slot:prepend>
                        <v-btn icon="$menu" @click.stop="drawer = !drawer"></v-btn>
                    </template>
                    <v-toolbar-title class="text-h6">Welcome {{ user.user_role }} {{ user.name }}</v-toolbar-title>
                    <template v-slot:append>
                        <v-btn icon="mdi-dots-vertical"></v-btn>
                    </template>
                </v-toolbar>
            </v-card>
            <v-navigation-drawer  v-model="drawer"
                :location="$vuetify.display.mobile ? 'left' : undefined" temporary class="bg-deep-purple  rounded"
                theme="dark">
                <v-list color="transparent">
                    <v-list-item prepend-icon="mdi-view-dashboard" title="Dashboard">
                        <RouterLink to="/dashboard_customer">Dashboard</RouterLink>
                    </v-list-item>
                    <v-list-item prepend-icon="mdi-account-tie" title="Profil">
                        <RouterLink to="/profil_customer">Profil</RouterLink>
                    </v-list-item>
                    <v-list-item prepend-icon="mdi-food" title="Katering">
                        <RouterLink to="/pesan_katering">Pesan</RouterLink>
                    </v-list-item>
                    <v-list-item prepend-icon="mdi-order-bool-descending-variant" title="Order">
                        <RouterLink to="/order_customer">Daftar pesanan</RouterLink>
                    </v-list-item>
                    <v-list-item>
                        <div class="pa-2">
                            <v-btn block @click="logout">
                                Logout
                            </v-btn>
                        </div>
                    </v-list-item>
                </v-list>
            </v-navigation-drawer>
            <v-main>
                <router-view></router-view>
            </v-main>
        </v-app>
        <v-app v-if="!customer">
            <v-card class="bg-deep-purple my-2 mx-2">
                <v-toolbar color="transparent">
                    <template v-slot:prepend>
                        <v-btn icon="$menu" @click.stop="drawer = !drawer"></v-btn>
                    </template>
                    <v-toolbar-title class="text-h6">Welcome {{ user.user_role }} {{ user.name }}</v-toolbar-title>
                    <template v-slot:append>
                        <v-btn icon="mdi-dots-vertical"></v-btn>
                    </template>
                </v-toolbar>
            </v-card>
            <v-navigation-drawer  v-model="drawer"
                :location="$vuetify.display.mobile ? 'left' : undefined" temporary class="bg-deep-purple  rounded"
                theme="dark">
                <v-list color="transparent">
                    <v-list-item prepend-icon="mdi-view-dashboard" title="Dashboard">
                        <RouterLink to="/dashboard_merchant">Dashboard</RouterLink>
                    </v-list-item>
                    <v-list-item prepend-icon="mdi-account-tie" title="Dashboard">
                        <RouterLink to="/profil_merchant">Profil Merchant</RouterLink>
                    </v-list-item>
                    <v-list-item prepend-icon="mdi-food" title="Menu">
                        <RouterLink to="/menu_merchant">Manajemen Menu </RouterLink>
                    </v-list-item>
                    <v-list-item prepend-icon="mdi-order-bool-descending-variant" title="Order">
                        <RouterLink to="/order_merchant">Daftar order</RouterLink>
                    </v-list-item>
                    <v-list-item>
                        <div class="pa-2">
                            <v-btn block @click="logout">
                                Logout
                            </v-btn>
                        </div>
                    </v-list-item>
                </v-list>
            </v-navigation-drawer>
            <v-main>
                <router-view></router-view>
            </v-main>
        </v-app>
    </v-layout>
</template>
<script>
import { jwtDecode } from 'jwt-decode';
import Swal from 'sweetalert2';

export default {
    data() {
        return {
            user: JSON.parse(localStorage.getItem('user')),
            drawer: false,
            group: null,
            customer: true
        };
    },
    watch: {
        group() {
            this.drawer = false
        },
    },
    computed: {
        isAuthenticated() {
            return !!localStorage.getItem('token');
        }
    },
    methods: {

        checkTokenExpiry() {
            const token = localStorage.getItem('token');
            if (token) {
                const decodedToken = jwtDecode(token);
                const currentTime = Date.now() / 1000;
                if (decodedToken.exp < currentTime) {
                    Swal.fire("Informasi!", "session sudah habis, silahkan login kembali", "info");
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    this.$router.push('/');
                }
            }
        },
        logout() {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            this.$router.push('/');
        }
    },
    mounted() {
        console.log(this.user.user_role)
        if (!this.isAuthenticated) {
            this.$router.push('/login');
        }
        this.checkTokenExpiry();
        this.tokenCheckInterval = setInterval(this.checkTokenExpiry, 5000);
        if (this.user.user_role == 'Customer') {
            this.customer = true
        } else {
            this.customer = false
        }
    },
    beforeDestroy() {
        clearInterval(this.tokenCheckInterval);
    },
}
</script>