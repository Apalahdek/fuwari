---
title: Cara Melihat Password Wifi Public
published: 2024-08-26
description: 'Cara Melihat Password Wifi Public'
image: ''
tags: [Hack, Wifi]
category: 'Hacking'
draft: false 
---

Untuk mengetahui password Wi-Fi yang disimpan di sistem menggunakan Python, Anda bisa menggunakan beberapa perintah sistem yang diakses melalui Python. Namun, penting untuk dicatat bahwa metode ini hanya bekerja pada jaringan yang pernah terhubung sebelumnya dan disimpan di sistem Anda, serta membutuhkan hak akses administrator. Berikut adalah langkah-langkah untuk melakukannya:

### 1. Menggunakan Python di Windows

#### Langkah 1: Import modul yang diperlukan
```python
import subprocess
```

#### Langkah 2: Dapatkan daftar semua jaringan yang tersimpan
Untuk mendapatkan semua jaringan Wi-Fi yang pernah terhubung, gunakan perintah `netsh wlan show profiles`.
```python
networks = subprocess.check_output(['netsh', 'wlan', 'show', 'profiles']).decode('utf-8').split('\n')
profiles = [i.split(":")[1][1:-1] for i in networks if "All User Profile" in i]
```

#### Langkah 3: Dapatkan password dari jaringan yang tersimpan
Selanjutnya, untuk setiap profil jaringan, kita dapat mengambil passwordnya dengan perintah:
```python
for profile in profiles:
    results = subprocess.check_output(['netsh', 'wlan', 'show', 'profile', profile, 'key=clear']).decode('utf-8').split('\n')
    results = [b.split(":")[1][1:-1] for b in results if "Key Content" in b]
    try:
        print(f"Profile: {profile}\nPassword: {results[0]}\n")
    except IndexError:
        print(f"Profile: {profile}\nPassword: None\n")
```

### 2. Menggunakan Python di Linux

#### Langkah 1: Import modul yang diperlukan
```python
import subprocess
```

#### Langkah 2: Dapatkan daftar semua jaringan yang tersimpan
Untuk mendapatkan semua jaringan Wi-Fi yang pernah terhubung, kita perlu membaca file konfigurasi `wpa_supplicant.conf` atau `NetworkManager`:
```python
networks = subprocess.check_output(['sudo', 'cat', '/etc/NetworkManager/system-connections/*']).decode('utf-8').split('\n')
```

#### Langkah 3: Dapatkan password dari jaringan yang tersimpan
Untuk mendapatkan password dari setiap jaringan, kita perlu mencari baris yang mengandung `psk=`.
```python
for line in networks:
    if "psk=" in line:
        print(line.strip())
```

### Catatan Keamanan

- Menggunakan metode ini untuk mengetahui password Wi-Fi tanpa izin adalah tindakan ilegal dan tidak etis.
- Pastikan Anda memiliki izin untuk mengakses informasi ini.
- Gunakan hanya pada sistem milik Anda atau dengan izin dari pemilik.

### Kesimpulan
Dengan script sederhana di atas, Anda dapat mengekstrak password Wi-Fi yang tersimpan di sistem Anda menggunakan Python. Pastikan untuk selalu menghormati privasi dan kepemilikan informasi jaringan yang bukan milik Anda.
