<template>
    <div>
        <v-card class="ma-2">
            <v-card-title class="ma-2">
                <v-row>
                    <div class="ma-2">
                        Profil
                    </div>
                    <v-spacer/>
                    <v-btn class="ma-2" @click="EditProfil">Edit</v-btn>
                </v-row>
            </v-card-title>
            <v-card-item class="ma-2">
                <v-card class="ma-2">
                        <v-row class="ma-2">
                            <h3>Nama :</h3>
                            <h3>{{ user.name }}</h3>
                        </v-row>
                </v-card>
                <v-card class="ma-2">
                        <v-row class="ma-2">
                            <h3>Email :</h3>
                            <h3>{{ user.email }}</h3>
                        </v-row>
                </v-card>
                <v-card class="ma-2">
                        <v-row class="ma-2">
                            <h3>Alamat :</h3>
                            <h3>{{ user.alamat }}</h3>
                        </v-row>
                </v-card>
                <v-card class="ma-2">
                        <v-row class="ma-2">
                            <h3>No hp :</h3>
                            <h3>{{ user.nohp }}</h3>
                        </v-row>
                </v-card>
                <v-card class="ma-2">
                        <v-row class="ma-2">
                            <h3>Nama perusahaan / usaha :</h3>
                            <h3>{{ user.nama_perusahaan }}</h3>
                        </v-row>
                </v-card>
                <v-card class="ma-2">
                        <v-row class="ma-2">
                            <h3>Deskripsi :</h3>
                            <h3>{{ user.deskripsi }}</h3>
                        </v-row>
                </v-card>
            </v-card-item>
        </v-card>
        <v-dialog v-model="dialog" max-width="600">
            <v-card prepend-icon="mdi-view-dashboard" title="Edit Profil">
                <v-card-text>
                    <v-form ref="form">
                        <v-row dense>
                            <v-col cols="12" md="4" sm="6">
                                <v-text-field v-model="profil.name" label="Nama"></v-text-field>
                            </v-col>
                            <v-col cols="12" md="4" sm="6">
                                <v-text-field v-model="profil.email" label="Email" type="email"></v-text-field>
                            </v-col>
                            <v-col cols="12" md="4" sm="6">
                                <v-text-field v-model="profil.nohp" label="No Hp"></v-text-field>
                            </v-col>
                            <v-col cols="12" md="4" sm="6">
                                <v-text-field v-model="profil.nama_perusahaan" label="Nama Perusahaan"></v-text-field>
                            </v-col>
                            <v-col cols="12" md="4" sm="6">
                                <v-text-field v-model="profil.alamat" type="text" label="Alamat"
                                    required></v-text-field>
                            </v-col>
                            <v-col cols="12" md="4" sm="6">
                                <v-text-field v-model="profil.deskripsi" type="text" label="Deskripsi"
                                    required></v-text-field>
                            </v-col>
                        </v-row>
                    </v-form>
                    <small class="text-caption text-medium-emphasis">*Pastikan semua field terisi</small>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text="Tutup" variant="plain" @click="dialog = false"></v-btn>
                    <v-btn color="primary" text="Simpan perubahan" variant="tonal" @click="simpan_edit"></v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
import axios from 'axios';
import Swal from 'sweetalert2';
export default {
    data() {
        return {
            user: JSON.parse(localStorage.getItem('user')),
            dialog: false,
            profil: {
                name: '',
                nama_perusahaan: '',
                nohp: '',
                email: '',
                alamat: '',
                deskripsi: ''
            },
            apiUrl: process.env.VITE_APP_API_BASE_URL,

        };
    },
    methods: {
        EditProfil() {
            this.dialog = true
            this.profil.name = this.user.name,
                this.profil.email = this.user.email,
                this.profil.nohp = this.user.nohp,
                this.profil.nama_perusahaan = this.user.nama_perusahaan,
                this.profil.alamat = this.user.alamat,
                this.profil.deskripsi = this.user.deskripsi
        },
        async simpan_edit() {
            console.log(this.user.id)
            let id = this.user.id
            try {
                const res = await axios.put(`http://localhost:8000/api/merchant/edit/profil/${id}`, this.profil, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                this.user = {...this.user, ...this.profil};
                localStorage.setItem('user', JSON.stringify(this.user));
                this.dialog = false
                Swal.fire("Tersimpan!", "Success", "Profil berhasil diubah");
            } catch (error) {
                console.log(error)
            }
        },

    },
}
</script>