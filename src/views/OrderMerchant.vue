<template>
    <div>
        <v-card class="ma-2">
            <v-card-title>Daftar Orderan</v-card-title>
        </v-card>
        <v-card class="ma-2">
            <v-card-item>
                <v-table>
                    <thead>
                        <tr>
                            <th>Kode Transaksi</th>
                            <th>Pemesan</th>
                            <th>Pesanan</th>
                            <th>Jumlah</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="i in order" :key="i">
                            <td>{{ i.kode_transaksi }}</td>
                            <td>{{ i.nama_user }}</td>
                            <td>{{ i.pesanan }}</td>
                            <td>{{i.jumlah}}</td>
                            <td>{{i.status}}</td>
                        </tr>
                    </tbody>
                </v-table>
            </v-card-item>
        </v-card>
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
            user: JSON.parse(localStorage.getItem('user')),
            api: process.env.VITE_APP_API_BASE_URL,
            overlay:false,
            order:[]
        }
    },
    methods: {
        async getorder() {
            this.overlay = true
            const api = this.api
            const id = this.user.nama_perusahaan
            try {
                const response = await axios.post(`${api}/api/merchant/get/order/${id}`, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                this.order = response.data
                this.overlay = false
                console.log(response.data)
            } catch (error) {
                console.log(error)
                this.overlay = false
            }


        }
    },
    mounted() {
        this.getorder();
    },
}
</script>