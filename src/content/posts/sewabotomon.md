---
title: Fitur Sewabot Otomatis Paydisini
published: 2024-08-26
description: 'Sewabot Otomatis Pakai Paydisini'
image: ''
tags: [Free, Fitur, Botwa]
category: 'Free'
draft: false 
---

:::tip
Jangan Lupa kasih Credits Gw ya cok, Jangan dijual juga ini fiturnya!!
:::
---

## Deskripsi Fitur

Fitur ini memungkinkan pengguna untuk melakukan deposit dengan menggunakan pembayaran QRIS. Pengguna dapat memilih rencana yang berbeda dan melakukan pembayaran dengan memindai kode QR yang dihasilkan. Setelah pembayaran berhasil, bot akan ditambahkan ke grup WhatsApp yang ditentukan dan mengatur masa aktif grup sesuai dengan rencana yang dipilih. Pengguna juga dapat mencustom rencana yang ada sesuai dengan kebutuhan mereka.

## Cara Kerja

1. **Meminta Deposit**
   - Pengguna mengirimkan perintah dengan format: `<prefix> <command> <plan> <group-link>`
   - `plan` adalah pilihan paket yang tersedia: basic, standard, premium, atau vip. Pengguna juga dapat mencustom rencana yang ada sesuai dengan preferensi mereka.
   - `group-link` adalah tautan undangan grup WhatsApp tempat bot akan ditambahkan setelah pembayaran berhasil.

2. **Pembayaran**
   - Sistem membuat permintaan pembayaran menggunakan API pembayaran.
   - Kode QR untuk pembayaran dihasilkan dan dikirim kepada pengguna.
   - Pengguna memindai kode QR dan melakukan pembayaran.

3. **Verifikasi Pembayaran**
   - Sistem memeriksa status pembayaran secara berkala.
   - Jika pembayaran berhasil, bot akan ditambahkan ke grup dan mengatur masa aktif grup sesuai dengan paket yang dipilih.

4. **Penambahan Bot ke Grup**
   - Jika pembayaran sesuai dengan rencana yang valid, bot akan bergabung dengan grup WhatsApp.
   - Masa aktif grup diatur sesuai dengan paket yang dipilih.

## Kode

