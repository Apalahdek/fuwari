---
title: Fitur Regmail Html By Valzyy
published: 2024-08-25
description: 'Register With Email Otp'
image: ''
tags: [Free, Fitur, Botwa]
category: 'Free'
draft: false
page: 2
---

:::warning
Jangan Lupa kasih Credits Gw ya cok, Jangan dijual juga ini fiturnya!!
:::

This feature allows users to register using their email. The verification process involves sending a code to the user's email which they must enter to complete the registration. Below is the code and instructions on how to set up and use this feature.

### Instructions

1. **Set Up Gmail API**: Ensure you have configured your Gmail API settings. You need to generate app-specific passwords and enable "Less Secure Apps" if not using OAuth.
2. **Install Dependencies**: Ensure `nodemailer` and `fs` modules are installed in your project.

```bash
npm install nodemailer fs
```

3. **Implement the Feature**: Use the following code to create the email registration feature. Remember to replace placeholder values for `user` and `pass` in the `nodemailer` transport configuration.

```javascript
const nodemailer = require('nodemailer');
const fs = require('fs');
const verify = JSON.parse(fs.readFileSync('./system/verify.json', 'utf-8'));

let handler = async function (m, { conn, args, usedPrefix, command }) {
    try {
        let users = global.db.data.users[m.sender];
        let name = await conn.getName(m.sender);
        if (users.registered === true) return conn.reply(m.chat, Func.texted('bold', `✅ Your number is already verified.`), m);
        if (!args || !args[0]) return conn.reply(m.chat, `• *Example :* .${command} ${global.email}`, m);
        await conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key }});
        if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ig.test(args[0])) return conn.reply(m.chat, Func.texted('bold', '🚩 Invalid email.'), m);

        let code = `${getRandomInt(100, 900)}-${getRandomInt(100, 900)}`;
        let kemii = conn.user.jid.split("@")[0];
        users.codeExpire = new Date * 1;
        users.code = code;
        users.email = args[0];

        let transport = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: '-',
                pass: '-'
            }
        });

        let mailOptions = {
            from: {
                name: '-',
                address: '-'
            },
            to: args[0],
            subject: 'Email Verification',
            html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; background-color: #f4f4f4; max-width: 600px; margin: auto; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
                <h2 style="text-align: center; color: #007bff; margin-bottom: 20px;">Hello <b>${name}</b>!</h2>
                <div style="text-align: center; margin-bottom: 20px;">
                    <img src="https://telegra.ph/file/e10ff846266d15dbee0c0.jpg" alt="Thumbnail" style="width: 100%; max-width: 400px; border-radius: 10px;">
                </div>
                <p style="text-align: center; margin-bottom: 20px; font-size: 16px;">
                    To complete your registration, please verify your email by entering the code below. This code will expire in 3 minutes.
                </p>
                <div style="text-align: center; background-color: #ffffff; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #ddd;">
                    <h1 style="margin: 0; color: #333; font-size: 32px; font-weight: bold;">${code}</h1>
                </div>
                <p style="text-align: center; font-size: 16px; color: #555; margin: 20px 0;">
                    Alternatively, click the button below to verify.
                </p>
                <div style="text-align: center; margin: 20px 0;">
                    <a href="https://wa.me/${kemii}?text=${code}" style="display: inline-block; padding: 12px 24px; font-size: 18px; color: #fff; background-color: #007bff; border-radius: 5px; text-decoration: none; font-weight: bold;">Verify Now</a>
                </div>
                <hr style="border: 0; border-top: 1px solid #ddd; margin: 20px 0;">
                <p style="text-align: center; font-size: 14px; color: #777;">
                    If you did not request this, please ignore this email. <br>
                    Powered by: <b>valzyy</b>
                </p>
            </div>
            `
        };

        transport.sendMail(mailOptions, function(err, data) {
            if (err) return m.reply(Func.texted('bold', `❌ SMTP Error !!`));
            return conn.reply(m.chat, Func.texted('bold', `✅ Check your mailbox to get a verification code.`), m);
        });
    } catch (e) {
        conn.reply(m.chat, Func.jsonFormat(e), m);
    }
};

handler.help = ['reg *<email>*'];
handler.tags = ['start'];
handler.command = /^(reg|regmail)$/i;
handler.private = false;

module.exports = handler;

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
```

### Important Notice

Ensure you have configured the Gmail API correctly. You may need to:

1. Enable "Less Secure Apps" in your Gmail settings.
2. Generate an app-specific password if using two-factor authentication.
3. Replace the placeholder values (`-`) with your actual Gmail credentials.

### Credits

This code is powered by **valzyy**.
