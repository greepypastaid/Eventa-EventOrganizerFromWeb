# Panduan Kontribusi

Terima kasih telah mempertimbangkan untuk berkontribusi pada proyek Eventa! Kami sangat menghargai setiap kontribusi, baik itu laporan bug, permintaan fitur, atau pull request.

## Alur Kerja Kontribusi

1. **Fork repositori** ke akun GitHub Anda
2. **Clone fork Anda** ke mesin lokal Anda
   ```bash
   git clone https://github.com/username-anda/Eventa-EventOrganizerFromWeb.git
   cd Eventa-EventOrganizerFromWeb
   ```
3. **Buat branch fitur** untuk perubahan Anda
   ```bash
   git checkout -b feature/nama-fitur
   ```
   atau untuk perbaikan bug:
   ```bash
   git checkout -b fix/nama-bug
   ```
4. **Lakukan perubahan** yang diperlukan dan commit
   ```bash
   git commit -m "Deskripsi perubahan Anda"
   ```
5. **Push ke branch** di fork Anda
   ```bash
   git push origin feature/nama-fitur
   ```
6. **Buka Pull Request** dari fork Anda ke repositori utama

## Standar Kode

### PHP

- Ikuti [PSR-12](https://www.php-fig.org/psr/psr-12/) dengan penyesuaian Laravel
- Gunakan fitur PHP 8.2+ jika memungkinkan
- Tambahkan docblocks untuk semua metode dan kelas
- Tulis tes untuk kode baru atau yang diubah

### JavaScript/React

- Ikuti standar ESLint dan Prettier yang dikonfigurasi
- Gunakan komponen fungsional dan React Hooks
- Hindari penggunaan class components kecuali diperlukan
- Buat komponen yang dapat digunakan kembali jika memungkinkan

### CSS

- Gunakan Tailwind CSS dengan pendekatan utility-first
- Hindari CSS kustom kecuali benar-benar diperlukan
- Jika CSS kustom diperlukan, gunakan pendekatan BEM

## Pengujian

- Pastikan semua tes lulus sebelum mengirimkan PR
- Tambahkan tes baru untuk fitur baru atau bug yang diperbaiki
- Untuk menjalankan tes:
  ```bash
  # Tes backend
  php artisan test
  
  # Linting frontend
  npm run lint
  
  # Format check
  npm run format:check
  ```

## Laporan Bug

Saat melaporkan bug, harap sertakan:

- Deskripsi singkat dan jelas tentang bug
- Langkah-langkah untuk mereproduksi bug
- Perilaku yang diharapkan vs. perilaku aktual
- Tangkapan layar jika memungkinkan
- Detail lingkungan Anda (OS, browser, versi PHP, dll.)

## Permintaan Fitur

Untuk permintaan fitur, harap jelaskan:

- Apa yang ingin Anda capai
- Mengapa fitur ini bermanfaat untuk proyek
- Bagaimana Anda membayangkan implementasinya
- Alternatif yang telah Anda pertimbangkan

## Proses Peninjauan Pull Request

- Semua PR akan ditinjau oleh minimal satu anggota tim inti
- Kami mungkin meminta perubahan sebelum menggabungkan PR Anda
- Pastikan PR Anda memenuhi semua standar kode dan lulus semua tes
- Update branch Anda jika diminta

## Panduan Commit

- Gunakan pesan commit yang jelas dan deskriptif
- Mulai pesan commit dengan kata kerja dalam bentuk sekarang (misalnya, "Add", "Fix", "Update")
- Referensikan nomor issue jika berlaku

Contoh format pesan commit yang baik:
```
Add user registration validation

- Add validation rules for email and password
- Create custom error messages
- Add unit tests for validation logic

Fixes #123
```

## Lisensi

Dengan berkontribusi pada proyek ini, Anda menyetujui bahwa kontribusi Anda akan dilisensikan di bawah [Lisensi MIT](LICENSE) proyek.

---

Sekali lagi, terima kasih atas kontribusi Anda! Jika Anda memiliki pertanyaan, jangan ragu untuk membuka issue atau menghubungi tim pengembang. 