```javascript
const crypto = require('crypto');
const axios = require('axios');
const { URLSearchParams } = require('url');

let linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})/i;

let handler = async (m, { conn, isOwner, usedPrefix, command, args, text }) => {
    conn.gateaway = conn.gateaway ? conn.gateaway : {};

    if (!text) {
        return conn.sendMessage(m.chat, { text: `• *Example :* ${usedPrefix}${command} <plan> <group-link>` });
    }

    if (conn.gateaway[m.sender]) {
        return conn.sendMessage(m.chat, { text: `Masih ada pembayaran yang belum anda selesaikan. Selesaikan terlebih dahulu jika ingin membuat permintaan baru.` });
    }

    let [plan, groupLink] = text.split(' ');
    plan = plan.toLowerCase().trim();

    if (!groupLink) {
        return conn.sendMessage(m.chat, { text: 'Harap tambahkan tautan undangan grup setelah nama plan.' });
    }

    let amount = await getPlanAmount(plan);
    if (!amount) {
        return conn.sendMessage(m.chat, { text: 'Pilih plan yang valid.' });
    }

    // Memeriksa apakah link valid menggunakan regex
    let [_, code] = groupLink.match(linkRegex) || [];
    if (!code) return conn.sendMessage(m.chat, { text: 'Link undangan grup tidak valid.' });

    await conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key } });

    let gateway;
    try {
        gateway = await paydisini(Func.makeId(32), amount);
    } catch (error) {
        return conn.sendMessage(m.chat, { text: 'Terjadi kesalahan saat membuat permintaan pembayaran.' });
    }

    if (!gateway || !gateway.qrcode_url) {
        return conn.sendMessage(m.chat, { text: 'Terjadi kesalahan saat membuat permintaan pembayaran.' });
    }

    let images = await sendQRCode(gateway.qrcode_url);
    if (!images) {
        return conn.sendMessage(m.chat, { text: 'Terjadi kesalahan saat mengunduh kode QR.' });
    }

    let capt = `Lakukan Pembayaran Sebesar "Rp ${Func.formatter(gateway.amount)}"\n`;
    capt += `(Sudah Termasuk Biaya Admin)\n\n`;
    capt += `QRIS Berlaku Selama 5 Menit atau Hingga ${gateway.expired}\n\n`;
    capt += '`Jika Sudah Melakukan Pembayaran tetapi Saldo belum masuk, Hubungi owner`\n\n';
    capt += 'Tutorial : \n\n';
    capt += '1. Buka aplikasi yang mendukung pembayaran dengan QRIS\n';
    capt += '2. Pilih fitur QRIS / Bayar\n';
    capt += '3. Pindai kode QR yang diberikan oleh Merchant\n';
    capt += '4. Pastikan tagihan yang ditagihkan sesuai\n';
    capt += '5. Klik tombol Konfirmasi\n';
    capt += '6. Masukkan PIN untuk menyelesaikan pembayaran\n';
    capt += '7. Setelah pembayaran berhasil, kamu akan dialihkan ke Halaman Hasil Pembayaran';

    let thumbnailUrl = 'https://example.com/thumbnail.jpg'; // Ganti dengan URL thumbnail yang valid
    let kemii = await conn.sendMessage(m.chat, {
        image: images,
        caption: capt,
        contextInfo: {
            mentionedJid: [m.sender],
            externalAdReply: {
                title: 'Pembayaran QRIS',
                body: 'Selesaikan pembayaran Anda dengan QRIS',
                thumbnailUrl: thumbnailUrl,
                mediaUrl: gateway.qrcode_url
            }
        }
    });

    conn.gateaway[m.sender] = m.sender;

    let startTime = Date.now();
    let timeout = 300000;
    let cektrx = "";
    let status = "";

    while (Date.now() - startTime < timeout) {
        try {
            cektrx = await paydisinic(gateway.unique_code);
        } catch (error) {
            console.error('Error checking transaction status:', error);
        }
        if (cektrx.status === "Success") {
            status = "sukses";
            break;
        }
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    if (status === "sukses") {
        await conn.sendMessage(m.chat, { text: `Pembayaran @${m.sender.replace(/@.+/g, '')} Berhasil dilakukan.`, contextInfo: { mentionedJid: [m.sender] } });
        users.saldo += Number(amount);
        await conn.sendMessage(m.chat, { text: `Saldo "Rp ${Func.formatter(amount)}" Berhasil ditambahkan.`, contextInfo: { mentionedJid: [m.sender] } });
        await conn.sendMessage(m.chat, { delete: kemii });
        delete conn.gateaway[m.sender];

        // Menambahkan bot ke grup dan mengatur waktu kadaluarsa
        if (amount >= 100 && amount <= 30000) {
            try {
                // Tambahkan bot ke grup terlebih dahulu
                await conn.groupAcceptInvite(code);
                
                // Mengatur waktu kadaluarsa grup setelah bot berhasil ditambahkan
                const expiredDays = await getPlanDays(plan);
                setGroupExpiry(m.chat, expiredDays);
                
                // Memberitahukan pengguna tentang pengaturan kadaluarsa
                await conn.sendMessage(m.chat, { text: `Bot berhasil ditambahkan ke grup. Grup ini akan aktif selama ${expiredDays} hari.\nHitung Mundur: ${msToDate(global.db.data.chats[m.chat].expired - Date.now())}`, contextInfo: { mentionedJid: [m.sender] } });
            } catch (error) {
                await conn.sendMessage(m.chat, { text: 'Gagal menambahkan bot ke grup. Pastikan tautan undangan valid.', contextInfo: { mentionedJid: [m.sender] } });
            }
        } else {
            await conn.sendMessage(m.chat, { text: 'Bot hanya akan bergabung ke grup untuk harga plan antara 500 hingga 30k.', contextInfo: { mentionedJid: [m.sender] } });
        }

        await conn.sendMessage(m.chat, { react: { text: '', key: m.key } });
    } else {
        await conn.sendMessage(m.chat, { text: `Pembayaran @${m.sender.replace(/@.+/g, '')} Gagal dilakukan.`, contextInfo: { mentionedJid: [m.sender] } });
        delete conn.gateaway[m.sender];
        await conn.sendMessage(m.chat, { delete: kemii });
        await conn.sendMessage(m.chat, { react: { text: '', key: m.key } });
    }
}

handler.help = ['deposit *<plan> <group-link>*'];
handler.tags = ['store', 'main'];
handler.command = /^(deposit|depo)$/i;
handler.register = true;
handler.limit = 5;

module.exports = handler;

async function getPlanAmount(plan) {
    switch(plan) {
        case 'basic':
            return 500; // Harga Basic
        case 'standard':
            return 1000; // Harga Standard
        case 'premium':
            return 5000; // Harga Premium
        case 'vip':
            return 30000; // Harga VIP
        default:
            return null;
    }
}

async function getPlanDays(plan) {
    switch(plan) {
        case 'basic':
            return 1; // 1 hari
        case 'standard':
            return 3; // 3 hari
        case 'premium':
            return 7; // 7 hari
        case 'vip':
            return 30; // 30 hari
        default:
            return null;
    }
}

async function setGroupExpiry(chatId, days) {
    const expiryMs = 86400000 * days;
   

 const now = Date.now();
    if (!global.db.data.chats[chatId]) {
        global.db.data.chats[chatId] = {};
    }
    global.db.data.chats[chatId].expired = now + expiryMs;
    const timeLeft = global.db.data.chats[chatId].expired - now;
    await conn.sendMessage(chatId, { text: `Grup ini akan aktif selama ${days} hari.\n\nHitung Mundur: ${msToDate(timeLeft)}`, contextInfo: { mentionedJid: [m.sender] } });
}

function msToDate(ms) {
    const days = Math.floor(ms / (24 * 60 * 60 * 1000));
    const daysms = ms % (24 * 60 * 60 * 1000);
    const hours = Math.floor(daysms / (60 * 60 * 1000));
    const hoursms = ms % (60 * 60 * 1000);
    const minutes = Math.floor(hoursms / (60 * 1000));
    const minutesms = ms % (60 * 1000);
    const sec = Math.floor(minutesms / 1000);
    return `${days} hari ${hours} jam ${minutes} menit ${sec} detik`;
}

async function paydisini(uniqueCode, amount) {
  const payKey = process.env.PAY_KEY;
  const rawSignature = payKey + uniqueCode + '11' + amount + '300' + 'NewTransaction';
  const signature = crypto.createHash('md5').update(rawSignature).digest('hex');

  const requestOptions = {
    method: 'POST',
    url: 'https://api.paydisini.co.id/v1/',
    data: new URLSearchParams({
      key: payKey,
      request: 'new',
      unique_code: uniqueCode,
      service: '11',
      amount: amount,
      note: 'Payment Gateway Kikuchanj',
      valid_time: '300',
      type_fee: '1',
      signature: signature,
    })
  };

  try {
    const response = await axios(requestOptions);
    return response.data.data;
  } catch (error) {
    console.error('Error in paydisini:', error.message);
    throw new Error('Error in paydisini: ' + error.message);
  }
}

async function paydisinic(uniqueCode) {
  const payKey = process.env.PAY_KEY;
  const rawSignature = payKey + uniqueCode + 'StatusTransaction';
  const signature = crypto.createHash('md5').update(rawSignature).digest('hex');

  const requestOptions = {
    method: 'POST',
    url: 'https://api.paydisini.co.id/v1/',
    data: new URLSearchParams({
      key: payKey,
      request: 'status',
      unique_code: uniqueCode,
      signature: signature,
    })
  };

  try {
    const response = await axios(requestOptions);
    return response.data.data;
  } catch (error) {
    console.error('Error in paydisini status check:', error.message);
    throw new Error('Error in paydisini status check: ' + error.message);
  }
}

async function sendQRCode(url) {
  try {
    const response = await axios({
      url: url,
      responseType: 'arraybuffer',
    });
    const buffer = Buffer.from(response.data, 'binary');
    return buffer;
  } catch (error) {
    console.error('Error downloading image:', error);
    throw new Error('Error downloading image: ' + error.message);
  }
}
```

## Informasi Tambahan

- **Custom Plan**: Pengguna dapat mencustom plan yang ada sesuai kebutuhan mereka.
- **Enkripsi Kode**: Kode ini telah dienkripsi. Jika Anda memerlukan versi tanpa enkripsi, Anda dapat membelinya dari [Valzy](https://wa.me/6285701479245) sebagai pencipta fitur ini.
- **Watermark**: Untuk menghormati pencipta fitur, pastikan untuk menyertakan watermark "Valzy" dalam setiap implementasi atau penggunaan fitur ini.
- **Konfigurasi Lingkungan**: Anda harus membuat file `.env` pada script bot Anda dengan isi sebagai berikut:
  ```env
  ## Paydisini : https://web.paydisini.co.id/
  PAY_KEY = '-'
  PAY_ID = '-'
  ```
  Pastikan untuk mengisi slot yang kosong dengan informasi yang sesuai.

Jika ada pertanyaan lebih lanjut atau kebutuhan tambahan, jangan ragu untuk bertanya!
