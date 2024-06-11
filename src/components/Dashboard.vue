<template>
    <v-app>
        <v-sheet class="my-2 mx-2 rounded " style="box-shadow: 5px 5px black;" hover>
            <v-card class="bg-deep-purple  ">
                <v-toolbar color="transparent">
                    <v-toolbar-title class=" custom-font"
                        style="text-shadow: 2px 2px black; font-weight: bolder">Marketplace Katering </v-toolbar-title>
                </v-toolbar>
            </v-card>
        </v-sheet>
        <v-sheet class="my-2 mx-2 rounded  "  style="box-shadow: 5px 5px black;">
            <v-card class="bg-deep-purple " border="black xl">
                <v-parallax class="align-center text-white" height="200" :src="imageUrl" cover>
                    <v-card-title class="overflow-hidden custom-font"
                        style="text-shadow: 2px 2px black; color: white; font-weight: bolder;">Selamat datang di
                        Marketplace Katering</v-card-title>
                </v-parallax>
            </v-card>
        </v-sheet>
        <v-sheet class="my-2 mx-2 rounded " style="box-shadow: 5px 5px black;">
            <v-card class="bg-deep-purple ">
                <v-row dense class="pa-2 d-flex align-center justify-center">
                    <v-col cols="12" md="4" lg="8">
                        <v-card max-width="4000" class="ma-2 bg-deep-purple-lighten-1" hover elevation-0>
                            <v-card-title class="ma-2 ">
                                <v-row class="align-center">
                                    <div class="custom-font"
                                        style="text-shadow: 2px 2px black; color: white; font-weight: bolder;">
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
                        <v-card max-width="4000" class="ma-2 bg-deep-purple-lighten-1" hover elevation-0>
                            <v-card-title class="ma-2 ">
                                <v-row class="align-center">
                                    <div class="custom-font"
                                        style="text-shadow: 2px 2px black; color: white; font-weight: bolder;">
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
                        <v-card max-width="4000" class="ma-2 bg-deep-purple-lighten-1" hover elevation-0>
                            <v-card-title class="ma-2 ">
                                <v-row class="align-center">
                                    <div class="custom-font"
                                        style="text-shadow: 2px 2px black; color: white; font-weight: bolder;">
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
        </v-sheet>
        <v-sheet class="my-2 mx-2 rounded " style="box-shadow: 5px 5px black;">

            <v-footer class="bg-deep-purple  rounded text-center d-flex flex-column justify-end">
                <div class="custom-font" style="text-shadow: 2px 2px black; color: white; font-weight: bolder;">
                    stay connect
                </div>
                <v-divider></v-divider>
                <div>
                    <v-btn v-for="(icon, index) in icons" :key="icon.name" :icon="icon.icon" class="mx-4"
                        :href="icon.link" target="_blank" variant="text"></v-btn>
                </div>
                <v-divider></v-divider>
                <div class="custom-font" style="text-shadow: 2px 2px black; ">
                    {{ new Date().getFullYear() }} — <strong> <a href="http://www.ellcodes.com"
                            style="color: white; font-weight: bolder; text-decoration: none;">ellcodes.com</a></strong>
                </div>
            </v-footer>
        </v-sheet>

    </v-app>
</template>
<script>
import bakeryImage from '@/assets/img/bakery.jpg';

export default {
    data: () => ({
        icons: [
            { icon: 'mdi-facebook', link: 'https://web.facebook.com/raun.ali.921/' },
            { icon: 'mdi-git', link: 'https://discord.gg/mgzs6qDjFq' },
            { icon: 'mdi-github', link: 'https://github.com/unayfolks' },
            { icon: 'mdi-instagram', link: 'https://www.instagram.com/unay123456789/' },
        ],
        imageUrl: bakeryImage
    }),
}
</script>
<style>
@font-face {
    font-family: 'xpdr';
    src: url('@/assets/fonts/XPDR_02.TTF') format('truetype');
    /* Sesuaikan format jika menggunakan format lain seperti woff, woff2, atau otf */
    font-weight: bolder;
    /* Bisa juga menggunakan bold, italic, dll */
    font-style: normal;
    /* Bisa juga menggunakan italic */
}

.custom-font {
    font-family: 'xpdr', sans-serif;
}
</style>