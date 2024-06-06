<template>
  <div>
    <v-card class="my-2 mx-2">
      <v-card-title>
        <p class="text-center">
          Profile
        </p>
      </v-card-title>
      <v-card-subtitle>
        <p class="text-center">
          {{ user.name }}
        </p>
        <p class="text-center">
          {{ user.email }}
        </p>
      </v-card-subtitle>
    </v-card>
    <v-card class="my-2 mx-2">
      <v-card-title class="my-2 mx-2">
        <v-row>
          <v-card-title>
            Daftar Barang
          </v-card-title>
          <v-spacer></v-spacer>
          <v-card-title>
            <v-btn-toggle variant="outlined" divided>
              <v-btn @click="ModalTambahBarang"> <v-icon icon="mdi-plus" color="blue-darken-2"></v-icon></v-btn>
              <v-btn><v-icon icon="mdi-export" color="blue-darken-2"></v-icon></v-btn>
            </v-btn-toggle>
          </v-card-title>
        </v-row>
      </v-card-title>
      <v-card-item class="my-2 mx-2">
        <v-text-field class="ma-2" density="compact" placeholder="Cari nama" hide-details
          v-model="caribarang"></v-text-field>
        <v-table>
          <thead>
            <tr>
              <th class="text-left">Kode Barang</th>
              <th class="text-left">Nama Barang</th>
              <th class="text-left">Harga</th>
              <th class="text-left">Harga Jual</th>
              <th class="text-left">Jumlah Stok</th>
              <th class="text-left">Satuan</th>
              <th class="text-left">Kategori</th>
              <th>#</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="i in barangfilter " :key="i">
              <td>{{ i.kode_barang }}</td>
              <td>{{ i.nama_barang }}</td>
              <td>{{ i.harga_barang }}</td>
              <td>{{ i.harga_barang_jual }}</td>
              <td>{{ i.jumlah_stok }}</td>
              <td>{{ i.satuan }}</td>
              <td>{{ i.kategori }}</td>
              <td>
                <v-btn-toggle>
                  <v-btn @click="ModalEditBarang(i.kode_barang)"><v-icon icon="mdi-pencil"
                      color="blue-darken-2"></v-icon></v-btn>
                  <v-btn @click="HapusBarang(i.kode_barang)"><v-icon icon="mdi-eraser"
                      color="blue-darken-2"></v-icon></v-btn>
                </v-btn-toggle>
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-card-item>
    </v-card>

    <v-dialog v-model="dialog" max-width="600">
      <v-card prepend-icon="mdi-view-dashboard" :title="nama_modal">
        <v-card-text>
          <v-form ref="form">
            <v-row dense>
              <v-col cols="12" md="4" sm="6" v-show="tambah">
                <v-text-field v-model="barang.kode_barang" label="Kode Barang" required
                  :rules="kodeBarangRules"></v-text-field>
              </v-col>
              <v-col cols="12" md="4" sm="6">
                <v-text-field v-model="barang.nama_barang" label="Nama Barang" :rules="namaBarangRules"></v-text-field>
              </v-col>
              <v-col cols="12" md="4" sm="6">
                <v-text-field v-model="barang.harga_barang" type="number" label="Harga Barang" required
                  :rules="hargaBarangRules"></v-text-field>
              </v-col>
              <v-col cols="12" md="4" sm="6">
                <v-text-field v-model="barang.harga_barang_jual" type="number" label="Harga Jual" required
                  :rules="hargaBarangJualRules"></v-text-field>
              </v-col>
              <v-col cols="12" md="4" sm="6">
                <v-text-field v-model="barang.jumlah_stok" type="number" label="Jumlah Stok" required
                  :rules="jumlahStokRules"></v-text-field>
              </v-col>
              <v-col cols="12" md="4" sm="6">
                <v-select v-model="barang.satuan" label="Satuan" required :items="items"
                  :rules="satuanRules"></v-select>
              </v-col>
              <v-col cols="12" md="4" sm="6">
                <v-select v-model="barang.kategori" label="Kategori" required :items="kategori"
                  :rules="kategoriRules"></v-select>
              </v-col>
            </v-row>
          </v-form>
          <small class="text-caption text-medium-emphasis">*Pastikan semua field terisi</small>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text="Tutup" variant="plain" @click="dialog = false"></v-btn>
          <v-btn color="primary" text="Simpan" variant="tonal" @click="tambahBarang" v-show="tambah"></v-btn>
          <v-btn color="primary" text="Simpan Perubahan" variant="tonal" @click="editBarang" v-show="!tambah"></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import axios from 'axios';
import Swal from 'sweetalert2';
import api from '../services/api'

