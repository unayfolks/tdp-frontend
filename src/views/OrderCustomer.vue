<template>
    <div>
        <v-card class="ma-2">
            <v-card-title>Daftar Orderan Kamu</v-card-title>
        </v-card>
        <v-card class="ma-2">
            <v-card-title>
                Daftar orderan
            </v-card-title>
            <v-card-item>
                <v-table>
                    <thead>
                        <tr>
                            <th>Kode tansaksi</th>
                            <th>Tanggal</th>
                            <th>Alamat</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="i in order" :key="i">
                            <td>{{i.kode_transaksi}}</td>
                            <td>{{i.tanggal}}</td>
                            <td>{{i.alamat_kirim}}</td>
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

export default{
    data() {
        return {
            api: process.env.VITE_APP_API_BASE_URL,
            user: JSON.parse(localStorage.getItem('user')),
            order:[],
            overlay: false,

        }
    },
    methods: {
        async get_order(){
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
        }
    },
    mounted() {
        this.get_order();
    },
}
</script>