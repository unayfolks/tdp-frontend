<template>
    <v-container fluid class="d-flex justify-center align-center" style="height: 100vh;">
        <!-- <v-row align="center" justify="center"> -->
        <v-col cols="12" sm="8" md="6" lg="4">
            <v-card class=" mx-auto " style="max-width: 500px;">
                <v-toolbar color="deep-purple-accent-2" cards dark flat>
                    <v-btn icon>
                        <RouterLink to="/"><v-icon>mdi-arrow-left</v-icon></RouterLink>
                        
                    </v-btn>
                    <v-card-title class="text-h6 font-weight-regular">
                        Sign in
                    </v-card-title>
                    <v-spacer></v-spacer>
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
        <!-- </v-row> -->
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
            // api: process.env.VITE_APP_API_BASE_URL

        };
    },
    methods: {
        async login() {
            try {
                const response = await api.post('/api/login', {
                    email: this.email,
                    password: this.password
                });

                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
                let c = response.data.user.user_role
                if (c == 'Customer') {
                    this.$router.push('/dashboard_customer');
                } else {
                    this.$router.push('/dashboard_merchant');
                }
            } catch (error) {
                console.error(error);
                alert('Invalid credentials');
            }
        }
    }
};
</script>
