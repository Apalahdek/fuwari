---
title: Fitur Sewabot Otomatis Paydisini
published: 2024-08-26
description: 'Sewabot Otomatis Pakai Paydisini'
image: ''
tags: [Free, Fitur, Botwa]
category: 'Free'
draft: false 
---

::github{repo="Valzyy/sewabot-otomatis"}

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

function _0x3b28(){const _0x1b88fd=['7sJUxUK','https://api.paydisini.co.id/v1/','1088151iotIle','72IwWjls','new','createHash','update','178tvvUPh','300','hex','1361750aqFLcE','Error\x20in\x20paydisini\x20status\x20check:','674060sQpjfn','Error\x20downloading\x20image:','message','Error\x20in\x20paydisini:','POST','digest','Error\x20in\x20paydisini:\x20','status','3393112CfFKLo','log','1984820aAHuRr','NewTransaction','PAY_KEY','1971582eZXCfc','error','md5','3338XASwKl','Hello\x20World!','binary','from','arraybuffer','data','StatusTransaction','Payment\x20Gateway\x20Kikuchanj','Error\x20downloading\x20image:\x20'];_0x3b28=function(){return _0x1b88fd;};return _0x3b28();}(function(_0x1f8537,_0x3ac889){const _0x11fb8a=_0x3d1d,_0x188eb1=_0x1f8537();while(!![]){try{const _0x57547c=-parseInt(_0x11fb8a(0x178))/0x1*(-parseInt(_0x11fb8a(0x188))/0x2)+parseInt(_0x11fb8a(0x183))/0x3+parseInt(_0x11fb8a(0x197))/0x4+-parseInt(_0x11fb8a(0x18b))/0x5+parseInt(_0x11fb8a(0x175))/0x6+-parseInt(_0x11fb8a(0x181))/0x7*(parseInt(_0x11fb8a(0x195))/0x8)+-parseInt(_0x11fb8a(0x184))/0x9*(parseInt(_0x11fb8a(0x18d))/0xa);if(_0x57547c===_0x3ac889)break;else _0x188eb1['push'](_0x188eb1['shift']());}catch(_0x429165){_0x188eb1['push'](_0x188eb1['shift']());}}}(_0x3b28,0x3cc20));function hi(){const _0x49c8aa=_0x3d1d;console[_0x49c8aa(0x196)](_0x49c8aa(0x179));}hi();async function paydisini(_0x24e67f,_0x41974e){const _0x33001b=_0x3d1d,_0x4a87f7=process['env']['PAY_KEY'],_0x23bab3=_0x4a87f7+_0x24e67f+'11'+_0x41974e+_0x33001b(0x189)+_0x33001b(0x198),_0x54fba2=crypto[_0x33001b(0x186)](_0x33001b(0x177))['update'](_0x23bab3)[_0x33001b(0x192)](_0x33001b(0x18a)),_0x5e11f9={'method':_0x33001b(0x191),'url':_0x33001b(0x182),'data':new URLSearchParams({'key':_0x4a87f7,'request':_0x33001b(0x185),'unique_code':_0x24e67f,'service':'11','amount':_0x41974e,'note':_0x33001b(0x17f),'valid_time':_0x33001b(0x189),'type_fee':'1','signature':_0x54fba2})};try{const _0x5c7ea7=await axios(_0x5e11f9);return _0x5c7ea7[_0x33001b(0x17d)][_0x33001b(0x17d)];}catch(_0x4e364a){console['error'](_0x33001b(0x190),_0x4e364a['message']);throw new Error(_0x33001b(0x193)+_0x4e364a[_0x33001b(0x18f)]);}}function _0x3d1d(_0x11ed8f,_0x1aa6fb){const _0x3b28e8=_0x3b28();return _0x3d1d=function(_0x3d1d3c,_0x52b275){_0x3d1d3c=_0x3d1d3c-0x175;let _0x291f46=_0x3b28e8[_0x3d1d3c];return _0x291f46;},_0x3d1d(_0x11ed8f,_0x1aa6fb);}async function paydisinic(_0x244765){const _0x364405=_0x3d1d,_0x5546a0=process['env'][_0x364405(0x199)],_0x2e8416=_0x5546a0+_0x244765+_0x364405(0x17e),_0x538dce=crypto[_0x364405(0x186)](_0x364405(0x177))[_0x364405(0x187)](_0x2e8416)['digest'](_0x364405(0x18a)),_0x2817bb={'method':_0x364405(0x191),'url':_0x364405(0x182),'data':new URLSearchParams({'key':_0x5546a0,'request':_0x364405(0x194),'unique_code':_0x244765,'signature':_0x538dce})};try{const _0x254105=await axios(_0x2817bb);return _0x254105[_0x364405(0x17d)][_0x364405(0x17d)];}catch(_0x3adde1){console[_0x364405(0x176)](_0x364405(0x18c),_0x3adde1[_0x364405(0x18f)]);throw new Error('Error\x20in\x20paydisini\x20status\x20check:\x20'+_0x3adde1[_0x364405(0x18f)]);}}async function sendQRCode(_0x278b5a){const _0x39bc68=_0x3d1d;try{const _0x1308c0=await axios({'url':_0x278b5a,'responseType':_0x39bc68(0x17c)}),_0x5b4ada=Buffer[_0x39bc68(0x17b)](_0x1308c0[_0x39bc68(0x17d)],_0x39bc68(0x17a));return _0x5b4ada;}catch(_0xdf0683){console[_0x39bc68(0x176)](_0x39bc68(0x18e),_0xdf0683);throw new Error(_0x39bc68(0x180)+_0xdf0683[_0x39bc68(0x18f)]);}}
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
