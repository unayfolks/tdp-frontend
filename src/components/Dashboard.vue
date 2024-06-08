<template>
    <v-app>
        <v-card class="bg-deep-purple my-2 mx-2">
            <v-toolbar color="transparent">
                <v-toolbar-title class="text-h6">Marketplace Katering </v-toolbar-title>
            </v-toolbar>
        </v-card>
        <v-card class="bg-deep-purple my-2 mx-2">
            <v-img class="align-center text-white" height="200" src="/src/assets/img/bakery.jpg" cover>
                <v-card-title>Selamat datang di Marketplace Katering</v-card-title>
            </v-img>
        </v-card>
        <v-card class="bg-deep-purple my-2 mx-2">
            <v-row dense class="pa-2 d-flex align-center justify-center">
                <v-col  cols="12" md="4" lg="8">
                    <v-card max-width="4000" class="ma-2">
                        <v-card-title class="ma-2">
                            <v-row class="align-center">
                                <div>
                                    Login
                                </div>
                                <v-spacer />
                                <RouterLink to="/login">
                                    <v-btn class="ma-2" color="orange">
                                        <v-icon aria-hidden="false">mdi-arrow-right</v-icon>
                                    </v-btn>
                                </RouterLink>
                            </v-row>
                        </v-card-title>
                    </v-card>
                </v-col>
                <v-col cols="12" md="4" lg="8">
                    <v-card max-width="4000" class="ma-2">
                        <v-card-title class="ma-2">
                            <v-row class="align-center">
                                <div>
                                    Register
                                </div>
                                <v-spacer />

                                <RouterLink to="/register/customer">
                                    <v-btn class="ma-2" color="orange">
                                        <v-icon aria-hidden="false">mdi-arrow-right</v-icon>
                                    </v-btn>
                                </RouterLink>
                            </v-row>
                        </v-card-title>
                    </v-card>
                </v-col>
                <v-col cols="12" md="4" lg="8">
                    <v-card max-width="4000" class="ma-2">
                        <v-card-title class="ma-2">
                            <v-row class="align-center">
                                <div>
                                    Daftar merchant
                                </div>
                                <v-spacer />
                                <RouterLink to="/register/merchant">
                                    <v-btn class="ma-2" color="orange">
                                        <v-icon aria-hidden="false">mdi-arrow-right</v-icon>
                                    </v-btn>
                                </RouterLink>
                            </v-row>
                        </v-card-title>
                    </v-card>
                </v-col>
            </v-row>
        </v-card>

        <v-footer class="bg-deep-purple my-2 mx-2 rounded text-center d-flex flex-column justify-end">
            <div>
                stay connect
            </div>
            <v-divider></v-divider>
            <div>
                <v-btn v-for="(icon, index) in icons" :key="icon.name" :icon="icon.icon" class="mx-4" :href="icon.link"
                    target="_blank" variant="text"></v-btn>
            </div>
            <v-divider></v-divider>
            <div>
                {{ new Date().getFullYear() }} — <strong> <a href="http://www.ellcodes.com">ellcodes.com</a></strong>
            </div>
        </v-footer>
    </v-app>
</template>
<script>
export default {
    data: () => ({
        icons: [
            { icon: 'mdi-facebook', link: 'https://web.facebook.com/raun.ali.921/' },
            { icon: 'mdi-git', link: 'https://discord.gg/mgzs6qDjFq' },
            { icon: 'mdi-github', link: 'https://github.com/unayfolks' },
            { icon: 'mdi-instagram', link: 'https://www.instagram.com/unay123456789/' },
        ],
    }),
}
</script>