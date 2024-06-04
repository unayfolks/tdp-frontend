<template>
    <v-layout>
        <v-app>
            <v-card class="bg-deep-purple my-2 mx-2"  >
                <v-toolbar color="transparent">
                    <template v-slot:prepend>
                        <v-btn icon="$menu" @click.stop="drawer = !drawer"></v-btn>
                    </template>
                    <v-toolbar-title class="text-h6" >Welcome {{ user.name }}</v-toolbar-title>
                    <template v-slot:append>
                        <v-btn icon="mdi-dots-vertical"></v-btn>
                    </template>
                </v-toolbar>
            </v-card>
            <v-navigation-drawer v-model="drawer" :location="$vuetify.display.mobile ? 'left' : undefined" temporary
                class="bg-deep-purple  rounded" theme="dark">
                <v-list color="transparent">
                    <v-list-item prepend-icon="mdi-view-dashboard" title="Dashboard">
                        <RouterLink to="/dashboard">Halaman utama</RouterLink>
                    </v-list-item>
                    <v-list-item prepend-icon="mdi-package-variant" title="Barang">
                        <RouterLink to="/about">Manajemen barang</RouterLink>
                    </v-list-item>
                    <v-list-item prepend-icon="mdi-sale" title="Transaksi">
                        <RouterLink to="/transaksi">Memulai transaksi</RouterLink>
                    </v-list-item>
                </v-list>
                <template v-slot:append>
                    <div class="pa-2">
                        <v-btn block @click="logout">
                            Logout
                        </v-btn>
                    </div>
                </template>
            </v-navigation-drawer>
            <v-main>
                <router-view></router-view>
            </v-main>
        </v-app>
    </v-layout>
</template>
<script>
import AppBar from '../components/AppBar.vue'
import { jwtDecode } from 'jwt-decode';

export default {
    data() {
        return {
            user: JSON.parse(localStorage.getItem('user')),
            drawer: false,
            group: null,
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
                    alert('Sesion telah habis, . . . ')
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    this.$router.push('/login');
                }
            }
        },
        logout() {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            this.$router.push('/login');
        }
    },
    mounted() {
        if (!this.isAuthenticated) {
            this.$router.push('/login');
        }
        this.checkTokenExpiry();
        this.tokenCheckInterval = setInterval(this.checkTokenExpiry, 5000);
    },
    beforeDestroy() {
        clearInterval(this.tokenCheckInterval);
    },
}
</script>