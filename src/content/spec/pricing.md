<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pricing List</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 20px;
        }
        .pricing-table {
            display: flex;
            justify-content: space-around;
            flex-wrap: wrap;
        }
        .pricing-item {
            background: white;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            margin: 20px;
            padding: 20px;
            text-align: center;
            width: 300px;
        }
        .pricing-item img {
            max-width: 100%;
            border-radius: 10px;
        }
        .price {
            font-size: 24px;
            font-weight: bold;
            margin: 10px 0;
        }
        .checkout-button {
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 5px;
            padding: 10px 20px;
            cursor: pointer;
            text-decoration: none;
        }
        .checkout-button:hover {
            background-color: #0056b3;
        }
    </style>
</head>
<body>

    <h1>Pricing List</h1>

    <div class="pricing-table">
        <div class="pricing-item">
            <img src="https://telegra.ph/file/9767e04450c1bd323d538.jpg" alt="Product Image">
            <h2>Product Name</h2>
            <div class="price">$19.99</div>
            <a href="your-checkout-url" class="checkout-button">Checkout</a>
        </div>
        <!-- Repeat this block for more products -->
    </div>

</body>
</html>
