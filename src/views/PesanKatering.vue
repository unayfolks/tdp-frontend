<template>
    <div>
        <v-card class="ma-2">
            <v-card-title>
                <v-row>
                    <h3 class="ma-2">
                        Mau makan apa hari ini ?
                    </h3>
                    <v-spacer />
                    <v-badge class="ma-4" color="error" :content="jumlahpesanan">
                        <v-btn @click="ModalPesanan">pesanan</v-btn>
                    </v-badge>
                </v-row>
            </v-card-title>
            <v-card-item>
                <v-text-field density="compact" append-inner-icon="mdi-magnify" label="Cari Makanan atau Resto"
                    v-model="carimenu"></v-text-field>
            </v-card-item>
        </v-card>
        <v-card class="ma-2">
            <!-- <v-container> -->
            <v-row no-gutters>
                <v-col class=" justify-space-around" cols="12" md="4" lg="2" v-for="asd in menu_filter" :key="asd">
                    <v-card max-width="4000" class="ma-2">
                        <v-img class="align-end text-white" height="200" :src="asd.foto_url" cover>
                            <v-card-title>{{ asd.nama }}</v-card-title>
                        </v-img>
                        <v-card-subtitle class="pt-4">
                            {{ asd.nama_perusahaan }}
                        </v-card-subtitle>
                        <v-card-text>
                            <div>{{ asd.deskripsi }}</div>
                        </v-card-text>
                        <v-card-actions>
                            <v-row class="ma-2">
                                Rp.{{ asd.harga }}
                                <v-spacer />
                                <v-btn size="medium" color="orange">
                                    <v-icon aria-hidden="false" @click="tambah_pesanan(asd)">
                                        mdi-cart-plus
                                    </v-icon>
                                </v-btn>
                            </v-row>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
            <!-- </v-container> -->
        </v-card>
        <v-dialog v-model="dialog" max-width="1000">
            <v-card prepend-icon="mdi-food-variant" :title="nama_modal">
                <v-card-text v-if="jumlahpesanan == 0" class="ma-2">
                    <v-row class="justify-center">
                        <div>
                            Belum ada pesanan
                        </div>
                    </v-row>
                </v-card-text>
                <v-card-item v-if="jumlahpesanan != 0">
                    <v-table>
                        <thead>
                            <tr>
                                <th></th>
                                <th>
                                    Makanan
                                </th>
                                <th>
                                    Harga
                                </th>
                                <th class="text-center">
                                    Jumlah
                                </th>
                                <th>
                                    Subtotal
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in pesanan" :key="item.id">
                                <th>
                                    <v-btn color="red"
                                        @click="hapuspesan(index)"><v-icon>mdi-close-circle</v-icon></v-btn>
                                </th>
                                <td>{{ item.nama }}</td>
                                <td>{{ item.harga }}</td>
                                <td>
                                    <v-text-field class="text-center" v-model="item.jumlah"
                                        @click:prepend="kurangiJumlah(index)" @click:append="tambahJumlah(index)"
                                        prepend-icon="mdi-minus-thick" append-icon="mdi-plus-thick" variant="solo"
                                        @input="updatejumlahpesanan(index)">
                                    </v-text-field>
                                </td>
                                <td>{{ item.subtotal }}</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td class="text-center">total</td>
                                <td>{{ total() }}</td>
                            </tr>
                        </tbody>
                    </v-table>
                </v-card-item>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text="Tutup" variant="plain" @click="dialog = false"></v-btn>
                    <v-btn color="primary" text="Cekout" variant="tonal" :disabled="validatecheckout"
                        @click="checkout"></v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <template>
            <div class="text-center">
                <v-snackbar v-model="addnotif" :timeout="2000" :color="warnanotif" rounded="pill">
                    {{ textnotif }}
                    <template v-slot:actions>
                        <v-btn color="white" variant="text" @click="addnotif = false">
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                    </template>
                </v-snackbar>
            </div>
        </template>
        <template>
            <div>
                <v-overlay :model-value="overlay" class="align-center justify-center">
                    <v-progress-circular color="primary" size="64" indeterminate></v-progress-circular>
                </v-overlay>
            </div>
        </template>
        <template>
            <div>
                <v-dialog v-model="dialog_checkout" transition="dialog-bottom-transition" fullscreen>
                    <template v-slot:activator="{ props: activatorProps }">
                        <v-btn prepend-icon="mdi-cog" size="small" text="Settings" v-bind="activatorProps"></v-btn>
                    </template>
                    <v-card>
                        <v-toolbar>
                            <v-toolbar-title>Checkout</v-toolbar-title>
                            <v-spacer></v-spacer>
                            <v-toolbar-items>
                                <v-btn icon="mdi-close" @click="dialog_checkout = false"></v-btn>
                            </v-toolbar-items>
                        </v-toolbar>
                        <v-card class="ma-2" style="overflow-y: auto; max-height: calc(100vh - 200px);">
                            <v-card-title>
                                Pemesan
                            </v-card-title>
                            <v-text-field v-model="trx.nama" class="ma-2" label="Nama pemesan"
                                type="text"></v-text-field>
                            <v-text-field v-model="trx.tanggal" class="ma-2" label="Tanggal" type="date"></v-text-field>
                            <v-text-field v-model="trx.jam" class="ma-2" label="Waktu" type="time"></v-text-field>
                            <v-textarea v-model="trx.alamat_kirim" class="ma-2" label="Alamat"></v-textarea>
                            <v-textarea v-model="trx.catatan" class="ma-2" label="Catatan"></v-textarea>
                            <v-card-title>
                                Detail Pesanan
                            </v-card-title>
                            <v-card-item>
                                <v-table>
                                    <thead>
                                        <tr v-for="i in pesanan" :key="i">
                                            <th>{{ i.nama }}</th>
                                            <th>{{ i.harga }}</th>
                                            <th>{{ i.jumlah }}</th>
                                            <th>{{ i.subtotal }}</th>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th></th>
                                            <th>Total</th>
                                            <td>{{ total() }}</td>
                                        </tr>
                                    </thead>
                                </v-table>
                            </v-card-item>
                            <v-card-item>
                                <div class="ma-2 align-center d-flex justify-center">
                                    <v-btn class="ma-2" color="blue" @click="simpan_transaksi">Buat Pesanan</v-btn>
                                </div>
                            </v-card-item>
                        </v-card>
                    </v-card>
                </v-dialog>
            </div>
        </template>
    </div>
