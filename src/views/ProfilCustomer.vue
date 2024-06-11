<template>
    <v-app>
        <v-card class="ma-2">
            <v-card-title class="ma-2">
                <v-row>
                    <div class="ma-2">
                        Profil
                    </div>
                    <v-spacer />
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
                        <v-spacer />
                        <v-btn @click="buka_dialog_alamat">Tambah alamat</v-btn>
                    </v-row>
                </v-card>
                <v-card class="ma-2">
                    <v-row class="ma-2">
                        <h3>No hp :</h3>
                        <h3>{{ user.nohp }}</h3>
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
                                <v-autocomplete v-model="profil.alamat" :items="alamat_customer" item-title="alamat"
                                    label="Pilih Alamat"></v-autocomplete>
                            </v-col>
                        </v-row>
                    </v-form>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text="Tutup" variant="plain" @click="dialog = false"></v-btn>
                    <v-btn color="primary" text="Simpan perubahan" variant="tonal" @click="simpan_edit"></v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="dialog_alamat" max-width="600" persistent>
            <v-card prepend-icon="mdi-view-dashboard" title="Tambah Alamat">
                <v-divider></v-divider>
                <v-form ref="formAlamat">
                    <v-card-item>
                        <v-autocomplete label="Cari Kota" :items="kota" item-title="name" item-value="id"
                            v-model="kota_selected"></v-autocomplete>
                        <v-autocomplete label="Cari Kecamatan" :items="kota_filter" item-title="name" item-value="id"
                            v-model="kecamatan_selected"></v-autocomplete>
                    </v-card-item>
                    <v-card-item>
                        <div ref="mapContainer" style="width: 100%; height: 400px"></div>
                    </v-card-item>
                    <v-card-item>
                        <v-textarea label="Alamat lengkap disini" v-model="alamat.alamat"></v-textarea>
                        <v-text-field label="Nama alias" v-model="alamat.alamat_display"></v-text-field>
                        <v-text-field label="Keterangan" v-model="alamat.keterangan"></v-text-field>
                    </v-card-item>
                </v-form>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text="Tutup" variant="plain" @click="tutup_dialog_alamat"></v-btn>
                    <v-btn color="primary" text="Simpan perubahan" variant="tonal" @click="simpan_alamat"></v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

    </v-app>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';
import L from 'leaflet';

export default {
    data() {
        return {
            user: JSON.parse(localStorage.getItem('user')),
            dialog: false,
            dialog_alamat: false,
            profil: {
                name: '',
                nama_perusahaan: '',
                nohp: '',
                email: '',
                alamat: '',
                deskripsi: ''
            },
            apiUrl: process.env.VITE_APP_API_BASE_URL,
            kota: [],
            kota_filter: [],
            kecamatan: [],
            kecamatan_selected: '',
            kota_selected: '',
            alamat: {
                kode_customer: '',
                alamat: '',
                lat: '',
                lng: '',
                keterangan: '',
                alamat_display: ''
            },
            map: null,
            currentMarker: null,
            alamat_customer: [],
        };
    },
    watch: {
        kota_selected(value) {
            this.kota_filter = this.kecamatan.filter(kcmtn => kcmtn.regency_id === value);
        },
        kecamatan_selected(value) {
            let kcmtn = this.kecamatan.find(kcmtn => kcmtn.id === value);
            if (kcmtn) {
                this.alamat.lat = kcmtn.latitude;
                this.alamat.lng = kcmtn.longitude;
                if (this.map) {
                    this.map.setView([this.alamat.lat, this.alamat.lng], 13);
                } else {
                    this.inisialisasiMap();
                }

                if (this.currentMarker) {
                    this.map.removeLayer(this.currentMarker);
                }

                this.currentMarker = L.marker([this.alamat.lat, this.alamat.lng], { draggable: true })
                    .addTo(this.map)
                    .on('dragend', (event) => {
                        const marker = event.target;
                        const position = marker.getLatLng();
                        this.alamat.lat = position.lat;
                        this.alamat.lng = position.lng;
                    });
            }
        },
        dialog_alamat(value) {
            if (value) {
                this.$nextTick(() => {
                    this.inisialisasiMap();
                });
            }
        }
    },
    methods: {
        EditProfil() {
            this.dialog = true;
            this.profil.name = this.user.name;
            this.profil.email = this.user.email;
            this.profil.nohp = this.user.nohp;
            this.profil.nama_perusahaan = this.user.nama_perusahaan;
            this.profil.alamat = this.user.alamat;
            this.profil.deskripsi = this.user.deskripsi;
        },
        async GetRegency() {
            let api = this.apiUrl;
            try {
                const kota = await axios.get(`${api}/api/customer/get/regency`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                const kecamatan = await axios.get(`${api}/api/customer/get/district`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                this.kota = kota.data;
                this.kecamatan = kecamatan.data;
            } catch (error) {
                console.log(error);
            }
        },
        buka_dialog_alamat() {
            this.dialog_alamat = true;
            this.alamat.kode_customer = this.user.email
        },
        tutup_dialog_alamat() {
            this.dialog_alamat = false;
            this.$refs.formAlamat.reset();
            this.alamat.lat = '';
            this.alamat.lng = '';
        },
        async simpan_alamat() {
            console.log(this.alamat);
            const api = this.apiUrl
            try {
                await axios.post(`${api}/api/customer/add/alamat`, this.alamat, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                Swal.fire("Tersimpan!", "Alamat berhasil ditambahkan", "Success");
                this.dialog_alamat = false
                this.get_alamat();
            } catch (error) {
                this.dialog_alamat = false
                console.log(error)
            }
        },
        async get_alamat() {
            const api = this.apiUrl
            const id_cust = this.user.email
            try {
                const res = await axios.post(`${api}/api/customer/get/alamat/${id_cust}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                this.alamat_customer = res.data
            } catch (error) {
                console.log(error)
            }
        },
        async simpan_edit() {
            let id = this.user.id;
            let api = this.apiUrl;
            try {
                await axios.put(`${api}/api/merchant/edit/profil/${id}`, this.profil, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                this.user = { ...this.user, ...this.profil };
                localStorage.setItem('user', JSON.stringify(this.user));
                this.dialog = false;
                Swal.fire("Tersimpan!", "Profil berhasil diubah" , "Success");
            } catch (error) {
                console.log(error);
            }
        },
        inisialisasiMap() {
            if (this.map) {
                this.map.remove();
            }
            this.map = L.map(this.$refs.mapContainer).setView([this.alamat.lat, this.alamat.lng], 13);
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            }).addTo(this.map);

            this.currentMarker = L.marker([this.alamat.lat, this.alamat.lng], { draggable: true })
                .addTo(this.map)
                .on('dragend', (event) => {
                    const marker = event.target;
                    const position = marker.getLatLng();
                    this.alamat.lat = position.lat;
                    this.alamat.lng = position.lng;
                });
        }
    },
    mounted() {
        this.GetRegency();
        this.get_alamat();
    },
};
</script>
