---
title: "Dokumentasi API JKT48Connect"
published: 2024-11-20
description: "Dokumentasi lengkap mengenai API yang digunakan di website http://www.jkt48connect.my.id, yang mencakup berbagai endpoint untuk mengambil data event, theater, news, member, dan live streaming JKT48."
image: 'https://jkt48.com/images/oglogo.png'  # Sesuaikan dengan link gambar yang relevan
tags: [JKT48, API, live streaming, website, dokumentasi, Valzy]
category: "Teknologi & Pengembangan"
draft: false
---

---

# **API Documentation**

## **Base URL**
```
https://api.jkt48connect.my.id
```

---

### **1. `/events`**

**GET**  
Mendapatkan data semua event yang tersedia.

#### **Response**
- **200 OK** (Success)
  ```json
  {
    "success": true,
    "message": "Data event berhasil diambil.",
    "data": [
      {
        "id": 1,
        "title": "Event 1",
        "date": "2024-11-20T12:00:00Z"
      },
      {
        "id": 2,
        "title": "Event 2",
        "date": "2024-11-21T14:00:00Z"
      }
    ]
  }
  ```
- **500 Internal Server Error** (Failure)
  ```json
  {
    "success": false,
    "message": "Gagal mengambil data event.",
    "error": "Error message"
  }
  ```

---

### **2. `/theater`**

**GET**  
Mendapatkan data semua theater yang tersedia.

#### **Response**
- **200 OK** (Success)
  ```json
  {
    "success": true,
    "message": "Data theater berhasil diambil.",
    "data": [
      {
        "id": 1,
        "name": "Theater 1",
        "location": "Jakarta"
      },
      {
        "id": 2,
        "name": "Theater 2",
        "location": "Bandung"
      }
    ]
  }
  ```
- **500 Internal Server Error** (Failure)
  ```json
  {
    "success": false,
    "message": "Gagal mengambil data theater.",
    "error": "Error message"
  }
  ```

---

### **3. `/theater/:id`**

**GET**  
Mendapatkan data theater berdasarkan ID.  
Gantilah `:id` dengan ID theater yang diinginkan (misalnya `2840`).

#### **Response**
- **200 OK** (Success)
  ```json
  {
    "success": true,
    "message": "Data theater dengan ID 2840 berhasil diambil.",
    "data": {
      "id": 2840,
      "name": "Theater 1",
      "location": "Jakarta",
      "schedule": "2024-11-20T12:00:00Z"
    }
  }
  ```
- **500 Internal Server Error** (Failure)
  ```json
  {
    "success": false,
    "message": "Gagal mengambil data theater dengan ID 2840.",
    "error": "Error message"
  }
  ```

---

### **4. `/news`**

**GET**  
Mendapatkan data berita terbaru.

#### **Response**
- **200 OK** (Success)
  ```json
  {
    "success": true,
    "message": "Data berita berhasil diambil.",
    "data": [
      {
        "id": 1,
        "title": "Breaking News: Event Besar",
        "content": "Deskripsi berita tentang event besar...",
        "date": "2024-11-20"
      },
      {
        "id": 2,
        "title": "Update Theater: Jadwal Baru",
        "content": "Deskripsi berita tentang jadwal baru...",
        "date": "2024-11-21"
      }
    ]
  }
  ```
- **500 Internal Server Error** (Failure)
  ```json
  {
    "success": false,
    "message": "Gagal mengambil data berita.",
    "error": "Error message"
  }
  ```

---

### **5. `/news/:id`**

**GET**  
Mendapatkan detail berita berdasarkan ID berita.  
Gantilah `:id` dengan ID berita yang diinginkan (misalnya `1860`).

#### **Response**
- **200 OK** (Success)
  ```json
  {
    "success": true,
    "message": "Data berita dengan ID 1860 berhasil diambil.",
    "data": {
      "id": 1860,
      "title": "Berita tentang Event 1860",
      "content": "Deskripsi lengkap berita...",
      "date": "2024-11-20"
    }
  }
  ```
- **500 Internal Server Error** (Failure)
  ```json
  {
    "success": false,
    "message": "Gagal mengambil data berita dengan ID 1860.",
    "error": "Error message"
  }
  ```

---

### **6. `/member/:name`**

**GET**  
Mendapatkan data member berdasarkan nama.  
Gantilah `:name` dengan nama member yang diinginkan (misalnya `delynn`).

#### **Response**
- **200 OK** (Success)
  ```json
  {
    "success": true,
    "message": "Data member dengan nama delynn berhasil diambil.",
    "data": {
      "id": 123,
      "name": "Delynn",
      "team": "Team J",
      "position": "Center",
      "profile": "Member of JKT48"
    }
  }
  ```
- **500 Internal Server Error** (Failure)
  ```json
  {
    "success": false,
    "message": "Gagal mengambil data member dengan nama delynn.",
    "error": "Error message"
  }
  ```

---

### **7. `/live`**

**GET**  
Mendapatkan data live saat ini berdasarkan grup.  
Grup default adalah `jkt48`. Anda bisa menambahkan query parameter untuk grup lain (misalnya `group=teamk`).

#### **Response**
- **200 OK** (Success)
  ```json
  {
    "success": true,
    "message": "Data live untuk grup jkt48 berhasil diambil.",
    "data": [
      {
        "id": 1,
        "title": "Live Show 1",
        "time": "2024-11-20T12:00:00Z",
        "viewer_count": 12345
      },
      {
        "id": 2,
        "title": "Live Show 2",
        "time": "2024-11-20T14:00:00Z",
        "viewer_count": 6789
      }
    ]
  }
  ```
- **500 Internal Server Error** (Failure)
  ```json
  {
    "success": false,
    "message": "Gagal mengambil data live untuk grup jkt48.",
    "error": "Error message"
  }
  ```

---

# **Notes:**
- Pastikan server berjalan dengan benar di `http://localhost:3000`.
- Semua API di atas mengembalikan data dalam format JSON.
- Semua error ditangani dengan status code `500` dan pesan error yang relevan.
- API yang memerlukan query parameter seperti `group` dapat menggunakan query string di URL.
-