export default {
  name: 'Profile',
  data() {
    return {
      user: JSON.parse(localStorage.getItem('user')),
      brg: [],
      dialog: false,
      barang: {
        nama_barang: '',
        kode_barang: '',
        harga_barang: '',
        harga_barang_jual: '',
        jumlah_stok: '',
        satuan: '',
        kategori: ''
      },
      items: ['pcs', 'kg', 'liter', 'gram'],
      kategori: ['Elektronik', 'Sembako', 'Bahan bangunan'],
      nama_modal: '',
      tambah: true,
      caribarang: '',
      kodeBarangRules: [
        v => !!v || 'Kode barang is required'
      ],
      namaBarangRules: [
        v => !!v || 'Nama barang is required'
      ],
      hargaBarangRules: [
        v => !!v || 'Harga barang is required'
      ],
      hargaBarangJualRules: [
        v => !!v || 'Harga jual is required'
      ],
      jumlahStokRules: [
        v => !!v || 'Jumlah stok is required'
      ],
      satuanRules: [
        v => !!v || 'Satuan is required'
      ],
      kategoriRules: [
        v => !!v || 'Kategori is required'
      ],
      apiUrl: process.env.VITE_APP_API_BASE_URL,
      
    }
  },
  computed: {
    barangfilter() {
      let sorted = this.brg;
      sorted = sorted.sort((a, b) => {
        return a.nama_barang.localeCompare(b.nama_barang);
      })
      if (this.caribarang) {
        sorted = sorted.filter(item =>
          item.nama_barang.toLowerCase().includes(this.caribarang.toLowerCase())
        );
      }
      return sorted;
    }
  },
  methods: {
    
    async HapusBarang(kode_barang) {
      Swal.fire({
        title: "Apakah data ini ingin dihapus?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Ya",
        denyButtonText: `Jangan`
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            let kodebarang = kode_barang
            const brg = await axios.delete(`${this.apiUrl}/barang/api/v1/hapus_barangs/${kodebarang}`, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
              }
            })
            Swal.fire("Dihapus!", "", "Data berhasil dihapus");
            this.getbrg();
          } catch (error) {
            console.log(error)
          }
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });

    },
    async tambahBarang() {
      const { valid } = await this.$refs.form.validate()
      if (valid) {
        this.dialog = false;
        Swal.fire({
          title: "Simpan data ?",
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: "Ya",
          denyButtonText: `Jangan simpan`
        }).then(async (result) => {
          if (result.isConfirmed) {
            try {
              const response = await axios.post(`${this.apiUrl}/barang/api/v1/add_barangs`, this.barang, {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`
                }
              })
              console.log('Barang added:', response.data);
              this.getbrg();
              Swal.fire("Tersimpan!", "", "Data berhasil ditambahkan");
            } catch (error) {
              console.log(error);
              Swal.fire("Error", "", "info");
            }
          } else if (result.isDenied) {
            Swal.fire("Simpan gagal", "", "info");
          }
        });
      }
    },
    async editBarang() {
      const { valid } = await this.$refs.form.validate()
      if (valid) {
        this.dialog = false;
        Swal.fire({
          title: "Ingin menyimpan perubahan ?",
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: "Simpan",
          denyButtonText: `Jangan simpan`
        }).then(async (result) => {
          if (result.isConfirmed) {
            try {
              const res = await axios.put(`${this.apiUrl}/barang/api/v1/edit_barangs/${this.barang.kode_barang}`, this.barang, {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`
                }
              })
              this.getbrg();
              Swal.fire("Tersimpan!", "", "Data berhasil diubah");
            } catch (error) {
              console.log(error)
            }
          } else if (result.isDenied) {
            Swal.fire("Changes are not saved", "", "info");
          }
        });
      }
    },
    ModalTambahBarang() {
      this.tambah = true
      this.nama_modal = 'Tambah Barang'
      this.dialog = true;
      this.barang.kode_barang = ""
      this.barang.nama_barang = ""
      this.barang.harga_barang = ""
      this.barang.harga_barang_jual = ""
      this.barang.jumlah_stok = ""
      this.barang.satuan = ""
      this.barang.kategori = ""
    },
    ModalEditBarang(kode) {
      this.tambah = false
      this.nama_modal = 'Edit Barang'
      let x = this.brg.find(brg => brg.kode_barang === kode);
      this.barang.kode_barang = x.kode_barang
      this.barang.nama_barang = x.nama_barang
      this.barang.harga_barang = x.harga_barang
      this.barang.harga_barang_jual = x.harga_barang_jual
      this.barang.jumlah_stok = x.jumlah_stok
      this.barang.satuan = x.satuan
      this.barang.kategori = x.kategori
      this.dialog = true;
    },
    async getbrg() {
      try {

        const response = await axios.get(`${this.apiUrl}/barang/api/v1/barangs`, {
          Headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        const data = await response.data;
        this.brg = Array.isArray(data) ? data : [];
        // this.brg = data
      } catch (error) {
        console.log(error)
      }
    }
  },
  mounted() {
    this.getbrg()
  },
}
</script>
