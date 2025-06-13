# Eventa - All in One Event Manager

![Laravel](https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![GraphQL](https://img.shields.io/badge/GraphQL-E10098?style=for-the-badge&logo=graphql&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

Eventa adalah platform manajemen event modern yang dibangun dengan Laravel sebagai backend dan React sebagai frontend. Proyek ini bertujuan untuk menyediakan solusi lengkap untuk membuat, mengelola, mempromosikan, dan menjual tiket event secara online.

## ✨ Fitur Utama (Rencana Pengembangan)

-   Landing page yang menarik.
-   Pencarian dan penemuan event.
-   Proses pembuatan event yang mudah.
-   Manajemen tiket dan penjualan.
-   Sistem pembayaran terintegrasi.
-   Check-in peserta menggunakan QR Code.
-   Dashboard admin untuk manajemen platform.

## 🛠️ Stack Teknologi

-   **Backend**: Laravel 11
-   **API**: GraphQL (via `lighthouse-php`)
-   **Frontend**: React.js
-   **Styling**: Tailwind CSS
-   **Bundler**: Vite
-   **Database**: MySQL / PostgreSQL

## 📂 Struktur Proyek

Proyek ini mengikuti arsitektur standar Laravel dengan frontend React yang di-render sebagai Single Page Application (SPA).

-   `/app`: Logika inti Laravel (Models, Controllers, Services).
-   `/graphql`: Skema, resolver, dan tipe GraphQL Anda (`.graphql` files).
-   `/database`: Migrations dan Seeders.
-   `/routes`: Definisi rute API dan web.
-   `/resources/js`: Seluruh kode sumber frontend React.
    -   `/pages`: Komponen yang merepresentasikan satu halaman penuh (e.g., `HomePage.jsx`).
    -   `/components`: Komponen UI yang dapat digunakan kembali (e.g., Buttons, Modals, Cards).
        -   `/layout`: Komponen tata letak seperti `Navbar.jsx`, `Footer.jsx`.
        -   `/home`: Komponen spesifik untuk `HomePage`.
        -   `...folder lain sesuai fitur`.
-   `/resources/views/app.blade.php`: File Blade tunggal yang menjadi "cangkang" untuk me-mount aplikasi React.
-   `/public`: Aset publik dan titik masuk (`index.php`).

## 🚀 Instalasi & Setup

Ikuti langkah-langkah berikut untuk menjalankan proyek ini di lingkungan lokal Anda.

### Prasyarat

-   PHP >= 8.2
-   Composer
-   Node.js >= 18.0
-   NPM atau Yarn
-   Database (e.g., MySQL, PostgreSQL)

### Langkah-langkah

1.  **Clone repository:**
    ```bash
    git clone https://github.com/your-username/eventa-project.git
    cd eventa-project
    ```

2.  **Install dependensi backend:**
    ```bash
    composer install
    ```

3.  **Setup file environment:**
    -   Salin file `.env.example` menjadi `.env`.
        ```bash
        cp .env.example .env
        ```
    -   Buat kunci aplikasi.
        ```bash
        php artisan key:generate
        ```

4.  **Konfigurasi `.env`:**
    -   Buka file `.env` dan atur koneksi database Anda (DB_HOST, DB_PORT, DB_DATABASE, DB_USERNAME, DB_PASSWORD).
    -   Pastikan `APP_URL` sudah benar (e.g., `APP_URL=http://localhost`).

5.  **Jalankan migrasi dan seeder database:**
    ```bash
    php artisan migrate --seed
    ```

6.  **Install dependensi frontend:**
    ```bash
    npm install
    ```

## 🏃 Menjalankan Aplikasi

Anda perlu menjalankan dua server secara bersamaan di dua terminal terpisah.

1.  **Terminal 1: Jalankan server backend Laravel:**
    ```bash
    php artisan serve
    ```
    Server backend akan berjalan di `http://127.0.0.1:8000`.

2.  **Terminal 2: Jalankan server development Vite untuk frontend:**
    ```bash
    npm run dev
    ```
    Vite akan meng-compile aset frontend dan menyediakan Hot Module Replacement (HMR).

3.  **Akses Aplikasi:**
    -   Buka browser Anda dan kunjungi **`http://127.0.0.1:8000`**. Ini adalah alamat aplikasi utama Anda.

## 🤝 Kontribusi

Kami menyambut kontribusi! Silakan buat *fork* dari repository ini, buat *feature branch* baru, dan kirimkan *Pull Request*.
