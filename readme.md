### **Sistem Informasi Manajemen Organisasi Mahasiswa**
**Deskripsi Singkat**: Sistem ini dirancang untuk membantu pengelolaan organisasi mahasiswa di fakultas, mencakup informasi tentang struktur organisasi, anggota, dan agenda kegiatan. Mahasiswa dapat melihat profil organisasi dan agenda yang tersedia, sementara admin organisasi dapat mengelola data anggota, struktur organisasi, serta jadwal kegiatan.
---
### **Tugas untuk Kelompok 17 (Front-end / Tampilan untuk Mahasiswa)**
#### **1. Halaman Utama**
- Menampilkan informasi umum organisasi mahasiswa di fakultas.
- Informasi yang ditampilkan meliputi:
  - Nama organisasi.
  - Visi dan misi organisasi.
  - Struktur kepengurusan inti (misalnya Ketua, Wakil Ketua, Sekretaris, Bendahara).
- Tombol navigasi ke halaman lainnya:
  - Halaman daftar anggota organisasi.
  - Halaman agenda kegiatan organisasi.
---
#### **2. Halaman Daftar Anggota**
- Menampilkan daftar anggota organisasi berdasarkan jabatan atau divisi.
- Informasi yang ditampilkan:
  - Nama anggota.
  - Jabatan/Divisi.
  - Kontak (email atau nomor telepon, jika diberikan).
- Tambahkan fitur filter:
  - Berdasarkan jabatan (contoh: Ketua, Anggota Divisi Humas, dll.).
---
#### **3. Halaman Agenda Kegiatan**
- Menampilkan daftar kegiatan organisasi yang akan datang.
- Informasi kegiatan yang ditampilkan:
  - Nama kegiatan.
  - Tanggal dan waktu.
  - Lokasi kegiatan.
  - Deskripsi singkat kegiatan.
- Tampilkan status kegiatan (Misalnya: "Terbuka untuk pendaftaran" atau "Hanya untuk anggota").
- Tambahkan tombol "Detail" untuk melihat informasi lebih lengkap tentang kegiatan.
---
#### **4. Firebase Integration**
- Mengambil data organisasi, anggota, dan kegiatan dari Firebase Firestore:
  - Koleksi **organisasi_mahasiswa** untuk informasi organisasi.
  - Koleksi **anggota_organisasi** untuk data anggota.
  - Koleksi **agenda_kegiatan** untuk daftar kegiatan.
---
#### **5. Fitur Tambahan (Opsional)**
- Tambahkan fitur pendaftaran kegiatan bagi mahasiswa (contoh: daftar seminar, workshop, dll.).
- Tampilkan notifikasi jika tidak ada agenda kegiatan yang tersedia.
---
#### **Fitur Utama yang Harus Selesai**
1. Halaman utama dengan informasi organisasi.
2. Halaman daftar anggota organisasi dengan fitur filter.
3. Halaman agenda kegiatan organisasi.
---
### **Struktur Firebase Firestore untuk Data Organisasi**
**Koleksi**: `organisasi_mahasiswa`  
**Dokumen (contoh)**:
```json
{
  "id": "org_001",
  "nama_organisasi": "BEM Fakultas Teknik",
  "visi": "Menjadi pelopor kemajuan mahasiswa.",
  "misi": [
    "Meningkatkan partisipasi mahasiswa dalam kegiatan kampus.",
    "Memfasilitasi kebutuhan mahasiswa."
  ],
  "struktur": [
    { "jabatan": "Ketua", "nama": "Andi Baso" },
    { "jabatan": "Wakil Ketua", "nama": "Budi Santoso" }
  ]
}
```
**Koleksi**: `anggota_organisasi`  
**Dokumen (contoh)**:
```json
{
  "id": "anggota_001",
  "nama": "Muhammad Aryandi",
  "jabatan": "Anggota Divisi Humas",
  "kontak": "aryandi@example.com"
}
```
**Koleksi**: `agenda_kegiatan`  
**Dokumen (contoh)**:
```json
{
  "id": "agenda_001",
  "nama_kegiatan": "Workshop Kepemimpinan",
  "tanggal": "2024-12-10",
  "waktu": "09:00",
  "lokasi": "Aula Fakultas",
  "deskripsi": "Kegiatan untuk meningkatkan keterampilan kepemimpinan.",
  "status": "Terbuka untuk pendaftaran"
}
```
---
### **Integrasi Antar Kelompok**
1. **Standar Data**:
   - Kelompok admin bertugas memastikan data anggota, organisasi, dan kegiatan disimpan dengan format yang sesuai di Firestore.
   - Kelompok front-end bertugas membaca data ini dan menampilkannya kepada mahasiswa.
2. **API Firebase**:
   - Gunakan koleksi **organisasi_mahasiswa**, **anggota_organisasi**, dan **agenda_kegiatan** sebagai sumber data utama.
3. **Koordinasi**:
   - Pastikan kedua kelompok berkomunikasi untuk menyinkronkan kebutuhan data.
---
### **Estimasi Timeline (6 Minggu)**
#### **Kelompok 17: Front-end**
- **Minggu 1**: Setup repositori, install dependency, setup Firebase.
- **Minggu 2**: Membuat halaman utama dengan informasi organisasi.
- **Minggu 3**: Membuat halaman daftar anggota organisasi.
- **Minggu 4**: Membuat halaman agenda kegiatan.
- **Minggu 5**: Testing fitur utama dan debugging.
- **Minggu 6**: Dokumentasi proyek front-end.