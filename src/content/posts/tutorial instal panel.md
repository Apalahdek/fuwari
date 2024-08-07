---
title: Tutorial Run Bot Pakai Panel Pterodactyl
published: 2024-05-01
description: 'Cara Install Bot WhatsApp dengan Panel Pterodactyl dan Node.js'
image: ''
tags: [Tutorial, Pterodactyl, BotWa]
category: 'Tutorial'
draft: false 
---

![.](https://github.com/user-attachments/assets/87bdd72d-e7d3-4893-a4e5-ebd6986b2afe)


:::important
tidak semua cara run bot di wa itu seperti ini, bisa saja berbeda-beda!!
:::

## Persiapan

1. **Akses ke Panel Pterodactyl**: Pastikan Anda memiliki akun dan server di panel Pterodactyl.
2. **Script Bot WhatsApp**: Siapkan script bot berbasis Node.js.
3. **Koneksi Database (Opsional)**: Jika bot menggunakan database, siapkan juga.

## Langkah-langkah Instalasi

### 1. Membuat Server di Pterodactyl

1. Masuk ke panel Pterodactyl.
2. Buat server baru:
   - **Name**: Nama server.
   - **Description**: Deskripsi server (opsional).
   - **Node**: Pilih node tempat server akan di-host.
   - **Server Owner**: Pilih pemilik server.
   - **Docker Image**: Pilih image yang mendukung Node.js. Misalnya, `node:14-alpine`.
   - **Allocation**: Pilih IP dan port yang tersedia.
   - **Resources**: Atur resources seperti CPU, RAM, dan Storage sesuai kebutuhan.

### 2. Mengupload Script Bot

1. **Menggunakan File Manager**:
   - Masuk ke File Manager pada server yang telah dibuat.
   - Upload script bot WhatsApp Anda (berupa file `.js` dan direktori terkait).

2. **Menggunakan SFTP**:
   - Gunakan aplikasi SFTP seperti FileZilla.
   - Hubungkan ke server dengan menggunakan informasi SFTP yang disediakan.
   - Upload script bot ke direktori `/home/container`.

### 3. Mengonfigurasi Bot

1. Edit file konfigurasi bot jika ada, seperti `config.json`, `.env`, atau file konfigurasi lainnya.
2. Pastikan semua konfigurasi telah diatur dengan benar, termasuk pengaturan token, API key, dan lain-lain.

### 4. Menginstal Dependensi

1. Buka **Console** pada panel Pterodactyl.
2. Jalankan perintah berikut untuk menginstal dependensi:

   ```bash
   npm install
   ```

### 5. Menjalankan Bot

1. Untuk menjalankan bot, Anda bisa menggunakan command berikut:

   ```bash
   node nama_script_bot.js
   ```

   Ganti `nama_script_bot.js` dengan nama file utama bot Anda.

2. Atur Startup Command di panel Pterodactyl:

   - Masuk ke **Startup** pada server Anda.
   - Atur command startup, misalnya:

     ```bash
     node nama_script_bot.js
     ```

3. Simpan perubahan dan jalankan server.

### 6. Menambahkan Task Otomatis (Opsional)

Jika Anda ingin menjalankan tugas otomatis seperti restart atau backup, Anda bisa mengaturnya di **Schedules**.

1. Masuk ke **Schedules** pada server Anda.
2. Buat task baru dan atur waktu serta perintah yang akan dijalankan.

## Command Dasar

- **Menginstal Dependensi**: `npm install`
- **Menjalankan Bot**: `node nama_script_bot.js`
- **Menghentikan Server**: Klik tombol "Stop" pada panel Pterodactyl.
- **Memulai Server**: Klik tombol "Start" pada panel Pterodactyl.
- **Merestart Server**: Klik tombol "Restart" pada panel Pterodactyl.

## Troubleshooting

1. **Cek Log**: Jika bot tidak berfungsi, cek log di panel Pterodactyl untuk melihat kesalahan yang terjadi.
2. **Pastikan Dependensi Terinstal**: Pastikan semua dependensi yang dibutuhkan sudah terinstal dengan benar.
3. **Koneksi Database**: Jika menggunakan database, pastikan koneksi sudah benar dan tidak ada masalah izin akses.

---

Itulah panduan untuk menginstall bot WhatsApp menggunakan panel Pterodactyl dan script Node.js. Pastikan untuk selalu menjaga keamanan dan melakukan backup data secara rutin.
