<div align="center">
  <img src="public/images/logo.png" alt="Eventa Logo" width="200"/>
  <h1>Eventa - Platform Manajemen Acara</h1>
  <p>
    <strong>Platform all-in-one untuk membuat, mengelola, dan menghadiri acara dengan mudah.</strong>
  </p>
  <p>
    <a href="https://laravel.com"><img src="https://img.shields.io/badge/Laravel-12.x-FF2D20?style=for-the-badge&logo=laravel" alt="Laravel"></a>
    <a href="https://react.dev"><img src="https://img.shields.io/badge/React-18.x-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React"></a>
    <a href="https://inertiajs.com"><img src="https://img.shields.io/badge/Inertia.js-007bff?style=for-the-badge&logo=inertia&logoColor=white" alt="Inertia.js"></a>
    <a href="https://tailwindcss.com"><img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS"></a>
    <a href="https://vitejs.dev"><img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite"></a>
  </p>
</div>

---

## 📝 Tentang Proyek

**Eventa** adalah aplikasi web modern yang dirancang untuk menyederhanakan proses penyelenggaraan acara. Dibangun dengan tumpukan teknologi TALL yang dimodifikasi (Laravel & React/Inertia), platform ini menyediakan antarmuka yang mulus dan reaktif bagi penyelenggara dan peserta. Mulai dari pembuatan halaman acara yang menarik hingga manajemen pendaftaran dan check-in peserta, Eventa menyediakan semua alat yang Anda butuhkan.

<div align="center">
  <img src="https://via.placeholder.com/800x400?text=Eventa+Screenshot" alt="Eventa Screenshot" width="80%" style="border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);"/>
  <p><em>Tampilan Dashboard Eventa</em></p>
</div>

## ✨ Fitur Utama

- **Untuk Peserta:**
  - 🌐 **Landing Page Dinamis:** Halaman utama yang menarik menampilkan acara unggulan.
  - 🔍 **Pencarian & Penemuan Acara:** Mudah menemukan acara berdasarkan kategori, tanggal, atau lokasi.
  - 📄 **Halaman Detail Acara:** Informasi lengkap termasuk deskripsi, jadwal sesi, pembicara, dan lokasi.
  - 🎟️ **Pendaftaran Mudah:** Proses pendaftaran yang sederhana untuk acara.
  - 📱 **Tiket Digital:** Akses tiket acara melalui QR code yang dapat disimpan di perangkat.
  - 📅 **Pengingat Acara:** Notifikasi untuk acara yang akan datang.

- **Untuk Penyelenggara (Admin):**
  - 🛠️ **Dashboard Admin:** Dasbor terpusat untuk mengelola semua aspek acara.
  - ➕ **Manajemen Acara & Sesi:** Buat, perbarui, dan hapus acara beserta sesi-sesinya.
  - 🎨 **Kustomisasi Tema:** Sesuaikan tampilan halaman acara dengan logo dan warna merek Anda.
  - 📊 **Dasbor Analitik:** Pantau statistik pendaftaran dan kehadiran secara real-time.
  - ✅ **Manajemen Check-in:** Lakukan check-in peserta dengan mudah menggunakan pemindai QR code.
  - 🔔 **Manajemen Notifikasi:** Kirim pemberitahuan penting kepada peserta terdaftar.
  - 📈 **Laporan & Ekspor Data:** Hasilkan laporan komprehensif dan ekspor data ke format yang umum digunakan.

## 🛠️ Tumpukan Teknologi

