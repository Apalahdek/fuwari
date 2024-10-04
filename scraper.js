const fs = require('fs');
const path = require('path');
const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// Periksa apakah package.json ada, jika tidak buat satu
const packageJsonPath = path.join(__dirname, 'package.json');
if (!fs.existsSync(packageJsonPath)) {
  const packageJson = {
    name: "showroom-scraper",
    version: "1.0.0",
    description: "Showroom scraper API for Vercel",
    main: "index.js",
    dependencies: {
      express: "^4.18.2",
      axios: "^1.4.0"
    }
  };
  
  // Tulis package.json
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  console.log('package.json created successfully');
}

// Endpoint untuk mengambil data dari API Showroom
app.get('/api/onlives', async (req, res) => {
  try {
    // Meminta data dari API Showroom
    const response = await axios.get('https://www.showroom-live.com/api/live/onlives');

    // Menampilkan hasil sebagai JSON
    res.json({
      status: 'success',
      data: response.data
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: 'Failed to fetch data from Showroom API' });
  }
});

// Menjalankan server lokal
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
