<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Blog Valzyy</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
        }
        .pricing-list {
            margin-bottom: 20px;
        }
        .product {
            border: 1px solid #ddd;
            border-radius: 8px;
            padding: 10px;
            text-align: center;
            width: 200px;
            display: inline-block;
            margin-right: 20px;
        }
        .product img {
            width: 100%;
            border-radius: 8px;
        }
        .checkout-btn {
            background-color: #4CAF50;
            color: white;
            border: none;
            padding: 5px 10px;
            border-radius: 5px;
            cursor: pointer;
        }
        .checkout-btn:hover {
            background-color: #45a049;
        }
        .popup {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            justify-content: center;
            align-items: center;
        }
        .popup-content {
            background-color: white;
            padding: 20px;
            border-radius: 8px;
            width: 300px;
            text-align: center;
        }
        .popup-close {
            background-color: red;
            color: white;
            border: none;
            padding: 5px 10px;
            border-radius: 5px;
            cursor: pointer;
            float: right;
        }
        .popup-close:hover {
            background-color: darkred;
        }
        .form-input {
            width: 100%;
            padding: 8px;
            margin: 5px 0;
            border: 1px solid #ccc;
            border-radius: 4px;
        }
    </style>
</head>
<body>

<h1>Blog Valzyy</h1>

<h2>Pricing List</h2>
<div class="pricing-list">
    <div class="product">
        <img src="https://telegra.ph/file/9767e04450c1bd323d538.jpg" alt="Product Image">
        <h3>Produk 1</h3>
        <p>Harga: Rp100.000</p>
        <button class="checkout-btn" onclick="showPopup()">Checkout</button>
    </div>
</div>

<div class="popup" id="popup">
    <div class="popup-content">
        <button class="popup-close" onclick="hidePopup()">X</button>
        <h3>Isi Formulir</h3>
        <form id="checkoutForm">
            <input type="email" class="form-input" placeholder="Email Anda" required>
            <input type="text" class="form-input" placeholder="Nama Anda" required>
            <input type="text" class="form-input" placeholder="Alamat" required>
            <button type="submit" class="checkout-btn">Kirim</button>
        </form>
    </div>
</div>

<script>
    function showPopup() {
        document.getElementById('popup').style.display = 'flex';
    }
    function hidePopup() {
        document.getElementById('popup').style.display = 'none';
    }
    
    document.getElementById('checkoutForm').addEventListener('submit', function(event) {
        event.preventDefault();
        alert("Formulir telah dikirim!");
        hidePopup();
    });
</script>

</body>
</html>
