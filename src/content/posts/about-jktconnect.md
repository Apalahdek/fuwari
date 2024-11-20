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

# **Dokumentasi API JKT48Connect**

## **Base URL**
```
https://api.jkt48connect.my.id
```

---

## **Akses API**
Semua endpoint di bawah ini membutuhkan **API key** untuk mengaksesnya.  
Untuk mendapatkan **API key**, pengguna harus membelinya melalui WhatsApp:  
**Nomor**: [6285701479245](https://wa.me/6285701479245)

API key harus dimasukkan di salah satu dari:
- Header: `x-api-key`
- Query string: `?api_key=YOUR_API_KEY`

---

### **1. `/events`**

**GET**  
Mendapatkan data semua event yang tersedia.

#### **Request**
- **Header**:  
  ```
  x-api-key: YOUR_API_KEY
  ```
  
#### **Response**
- **200 OK** (Success)
  ```json
  [
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
  ```
- **401 Unauthorized** (API key tidak ditemukan)
  ```json
  {
    "message": "API key tidak ditemukan. Silakan masukkan API key."
  }
  ```
- **403 Forbidden** (API key tidak valid)
  ```json
  {
    "message": "API key tidak valid. Silakan beli API key di WhatsApp 6285701479245."
  }
  ```
- **403 Forbidden** (API key kedaluwarsa)
  ```json
  {
    "message": "API key Anda sudah kedaluwarsa. Silakan perpanjang API key melalui WhatsApp 6285701479245."
  }
  ```

---

### **2. `/theater`**

**GET**  
Mendapatkan data semua theater yang tersedia.

#### **Request**
- **Header**:  
  ```
  x-api-key: YOUR_API_KEY
  ```
  
#### **Response**
- **200 OK** (Success)
  ```json
  [
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
  ```

---

### **3. `/theater/:id`**

**GET**  
Mendapatkan data theater berdasarkan ID.  
Gantilah `:id` dengan ID theater yang diinginkan.

#### **Request**
- **Header**:  
  ```
  x-api-key: YOUR_API_KEY
  ```

#### **Response**
- **200 OK** (Success)
  ```json
  {
    "id": 2840,
    "name": "Theater 1",
    "location": "Jakarta",
    "schedule": "2024-11-20T12:00:00Z"
  }
  ```

---

### **4. `/news`**

**GET**  
Mendapatkan data berita terbaru.

#### **Request**
- **Header**:  
  ```
  x-api-key: YOUR_API_KEY
  ```

#### **Response**
- **200 OK** (Success)
  ```json
  [
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
  ```

---

### **5. `/news/:id`**

**GET**  
Mendapatkan detail berita berdasarkan ID berita.

#### **Request**
- **Header**:  
  ```
  x-api-key: YOUR_API_KEY
  ```

#### **Response**
- **200 OK** (Success)
  ```json
  {
    "id": 1860,
    "title": "Berita tentang Event 1860",
    "content": "Deskripsi lengkap berita...",
    "date": "2024-11-20"
  }
  ```

---

### **6. `/member/:name`**

**GET**  
Mendapatkan data member berdasarkan nama.

#### **Request**
- **Header**:  
  ```
  x-api-key: YOUR_API_KEY
  ```

#### **Response**
- **200 OK** (Success)
  ```json
  {
    "id": 123,
    "name": "Delynn",
    "team": "Team J",
    "position": "Center",
    "profile": "Member of JKT48"
  }
  ```

---

### **7. `/live`**

**GET**  
Mendapatkan data live saat ini berdasarkan grup.

#### **Request**
- **Header**:  
  ```
  x-api-key: YOUR_API_KEY
  ```
- **Query parameter** (opsional):  
  ```
  group=jkt48
  ```

#### **Response**
- **200 OK** (Success)
  ```json
  [
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
  ```

---

## **Catatan**
- Semua endpoint membutuhkan **API key**.
- Untuk membeli atau memperpanjang **API key**, hubungi WhatsApp [6285701479245](https://wa.me/6285701479245). 
