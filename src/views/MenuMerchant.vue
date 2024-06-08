<template>
    <v-app>
        <v-card class="ma-2">
            <v-card-title class="my-2 mx-2">
                <v-row>
                    <v-card-title>
                        Daftar Menu
                    </v-card-title>
                    <v-spacer></v-spacer>
                    <v-card-title>
                        <v-btn-toggle variant="outlined" divided>
                            <v-btn @click="ModalTambahMenu"> <v-icon icon="mdi-plus"
                                    color="blue-darken-2"></v-icon></v-btn>
                            <v-btn><v-icon icon="mdi-export" color="blue-darken-2"></v-icon></v-btn>
                        </v-btn-toggle>
                    </v-card-title>
                </v-row>
            </v-card-title>
            <v-card-item>
                <v-table>
                    <thead>
                        <tr>
                            <th class="text-left">
                                Nama menu
                            </th>
                            <th class="text-left">
                                Harga
                            </th>
                            <th class="text-left">
                                Deskripsi
                            </th>
                            <th class="text-center">
                                Foto
                            </th>
                            <th class="text-center">
                                Edit
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="i in menumerchant" :key="i">
                            <td>{{ i.nama }}</td>
                            <td>{{ i.harga }}</td>
                            <td>{{ i.deskripsi }}</td>
                            <td>
                                <img :src="i.foto_url" alt="Foto Menu" v-if="i.foto_url" width="100">
                            </td>
                            <td>
                                <v-btn-toggle>
                                    <v-btn size="x-small" @click="ModalEditMenu(i)"><v-icon icon="mdi-pencil"
                                            color="blue-darken-2"></v-icon></v-btn>
                                    <v-btn size="x-small"><v-icon icon="mdi-eraser"
                                            color="blue-darken-2"></v-icon></v-btn>
                                </v-btn-toggle>
                            </td>
                        </tr>
                    </tbody>
                </v-table>
            </v-card-item>
        </v-card>
        <v-dialog v-model="dialog" max-width="600">
            <v-card prepend-icon="mdi-view-dashboard" title="Edit Profil">
                <v-card-text>
                    <v-form ref="form">
                        <v-row dense>
                            <v-col cols="12" md="4" sm="6">
                                <v-text-field v-model="menu.nama" label="Nama"></v-text-field>
                            </v-col>
                            <v-col cols="12" md="4" sm="6">
                                <v-text-field v-model="menu.harga" label="Harga" type="number"></v-text-field>
                            </v-col>
                            <v-col cols="12" md="4" sm="6">
                                <v-text-field v-model="menu.deskripsi" type="text" label="Deskripsi"
                                    required></v-text-field>
                            </v-col>
                            <v-col cols="12" md="4" sm="6">
                                <v-file-input accept="image/*" v-model="menu.foto" label="File input"
                                    @change="onFileChange"></v-file-input>
                            </v-col>
                            <v-col cols="12" md="4" sm="6" v-if="previewImage">
                                <img :src="previewImage" alt="Preview" width="200">
                            </v-col>
                        </v-row>
                    </v-form>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text="Tutup" variant="plain" @click="dialog = false"></v-btn>
                    <v-btn v-if="simpan" color="primary" text="Simpan" variant="tonal" @click="addmenu"></v-btn>
                    <v-btn v-if="!simpan" color="primary" text="Simpan perubahan" variant="tonal"
                        @click="addmenu"></v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <template>
            <div>
                <v-overlay :model-value="overlay" class="align-center justify-center">
                    <v-progress-circular color="primary" size="64" indeterminate></v-progress-circular>
                </v-overlay>
            </div>
        </template>
    </v-app>
</template>
<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
    data() {
        return {
            user: JSON.parse(localStorage.getItem('user')),
            menu: {
                nama: '',
                harga: '',
                deskripsi: '',
                foto: '',
                kode_merchant: ''
            },
            dialog: false,
            menumerchant: [],
            uploadedMenu: null,
            api: process.env.VITE_APP_API_BASE_URL,
            previewImage: null,
            simpan: true,
            overlay: false
        }
    },
    methods: {
        onFileChange(event) {
            const file = event.target.files[0];
            console.log(file)
            if (file) {
                this.menu.foto = file;
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.previewImage = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        },
        async addmenu() {
            this.overlay = true
            const formData = new FormData();
            formData.append('nama', this.menu.nama);
            formData.append('harga', this.menu.harga);
            formData.append('deskripsi', this.menu.deskripsi);
            formData.append('foto', this.menu.foto);
            formData.append('kode_merchant', this.menu.kode_merchant);

            try {
                let api = this.api
                let response;
                if (this.menu.id) {
                    formData.append('_method', 'PUT');
                    response = await axios.post(`${api}/api/merchant/update/menu/${this.menu.id}`, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    });
                } else {
                    response = await axios.post(`${api}/api/merchant/add/menu`, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    });
                }
                this.overlay = false
                this.getmenu();
                console.log(response.data);
                this.dialog = false
                Swal.fire("Tersimpan!", "Menu berhasil disimpan", "success");
                this.uploadedMenu = response.data.menu;
                // this.uploadedMenu.foto_url = response.data.foto_url;
                this.resetForm();
            } catch (error) {
                this.overlay = false
                this.dialog = false
                console.error(error);
                Swal.fire("Gagal!", "Menu tidak dapat disimpan", "error");
            }
        },
        ModalTambahMenu() {
            this.simpan = true
            this.dialog = true
            this.menu.kode_merchant = this.user.id
        },
        ModalEditMenu(i) {
            this.simpan = false
            this.dialog = true
            this.menu = { ...i };
            this.previewImage = i.foto_url;
        },
        simpan_edit() {
            console.log(this.menu)
        },
        async getmenu() {
            let id = this.user.id
            let api = this.api
            this.overlay = true

            try {
                const response = await axios.post(`${api}/api/merchant/get/menu/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                // console.log(response.data.)
                this.menumerchant = response.data.map(menu => {
                    return {
                        ...menu,
                        foto_url: menu.foto ? `${api}/storage/fotos/${menu.foto}` : null
                    };
                });
                this.overlay = false

            } catch (error) {
                console.log(error)
                this.overlay = false

            }
        },
        resetForm() {
            this.menu = {
                id: null,
                nama: '',
                harga: '',
                deskripsi: '',
                foto: null,
                kode_merchant: '4',
                foto_url: null
            };
            this.previewImage = null;
        }
    },
    mounted() {
        this.getmenu();
    },
}
</script>

<style scoped>
img {
    max-width: 100%;
    height: auto;
}
</style>