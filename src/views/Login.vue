<template>
    <v-container fluid class="d-flex justify-center align-center ma-0 pa-0" style="height: 100vh; width: 100vw;">
        <v-img class="d-flex justify-center align-center ma-0" src="/src/assets/img/bakery.jpg" cover aspect-ratio="1" style="height: 100%; width: 100%;">
            <v-col cols="12">
                <v-card class=" mx-auto " style="max-width: 500px;">
                    <v-toolbar  cards dark flat>
                        <v-img src="/src/assets/img/backgrunddrawercustomer.jpg" cover>

                            <v-card-title class="text-h6 font-weight-regular " color="black">
                                <v-btn icon>
                                    <RouterLink to="/"><v-icon>mdi-arrow-left</v-icon></RouterLink>
                                </v-btn>
                                Sign in
                            </v-card-title>
                            <v-spacer></v-spacer>
                        </v-img>
                    </v-toolbar>
                    <v-form ref="form" v-model="isValid" class="pa-4 pt-6">
                        <v-text-field v-model="email" :rules="[rules.email]" color="deep-purple" label="Email address"
                            type="email" variant="filled"></v-text-field>
                        <v-text-field v-model="password" :rules="[rules.password, rules.length(6)]" color="deep-purple"
                            counter="6" label="Password" style="min-height: 96px" type="password"
                            variant="filled"></v-text-field>
                    </v-form>
                    <v-divider></v-divider>
                    <v-card-actions>
                        <v-btn variant="text" @click="form.reset()">
                            Clear
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-btn :disabled="!isValid" :loading="isLoading" color="deep-purple-accent-4" @click="login">
                            Submit
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
            <template>
                <div>
                    <v-overlay :model-value="overlay" class="align-center justify-center">
                        <v-progress-circular color="primary" size="64" indeterminate></v-progress-circular>
                    </v-overlay>
                </div>
            </template>
        </v-img>
    </v-container>
</template>

<script>
import api from '../services/api'

export default {
    name: 'Login',
    data() {
        return {
            email: '',
            password: '',
            agreement: false,
            bio: 'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts',
            dialog: false,
            email: undefined,
            isValid: false,
            isLoading: false,
            password: undefined,
            phone: undefined,
            rules: {
                email: v => !!(v || '').match(/@/) || 'Please enter a valid email',
                length: len => v => (v || '').length >= len || `Invalid character length, required ${len}`,
                // password: v => !!(v || '').match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/) ||
                //     'Password must contain an upper case letter, a numeric character, and a special character',
                required: v => !!v || 'This field is required',
                password: v => !!v || 'This field is required'
            },
            overlay: false
            // api: process.env.VITE_APP_API_BASE_URL
        };
    },
    methods: {
        async login() {
            this.overlay = true
            try {
                const response = await api.post('/api/login', {
                    email: this.email,
                    password: this.password
                });

                this.overlay = false
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
                let c = response.data.user.user_role
                if (c == 'Customer') {
                    this.$router.push('/dashboard_customer');
                } else {
                    this.$router.push('/dashboard_merchant');
                }
            } catch (error) {
                this.overlay = false
                console.error(error);
                alert('Invalid credentials');
            }
        }
    }
};
</script>
