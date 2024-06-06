<template>
    <v-container fluid class="d-flex justify-center align-center" style="height: 100vh;">
        <v-col cols="12" sm="8" md="6" lg="4">
            <v-card class="mx-auto" style="max-width: 500px;">
                <v-toolbar color="deep-purple-accent-2" dark flat>
                    <v-btn icon>
                        <RouterLink to="/"><v-icon>mdi-arrow-left</v-icon></RouterLink>
                    </v-btn>
                    <v-card-title class="text-h6 font-weight-regular">
                        Daftar sebagai merchant
                    </v-card-title>
                    <v-spacer></v-spacer>
                </v-toolbar>
                <v-form ref="form" v-model="isValid" class="pa-4 pt-6">
                    <v-text-field v-model="name" :rules="[rules.required]" color="deep-purple" label="Nama" type="text"
                        variant="filled"></v-text-field>
                    <v-text-field v-model="email" :rules="[rules.email]" color="deep-purple" label="Alamat Email"
                        type="email" variant="filled"></v-text-field>
                    <v-text-field v-model="password" :rules="[rules.password, rules.length(6)]" color="deep-purple"
                        counter="6" label="Kata Sandi" style="min-height: 96px" type="password"
                        variant="filled"></v-text-field>
                    <v-text-field v-model="password_confirmation" :rules="[rules.password, rules.length(6)]"
                        color="deep-purple" counter="6" label="Konfirmasi Kata Sandi" style="min-height: 96px"
                        type="password" variant="filled"></v-text-field>
                </v-form>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-btn variant="text" @click="form.reset()">
                        Bersihkan
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn :disabled="!isValid" :loading="isLoading" color="deep-purple-accent-4" @click="register">
                        Daftar
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-container>
</template>

<script>
import api from '../services/api'

export default {
    name: 'Register',
    data() {
        return {
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
            user_role: 'Merchant',
            isValid: false,
            isLoading: false,
            rules: {
                email: v => !!(v || '').match(/@/) || 'Masukkan email yang valid',
                length: len => v => (v || '').length >= len || `Panjang karakter harus minimal ${len}`,
                required: v => !!v || 'Kolom ini harus diisi',
                password: v => !!v || 'Kolom ini harus diisi'
            },
        };
    },
    methods: {
        async register() {
            this.isLoading = true;
            try {
                const response = await api.post('/api/register', {
                    name: this.name,
                    email: this.email,
                    password: this.password,
                    password_confirmation: this.password_confirmation,
                    user_role: 'Merchant',
                });
                alert('Pendaftaran berhasil');
                this.$router.push('/login');
                this.isLoading = false;
            } catch (error) {
                console.error(error);
                alert('Pendaftaran gagal');
                this.isLoading = false;
            }
        }
    }
};
</script>
