<template>
    <div>
        <v-card class="ma-2">
            <v-card-title>
                Pesan Katering
            </v-card-title>
            <v-card-item>
                <v-text-field>Cari Makanan</v-text-field>
            </v-card-item>
        </v-card>
        <v-container >
            <v-col no-gutters v-for="asd in menu" :key="asd" >

                <v-card class="" max-width="400">
                    <v-img class="align-end text-white" height="200" :src="asd.foto_url" cover>
                        <v-card-title>Top 10 Australian beaches</v-card-title>
                    </v-img>
                    <v-card-subtitle class="pt-4">
                        {{ asd.nama }}
                    </v-card-subtitle>
                    <v-card-text>
                        <div>Whitehaven Beach</div>
                        <div>Whitsunday Island, Whitsunday Islands</div>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn color="orange" text="Share"></v-btn>
                        <v-btn color="orange" text="Explore"></v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>


        </v-container>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    data() {
        return {
            api: process.env.VITE_APP_API_BASE_URL,
            menu: []
        }
    },
    methods: {
        async get_menu() {
            const api = this.api
            try {
                const response = await axios.get(`${api}/api/customer/get/menu`, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                console.log(response.data)
                // this.menu = response.data
                this.menu = response.data.map(menu => {
                    return {
                        ...menu,
                        foto_url: menu.foto ? `${api}/storage/fotos/${menu.foto}` : null
                    };
                });
            } catch (error) {
                console.log(error)
            }
        }
    },
    mounted() {
        this.get_menu();
    },
}
</script>