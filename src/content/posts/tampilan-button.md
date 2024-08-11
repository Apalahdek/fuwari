---
title: Fitur Sewabot Otomatis Button (Tampilan)
published: 2024-08-26
description: 'Sewabot Otomatis Pakai Paydisini'
image: ''
tags: [Free, Fitur, Botwa]
category: 'Free'
draft: false 
---

::github{repo="Valzyy/tampilan-button"}

:::tip
Jangan Lupa kasih Credits Gw ya cok, Jangan dijual juga ini fiturnya!!
:::

---


## Deskripsi Fitur

Fitur ini adalah fitur tampilan (button) dari fitur deposit QRIS yang telah dijelaskan sebelumnya. Fitur ini dirancang untuk memberikan antarmuka yang lebih mudah bagi pengguna untuk memilih rencana sewa bot dengan waktu yang berbeda. Pastikan Anda telah menyeting dan mengaktifkan fitur [Sewabot Otomati](https://www.valzyofc.my.id/posts/fitur-sewabot/) terlebih dahulu agar fitur ini dapat berfungsi dengan baik.

## Cara Kerja

1. **Penggunaan Fitur Tampilan**
   - Fitur ini memungkinkan pengguna untuk memilih paket waktu sewa bot dengan menggunakan tombol interaktif.
   - Pengguna akan mendapatkan daftar pilihan rencana waktu sewa bot yang tersedia, dan dapat memilih salah satu rencana untuk melanjutkan ke proses pembayaran menggunakan fitur sewabot otomatis.

2. **Pengaturan dan Kredit**
   - Anda diwajibkan untuk menyeting fitur [sewabot otomatis](https://www.valzyofc.my.id/posts/fitur-sewabot/) sebelum menggunakan fitur tampilan ini.
   - Kredit harus diberikan kepada [Valzyy](https://wa.me/6285701479245) sebagai pencipta fitur ini. Pastikan untuk menyertakan kredit yang sesuai saat menggunakan fitur ini.

## Kode

```javascript
const { generateWAMessageFromContent, proto, prepareWAMessageMedia } = require("@whiskeysockets/baileys");
const fetch = require('node-fetch');

let handler = async (m, { conn, text, command, usedPrefix, isOwner }) => {
    if (!text) return conn.reply(m.chat, '• *Example :* .joins https://chat.whatsapp.com/xxxxx', m);
    
    let sections = [{
        rows: [
            {
                title: '7 Days 2k',
                description: `7 Days Expired (Sewa Bot)`, 
                id: `${usedPrefix}depo basic ${text}`
            },
            {
                title: '15 Days 5k',
                description: `15 Days Expired (Sewa Bot)`, 
                id: `${usedPrefix}depo standard ${text}`
            },
            {
                title: '30 Days 16k',
                description: `30 Days Expired (Sewa Bot)`, 
                id: `${usedPrefix}depo premium ${text}`
            },
            {
                title: 'Permanent 30k',
                description: `No Expired Rent (Sewa Bot)`,
                id: `${usedPrefix}join ${text}`
            }
        ]
    }];

    let listMessage = {
        title: 'Time Expired!', 
        sections
    };

    let msg = generateWAMessageFromContent(m.chat, {
        viewOnceMessage: {
            message: {
                "messageContextInfo": {
                    "deviceListMetadata": {},
                    "deviceListMetadataVersion": 2
                },
                interactiveMessage: proto.Message.InteractiveMessage.create({
                    contextInfo: {
                        mentionedJid: [m.sender], 
                        isForwarded: true, 
                        forwardedNewsletterMessageInfo: {
                            newsletterJid: '120363144038483540@newsletter',
                            newsletterName: '© Nextzy', 
                            serverMessageId: -1
                        },
                        businessMessageForwardInfo: { businessOwnerJid: conn.decodeJid(conn.user.id) },
                        forwardingScore: 256,
                        externalAdReply: {  
                            title: 'Nextzy', 
                            thumbnailUrl: 'https://telegra.ph/file/a6f3ef42e42efcf542950.jpg', 
                            sourceUrl: 'https://youtube.com/shorts/eHM3CMiAQ9Y?si=sqJQ1gyRAnptIK0m',
                            mediaType: 1,
                            renderLargerThumbnail: true
                        }
                    }, 
                    body: proto.Message.InteractiveMessage.Body.create({
                        text: `Pilih Waktu Di Bawah.`
                    }),
                    footer: proto.Message.InteractiveMessage.Footer.create({
                        text: global.footer
                    }),
                    header: proto.Message.InteractiveMessage.Header.create({
                        title: `*Hello, @${m.sender.replace(/@.+/g, '')}!*`,
                        subtitle: "Kemii",
                        hasMediaAttachment: true, 
                        ...(await prepareWAMessageMedia({ image: { url: 'https://telegra.ph/file/0bf450ae7b472a4e03096.jpg' } }, { upload: conn.waUploadToServer }))
                    }),
                    nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                        buttons: [
                            {
                                "name": "single_select",
                                "buttonParamsJson": JSON.stringify(listMessage) 
                            }
                        ],
                    })
                })
            }
        }
    }, {});

    await conn.relayMessage(msg.key.remoteJid, msg.message, {
        messageId: msg.key.id
    });
}

handler.tags = ['owner'];
handler.help = ['joins *<link>*'];
handler.command = /^(joins)$/i;
handler.premium = false;

module.exports = handler;
```

## Informasi Tambahan

- **Persyaratan**: Pastikan Anda telah mengaktifkan dan menyeting fitur [sewabot otomatis](https://www.valzyofc.my.id/posts/fitur-sewabot/) sebelum menggunakan fitur tampilan ini.
- **Kredit**: Penggunaan fitur ini memerlukan kredit kepada [Valzyy](https://wa.me/6285701479245). Pastikan untuk memberikan kredit yang sesuai dalam setiap implementasi.
- **Cara Penggunaan**: Setelah fitur deposit QRIS diatur, Anda dapat menggunakan fitur ini untuk menampilkan tombol pilihan rencana waktu sewa bot kepada pengguna.

Jika Anda memiliki pertanyaan atau memerlukan bantuan tambahan, jangan ragu untuk menghubungi kami.
