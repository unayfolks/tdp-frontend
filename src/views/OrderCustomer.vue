<template>
    <div>
        <v-card class="ma-2">
            <v-card-title>Daftar Orderan Kamu</v-card-title>
        </v-card>
        <v-card class="ma-2">
            <v-card-item>
                <v-table>
                    <thead>
                        <tr>
                            <th>Kode tansaksi</th>
                            <th>Tanggal</th>
                            <th>Alamat</th>
                            <th>Detail</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="i in order" :key="i">
                            <td>{{ i.kode_transaksi }}</td>
                            <td>{{ i.tanggal }}</td>
                            <td>{{ i.alamat_kirim }}</td>
                            <td>
                                <v-btn @click="cekdetail(i)">cek detail</v-btn>
                            </td>
                        </tr>
                    </tbody>
                </v-table>
            </v-card-item>
        </v-card>
        <v-dialog v-model="dialog" max-width="1000">
            <v-card prepend-icon="mdi-food-variant" title="Detail order">
                <v-card-item>
                    <v-table>
                        <thead>
                            <tr>
                                <th>Merchant</th>
                                <th>Makanan</th>
                                <th>Harga</th>
                                <th class="text-center">Jumlah</th>
                                <th>Subtotal</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="i in detail_order" :key="i">
                                <td>{{ i.nama_perusahaan }}</td>
                                <td>{{ i.pesanan }}</td>
                                <td>{{ i.harga }}</td>
                                <td>{{ i.jumlah }}</td>
                                <td>{{ i.subtotal }}</td>
                                <td>{{ i.status }}</td>
                            </tr>
                        </tbody>
                    </v-table>
                </v-card-item>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text="Tutup" variant="plain" @click="dialog = false"></v-btn>
                    <!-- <v-btn color="primary" text="Cekout" variant="tonal"></v-btn> -->
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
    </div>
</template>
<script>
import axios from 'axios';

export default {
    data() {
        return {
            api: process.env.VITE_APP_API_BASE_URL,
            user: JSON.parse(localStorage.getItem('user')),
            order: [],
            overlay: false,
            dialog: false,
            detail_order: []
        }
    },
    computed:{

    },
    methods: {
        
        async get_order() {
            this.overlay = true
            const api = this.api
            const id = this.user.id
            try {
                const response = await axios.post(`${api}/api/customer/get/order/${id}`, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                this.order = response.data
                this.overlay = false
            } catch (error) {
                console.log(error)
                this.overlay = false
            }
        },
        async cekdetail(i) {
            const kode = i.kode_transaksi
            console.log(kode)
            this.overlay = true
            const api = this.api
            try {
                const response = await axios.post(`${api}/api/customer/get/detail_order/${kode}`, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                this.dialog = true
                this.detail_order = response.data
                this.overlay = false
            } catch (error) {
                this.overlay = false
                console.log(error)
            }
        }
    },
    mounted() {
        this.get_order();
    },
}
</script>