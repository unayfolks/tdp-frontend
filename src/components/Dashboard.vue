<template>
    <div>
        <v-card class="bg-deep-purple my-2 mx-2">
            <v-toolbar color="transparent">
                <!-- <template v-slot:prepend>
                    <v-btn icon="$menu" @click.stop="drawer = !drawer"></v-btn>
                </template> -->
                <v-toolbar-title class="text-h6">Welcome </v-toolbar-title>

            </v-toolbar>
        </v-card>
        <v-card class="bg-deep-purple my-2 mx-2" >
            <v-img class="align-center text-white" height="200" src="/src/assets/img/bakery.jpg"
                cover>
                <v-card-title>Selamat datang di Marketplace Katering</v-card-title>
            </v-img>
            
        </v-card>
        <v-card class="bg-deep-purple my-2 mx-2">
            <v-row dense>
                <v-col class=" justify-space-around" cols="12" md="4" lg="2">
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
                <v-col>
                    <v-card max-width="4000" class="ma-2">
                        <v-card-title class="ma-2">
                            <v-row class="align-center">
                                <div>
                                    Daftar sebagai customer
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
                <v-col>
                    <v-card max-width="4000" class="ma-2">
                        <v-card-title class="ma-2">
                            <v-row class="align-center">
                                <div>
                                    Daftar sebagai merchant
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
    </div>
</template>