</template>
<script>
import axios from 'axios'
import Swal from 'sweetalert2';

export default {
    data() {
        return {
            user: JSON.parse(localStorage.getItem('user')),
            api: process.env.VITE_APP_API_BASE_URL,
            menu: [],
            pesanan: [],
            trx: {
                kode_transaksi: '',
                nama: '',
                tanggal: '',
                jam: '',
                catatan: '',
                kode_user: '',
                alamat_kirim: '',
            },
            carimenu: '',
            jumlahpesanan: '',
            dialog: false,
            nama_modal: '',
            validatecheckout: true,
            addnotif: false,
            textnotif: '',
            warnanotif: '',
            overlay: false,
            dialog_checkout: false,
            notifications: false,
            sound: true,
            widgets: false,
        }
    },
    computed: {
        menu_filter() {
            let sortedmenu = this.menu;
            sortedmenu = sortedmenu.sort((a, b) => {
                return a.nama.localeCompare(b.nama);
            })
            if (this.carimenu) {
                sortedmenu = sortedmenu.filter(item =>
                    item.nama.toLowerCase().includes(this.carimenu.toLowerCase()) ||
                    item.nama_perusahaan.toLowerCase().includes(this.carimenu.toLowerCase())
                );
            }
            return sortedmenu;
        }
    },
    methods: {
        async simpan_transaksi() {
            let objek = {
                trx: this.trx,
                detail: this.pesanan
            }
            const api = this.api
            this.overlay = true
            try {
                const response = await axios.post(`${api}/api/customer/add/trx`, objek, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                console.log(response)
                Swal.fire("Berhasil!", "Pesanan berhasi dibuat", "success");
                this.dialog_checkout = false
                this.overlay = false
            } catch (error) {
                console.log(error)
            }
        },
        total() {
            let x = this.pesanan.reduce((subtotal, item) => subtotal + item.subtotal, 0);
            if (x == 0) {
                this.validatecheckout = true
            } else {
                this.validatecheckout = false
            }
            return x;
        },
        hapuspesan(index) {
            let x = index
            let y = this.pesanan
            let z = y.length
            let q = z - 1
            y.splice(x, 1)
            console.log(z - 1)
            this.jumlahpesanan = q
        },
        checkout() {
            this.dialog = false
            if (this.pesanan.length === 0) {
                Swal.fire("Gagal!", "belum ada pesanan", "error");
            } else {
                this.dialog_checkout = true
            }
            console.log(this.pesanan)
        },
        updatejumlahpesanan(index) {
            console.log(index)
            this.updateSubtotal(index)
        },
        tambahJumlah(index) {
            this.pesanan[index].jumlah++;
            this.updateSubtotal(index);
        },
        kurangiJumlah(index) {
            if (this.pesanan[index].jumlah > 0) {
                this.pesanan[index].jumlah--;
                this.updateSubtotal(index);
            }
        },
        updateSubtotal(index) {
            this.pesanan[index].subtotal = this.pesanan[index].jumlah * this.pesanan[index].harga;
        },
        async get_menu() {
            this.overlay = true
            const api = this.api
            try {
                const response = await axios.get(`${api}/api/customer/get/menu`, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                this.overlay = false
                this.menu = response.data.map(menu => {
                    return {
                        ...menu,
                        foto_url: menu.foto ? `${api}/storage/fotos/${menu.foto}` : null
                    };
                });
            } catch (error) {
                console.log(error)
            }
        },
        tambah_pesanan(asd) {
            const sudahAda = this.pesanan.some(item => item.id_menu === asd.id);
            console.log(sudahAda)
            if (!sudahAda) {
                let now = new Date();
                let a = this.user.id
                let x = now.toISOString().slice(0, 10)
                let y = now.toTimeString().slice(0, 5)
                let z = `${a}-${y.replace(/:/g, '')}-${x.replace(/-/g, '')}`;
                const objek = {
                    id: this.pesanan.length,
                    id_menu: asd.id,
                    harga: asd.harga,
                    nama: asd.nama,
                    nama_perusahaan: asd.nama_perusahaan,
                    jumlah: 1,
                    subtotal: asd.harga,
                    kode_user: this.user.id,
                    nama_user: this.user.name,
                    kode_transaksi: z
                };
                this.pesanan.push(objek);
                this.trx.kode_transaksi = z
                this.inisialisasijumlahorderan();
                this.addnotif = true
                this.textnotif = "menu berhasil ditambahkan"
                this.warnanotif = "blue-grey"
            } else {
                this.addnotif = true
                this.textnotif = "menu sudah ditambahkan"
                this.warnanotif = "red"
            }
        },
        inisialisasijumlahorderan() {
            let x = this.pesanan.length
            this.jumlahpesanan = x
        },
        ModalPesanan() {
            this.dialog = true
            this.nama_modal = 'Detail Pesanan'
        },
        aturWaktuSekarang() {
            let now = new Date();
            this.trx.tanggal = now.toISOString().slice(0, 10)
            this.trx.jam = now.toTimeString().slice(0, 5)
            this.trx.nama = this.user.name
            this.trx.kode_user = this.user.id
        }
    },
    mounted() {
        this.aturWaktuSekarang();
        this.get_menu();
        this.inisialisasijumlahorderan();
        this.pesanan.forEach((item, index) => {
            this.$set(item, 'jumlah', 1);
            this.updateSubtotal(index);
        });
    },
}
</script>