### Backend
- **[Laravel 12](https://laravel.com/)**: Framework PHP modern dengan sintaks yang ekspresif dan eleganuntuk pengembangan web yang menyenangkan.
- **[Laravel Fortify](https://laravel.com/docs/fortify)**: Implementasi otentikasi backend yang kuat dengan fitur seperti verifikasi email, pemulihan kata sandi, dan otentikasi dua faktor.
- **[Laravel Sanctum](https://laravel.com/docs/sanctum)**: Sistem otentikasi API ringan untuk SPA (Single Page Applications), aplikasi seluler, dan API sederhana berbasis token.

### Frontend
- **[React 18](https://react.dev/)**: Library JavaScript untuk membangun antarmuka pengguna dengan komponen yang dapat digunakan kembali dan performa yang dioptimalkan.
- **[Inertia.js](https://inertiajs.com/)**: Jembatan yang menghubungkan backend Laravel dengan frontend React tanpa perlu membuat API terpisah.
- **[Vite](https://vitejs.dev/)**: Build tool frontend modern yang menawarkan pengalaman pengembangan yang luar biasa cepat dengan Hot Module Replacement (HMR).
- **[Tailwind CSS](https://tailwindcss.com/)**: Framework CSS utility-first yang memungkinkan pengembangan UI yang cepat dan konsisten tanpa meninggalkan HTML.

### Alat Pengembangan
- **[ESLint](https://eslint.org/)**: Linter JavaScript yang membantu menemukan dan memperbaiki masalah dalam kode JavaScript.
- **[Prettier](https://prettier.io/)**: Pemformat kode yang memastikan gaya kode yang konsisten di seluruh proyek.
- **[PHPUnit](https://phpunit.de/)**: Framework pengujian untuk PHP yang memungkinkan pengujian otomatis yang komprehensif.

### Database
- Kompatibel dengan **MySQL**, **PostgreSQL**, dan **SQLite**.
- Migrasi database yang terkelola dengan baik untuk versioning skema.
- Seeder untuk data pengujian dan pengembangan.

## 📂 Struktur Proyek

Eventa mengikuti struktur proyek Laravel standar dengan beberapa penyesuaian untuk integrasi React dan Inertia:

```
Eventa/
├── app/                  # Kode PHP utama aplikasi
│   ├── Actions/          # Kelas aksi Fortify
│   ├── Console/          # Perintah Artisan kustom
│   ├── Http/             # Controllers, Middleware, Requests
│   ├── Models/           # Model Eloquent
│   └── Providers/        # Service Providers
├── bootstrap/            # File bootstrap aplikasi
├── config/               # File konfigurasi
├── database/             # Migrasi dan seeder database
├── public/               # Aset yang dapat diakses publik
├── resources/            # Aset frontend (JS, CSS, views)
│   ├── css/              # File stylesheet
│   ├── js/               # Kode JavaScript/React
│   │   ├── components/   # Komponen React
│   │   │   ├── Navigation/  # Komponen navigasi
│   │   │   └── UI/          # Komponen UI yang dapat digunakan kembali
│   │   ├── layouts/      # Layout React
│   │   └── pages/        # Halaman React
│   └── views/            # Template Blade
├── routes/               # Definisi rute aplikasi
├── storage/              # File yang dihasilkan aplikasi
└── tests/                # Tes otomatis
```

## 🚀 Memulai

Ikuti langkah-langkah ini untuk menjalankan salinan lokal dari proyek ini.

### Prasyarat

Pastikan lingkungan pengembangan Anda memenuhi persyaratan berikut:
- PHP >= 8.2
- Composer 2.x
- Node.js >= 18.x
- NPM >= 9.x
- Git
- Server Database (misalnya, MySQL, MariaDB, atau PostgreSQL)

### Panduan Instalasi

1.  **Clone Repositori**
    ```bash
    git clone https://github.com/[YOUR_USERNAME]/Eventa-EventOrganizerFromWeb.git
    cd Eventa-EventOrganizerFromWeb
    ```

2.  **Instal Dependensi Backend**
    ```bash
    composer install
    ```

3.  **Instal Dependensi Frontend**
    ```bash
    npm install
    ```
    > **Catatan:** Jika Anda mengalami masalah `ERESOLVE peer dependency`, coba jalankan `npm install --legacy-peer-deps`.

4.  **Konfigurasi Lingkungan**
    - Salin file `.env.example` menjadi `.env`.
      ```bash
      cp .env.example .env
      ```
    - Buat kunci aplikasi yang unik.
      ```bash
      php artisan key:generate
      ```

5.  **Konfigurasi Database**
    - Buka file `.env` dan perbarui variabel koneksi database sesuai dengan pengaturan lokal Anda.
      ```env
      DB_CONNECTION=mysql
      DB_HOST=127.0.0.1
      DB_PORT=3306
      DB_DATABASE=eventa
      DB_USERNAME=root
      DB_PASSWORD=
      ```
    - Pastikan Anda telah membuat database `eventa` di server database Anda.

6.  **Jalankan Migrasi Database**
    - Perintah ini akan membuat semua tabel yang diperlukan di database Anda.
      ```bash
      php artisan migrate
      ```

7.  **Seed Database (Opsional)**
    - Untuk mengisi database dengan data contoh:
      ```bash
      php artisan db:seed
      ```

## 🏃 Menjalankan Aplikasi

1.  **Jalankan Server Pengembangan**
    - Perintah ini akan memulai server Vite untuk frontend dan server PHP untuk backend secara bersamaan.
      ```bash
      npm run dev
      ```
    - Atau, Anda dapat menjalankan server PHP secara terpisah jika diperlukan:
      ```bash
      php artisan serve
      ```

2.  **Akses Aplikasi**
    - Aplikasi Anda sekarang berjalan di **[http://localhost:8000](http://localhost:8000)**.
    - Server Vite berjalan di **[http://localhost:5173](http://localhost:5173)**.

### Akun Pengguna

- **Pendaftaran**: Anda dapat mendaftarkan pengguna baru melalui halaman registrasi.
- **Membuat Pengguna Admin**: Untuk mengakses fungsionalitas admin, ubah peran pengguna di database (`users` tabel, kolom `role`) menjadi `admin`, atau gunakan perintah Artisan kustom:
  ```bash
  php artisan make:admin email@example.com
  ```
  Atau melalui Tinker:
  ```php
  php artisan tinker
  >>> $user = App\Models\User::find(1);
  >>> $user->role = 'admin';
  >>> $user->save();
  ```

## 💻 Panduan Pengembangan

### Konvensi Kode

Eventa mengikuti konvensi kode standar untuk Laravel dan React:

- **PHP**: Mengikuti [PSR-12](https://www.php-fig.org/psr/psr-12/) dengan beberapa penyesuaian Laravel.
- **JavaScript/React**: Mengikuti konvensi ESLint dan Prettier yang dikonfigurasi.
- **CSS**: Menggunakan Tailwind CSS dengan pendekatan utility-first.

### Alur Kerja Pengembangan

1. **Komponen Frontend**:
   - Komponen UI generik ditempatkan di `resources/js/components/UI/`
   - Komponen khusus fitur ditempatkan di direktori yang sesuai dengan fitur
   - Gunakan pendekatan komponen fungsional dengan React Hooks

2. **Backend**:
   - Ikuti pendekatan MVC Laravel standar
   - Gunakan fitur Laravel seperti Form Requests untuk validasi
   - Implementasikan kebijakan untuk otorisasi

### Menjalankan Tes

Proyek ini dilengkapi dengan suite pengujian PHPUnit untuk backend dan Jest untuk frontend.

- **Tes Backend**:
  ```bash
  php artisan test
  ```

- **Tes Frontend**:
  ```bash
  npm run test
  ```

- **Linting**:
  ```bash
  npm run lint
  ```

- **Formatting**:
  ```bash
  npm run format
  ```

> **Catatan Penting:** Pengujian backend dikonfigurasi untuk menggunakan database SQLite. Jika Anda mengalami galat `could not find driver`, itu berarti ekstensi `php_pdo_sqlite` tidak diaktifkan di konfigurasi PHP Anda (`php.ini`). Anda harus mengaktifkannya agar pengujian dapat berjalan.

## 🤝 Panduan Kontribusi

Kami sangat menghargai kontribusi dari komunitas! Berikut adalah langkah-langkah untuk berkontribusi pada proyek Eventa:

1. Fork repositori
2. Buat branch fitur (`git checkout -b feature/amazing-feature`)
3. Commit perubahan Anda (`git commit -m 'Add some amazing feature'`)
4. Push ke branch (`git push origin feature/amazing-feature`)
5. Buka Pull Request

### Standar Kontribusi

- Pastikan kode Anda mengikuti konvensi kode proyek
- Tambahkan tes untuk fitur atau perbaikan baru
- Perbarui dokumentasi jika diperlukan
- Pastikan semua tes lulus sebelum mengirimkan PR

## 📊 Roadmap

Berikut adalah fitur yang direncanakan untuk rilis mendatang:

- [ ] Integrasi pembayaran untuk tiket berbayar
- [ ] Sistem tiket dengan tingkatan berbeda
- [ ] Aplikasi seluler untuk peserta
- [ ] Integrasi kalender dengan Google/Apple Calendar
- [ ] Sistem pemasaran email untuk penyelenggara
- [ ] Dukungan untuk acara hybrid (online dan offline)
- [ ] Analitik lanjutan dengan visualisasi data

## 📄 Lisensi

Proyek ini dilisensikan di bawah **MIT License**. Lihat file `LICENSE` untuk detail lebih lanjut.

## 👥 Tim Pengembang

Eventa dikembangkan dan dikelola oleh tim pengembang yang berdedikasi. Kami selalu terbuka untuk kolaborasi dan kontribusi dari komunitas.

## 📞 Kontak & Dukungan

Jika Anda memiliki pertanyaan atau membutuhkan bantuan, jangan ragu untuk menghubungi kami:

- **Email**: support@eventa-app.com
- **GitHub Issues**: Untuk melaporkan bug atau meminta fitur
- **Dokumentasi**: [docs.eventa-app.com](https://docs.eventa-app.com)

---

<div align="center">
  <p>Dibuat dengan ❤️ oleh Tim Eventa</p>
  <p>
    <a href="https://github.com/eventa">GitHub</a> •
    <a href="https://twitter.com/eventa_app">Twitter</a> •
    <a href="https://www.instagram.com/eventa_app">Instagram</a>
  </p>
</div>
