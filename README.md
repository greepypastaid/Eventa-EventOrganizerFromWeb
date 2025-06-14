# Eventa - All in One Event Organizer

![Laravel](https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Inertia.js](https://img.shields.io/badge/Inertia.js-9553E9?style=for-the-badge&logo=inertia&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

Eventa adalah platform manajemen event modern yang dibangun dengan Laravel sebagai backend dan React + Inertia.js sebagai frontend. Platform ini memungkinkan pengguna untuk menemukan, membuat, dan mengelola berbagai jenis event secara online dengan antarmuka yang intuitif dan menarik.

## 📋 Daftar Isi

- [Fitur](#-fitur)
- [Teknologi](#-teknologi)
- [Persyaratan Sistem](#-persyaratan-sistem)
- [Instalasi](#-instalasi)
- [Menjalankan Aplikasi](#-menjalankan-aplikasi)
- [Struktur Proyek](#-struktur-proyek)
- [Panduan Pengembangan](#-panduan-pengembangan)
- [Troubleshooting](#-troubleshooting)

## ✨ Fitur

- **Pencarian Event**: Temukan event berdasarkan kategori, lokasi, dan tanggal
- **Detail Event**: Lihat informasi lengkap tentang event, termasuk deskripsi, lokasi, tanggal, dan harga
- **Countdown Timer**: Hitung mundur menuju tanggal pelaksanaan event
- **Tampilan Responsif**: Desain yang optimal untuk semua ukuran layar
- **Navigasi Transparan**: Navbar yang elegan mengambang di atas hero section
- **Kategori Event**: Browse event berdasarkan kategori (konser, teknologi, bisnis, dll)
- **Testimonial**: Ulasan dari pengguna yang telah menggunakan platform

## 🛠️ Teknologi

Proyek ini dibangun menggunakan stack teknologi modern:

- **Backend**:
  - Laravel 12.x - PHP framework
  - Laravel Fortify - Autentikasi
  - Laravel Sanctum - API Authentication
  - MySQL/PostgreSQL - Database

- **Frontend**:
  - React 19.x - JavaScript library
  - Inertia.js - Penghubung Laravel-React tanpa API
  - Tailwind CSS - Framework CSS utility-first
  - Vite - Build tool dan dev server

## 💻 Persyaratan Sistem

Pastikan sistem Anda memenuhi persyaratan berikut sebelum instalasi:

- **PHP** >= 8.2
- **Composer** >= 2.0
- **Node.js** >= 18.0
- **NPM** >= 9.0 atau **Yarn** >= 1.22
- **MySQL** >= 8.0 atau **PostgreSQL** >= 14
- **Git**

## 📥 Instalasi

Ikuti langkah-langkah berikut untuk menginstal dan menyiapkan proyek Eventa di lingkungan lokal Anda:

### 1. Clone Repository

```bash
git clone https://github.com/yourusername/eventa-event-organizer.git
cd eventa-event-organizer
```

### 2. Instal Dependensi PHP

```bash
composer install
```

### 3. Konfigurasi Environment

```bash
# Salin file .env.example menjadi .env
cp .env.example .env

# Generate application key
php artisan key:generate
```

### 4. Konfigurasi Database

Edit file `.env` dan sesuaikan konfigurasi database:

```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=eventa
DB_USERNAME=root
DB_PASSWORD=
```

### 5. Jalankan Migrasi dan Seeder

```bash
# Buat database (pastikan database sudah dibuat sebelumnya)
php artisan migrate

# Jalankan seeder untuk mengisi data awal
php artisan db:seed
```

### 6. Instal Dependensi JavaScript

```bash
npm install
# atau jika menggunakan Yarn
yarn install
```

### 7. Kompilasi Aset

```bash
npm run dev
# atau untuk production
npm run build
```

## 🚀 Menjalankan Aplikasi

Untuk menjalankan aplikasi di lingkungan pengembangan, ikuti langkah-langkah berikut:

### Metode 1: Menjalankan Server Backend dan Frontend Secara Terpisah

1. **Jalankan Server Laravel**

```bash
php artisan serve
```

Server Laravel akan berjalan di `http://localhost:8000`

2. **Jalankan Vite Development Server**

Buka terminal baru dan jalankan:

```bash
npm run dev
```

### Metode 2: Menjalankan Semua Server Sekaligus (Disarankan)

Laravel menyediakan script untuk menjalankan semua server sekaligus:

```bash
composer dev
```

Perintah ini akan menjalankan:
- Server Laravel di `http://localhost:8000`
- Queue worker untuk background jobs
- Log viewer (Laravel Pail)
- Vite development server

### Mengakses Aplikasi

Buka browser dan kunjungi:
- **URL:** http://localhost:8000

## 📂 Struktur Proyek

Berikut adalah struktur folder utama dalam proyek Eventa:

```
eventa-event-organizer/
├── app/                    # Kode PHP Laravel (Models, Controllers, dll)
├── bootstrap/              # File bootstrap Laravel
├── config/                 # Konfigurasi Laravel
├── database/               # Migrations, seeders, dan factories
├── public/                 # File publik yang dapat diakses langsung
├── resources/              # Aset yang perlu dikompilasi
│   ├── css/                # File CSS
│   ├── js/                 # Kode JavaScript dan React
│   │   ├── components/     # Komponen React yang dapat digunakan kembali
│   │   │   ├── events/     # Komponen terkait event (EventCard, EventList, dll)
│   │   │   ├── home/       # Komponen untuk halaman beranda (Hero, CTA, dll)
│   │   │   └── layout/     # Komponen layout (Navbar, Footer, dll)
│   │   ├── Layouts/        # Layout utama aplikasi
│   │   └── Pages/          # Komponen halaman utama (HomePage, EventsPage, dll)
│   └── views/              # Template Blade Laravel
├── routes/                 # Definisi rute aplikasi
├── storage/                # File yang dihasilkan aplikasi (logs, cache, dll)
├── tests/                  # Unit dan feature tests
├── vendor/                 # Dependensi PHP (dikelola oleh Composer)
├── node_modules/           # Dependensi JavaScript (dikelola oleh NPM/Yarn)
├── .env                    # Konfigurasi environment
├── composer.json           # Definisi dependensi PHP
└── package.json            # Definisi dependensi JavaScript
```

## 📝 Panduan Pengembangan

### Konvensi Kode

- Gunakan PSR-12 untuk kode PHP
- Gunakan ESLint dan Prettier untuk kode JavaScript/React
- Ikuti konvensi penamaan Laravel dan React

### Menambahkan Halaman Baru

1. Buat komponen halaman di `resources/js/Pages/`
2. Tambahkan rute di `routes/web.php`
3. Buat controller jika diperlukan di `app/Http/Controllers/`

### Menambahkan Komponen Baru

1. Buat komponen di folder yang sesuai di `resources/js/components/`
2. Impor dan gunakan komponen tersebut di halaman atau komponen lain

### Menambahkan Model dan Migrasi

```bash
# Membuat model dengan migrasi dan controller
php artisan make:model NamaModel -mc

# Menjalankan migrasi baru
php artisan migrate
```

## ❓ Troubleshooting

### Masalah Umum dan Solusi

1. **Error: EACCES permission denied**
   - Solusi: Pastikan Anda memiliki izin yang tepat untuk folder proyek

2. **Error: Database connection refused**
   - Solusi: Pastikan database server berjalan dan kredensial di file `.env` benar

3. **Error: Node Sass could not find a binding for your current environment**
   - Solusi: Jalankan `npm rebuild node-sass`

4. **Error: Vite manifest not found**
   - Solusi: Jalankan `npm run build` atau pastikan Vite server berjalan dengan `npm run dev`

### Mendapatkan Bantuan Lebih Lanjut

Jika Anda mengalami masalah yang tidak tercantum di atas, silakan:
- Buka issue di GitHub repository
- Periksa dokumentasi Laravel dan React
- Bergabung dengan forum komunitas Laravel atau React

## 📄 Lisensi

Proyek ini dilisensikan di bawah [MIT License](LICENSE).
