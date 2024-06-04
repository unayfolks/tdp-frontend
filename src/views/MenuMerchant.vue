<template>
    <div>
        <v-card class="ma-2">
            <v-card-title class="my-2 mx-2">
                <v-row>
                    <v-card-title>
                        Daftar <Menu></Menu>
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
                            <th>
                                No
                            </th>
                            <th class="text-left">
                                Nama menu
                            </th>
                            <th class="text-left">
                                Harga
                            </th>
                            <th class="text-left">
                                Deskripsi
                            </th>
                        </tr>
                    </thead>
                    <tbody> 
                        <tr v-for="i in menumerchant" :key="i">
                            <td>{{ i.id }}</td>
                            <td>{{ i.nama }}</td>
                            <td>{{ i.harga }}</td>
                            <td>{{ i.deskripsi}}</td>
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
                        </v-row>
                    </v-form>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text="Tutup" variant="plain" @click="dialog = false"></v-btn>
                    <v-btn color="primary" text="Simpan perubahan" variant="tonal" @click="addmenu"></v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
import axios from 'axios';

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
            dialog:false,
            menumerchant:[]
        }
    },
    methods: {
        async addmenu() {
            
            try {
                const menu = await axios.post(`http://localhost:8000/api/merchant/add/menu`, this.menu, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                console.log(menu)
                Swal.fire("Tersimpan!", "Success", "Profil berhasil diubah");
            } catch (error) {
                console.log(error)
            }
        },
        ModalTambahMenu() {
            this.dialog = true
            this.menu.kode_merchant = this.user.id
        },
        simpan_tambah(){
            console.log(this.menu)
        },
        async getmenu(){
            let id = this.user.id
            try {
                const mn = await axios.post(`http://localhost:8000/api/merchant/get/menu/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                const data = await mn
                this.menumerchant = data.data

                console.log(data)
            } catch (error) {
                console.log(error)
            }
        }
    },
    mounted() {
        this.getmenu();
    },
}
</script>