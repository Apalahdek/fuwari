<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pricing List with Popup</title>
    <style>
        /* Main Pricing Section */
        .pricing-container {
            text-align: center;
            padding: 20px;
            color: #ffffff;
            font-family: Arial, sans-serif;
            background-color: #121212;
            min-height: 100vh;
        }

        .pricing-card {
            background-color: #1e1e1e;
            border-radius: 10px;
            padding: 20px;
            margin: 20px auto;
            width: 300px;
            box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
        }

        .pricing-image {
            width: 100%;
            border-radius: 10px;
        }

        .pricing-card h3 {
            margin-top: 15px;
            color: #ffffff;
        }

        .pricing-card ul {
            list-style-type: none;
            padding: 0;
            text-align: left;
        }

        .pricing-card ul li {
            margin-bottom: 10px;
        }

        .checkout-button {
            background-color: #3b82f6;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            margin-top: 10px;
        }

        .checkout-button:hover {
            background-color: #2563eb;
        }

        /* Popup Overlay */
        .popup-overlay {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.7);
            justify-content: center;
            align-items: center;
        }

        .popup-content {
            background-color: #1e1e1e;
            border-radius: 10px;
            padding: 20px;
            text-align: center;
            width: 300px;
            color: #ffffff;
            position: relative;
        }

        .close-button {
            position: absolute;
            top: 10px;
            right: 10px;
            color: white;
            font-size: 20px;
            cursor: pointer;
        }

        .finalize-button {
            background-color: #3b82f6;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            margin-top: 20px;
        }

        .finalize-button:hover {
            background-color: #2563eb;
        }
    </style>
</head>
<body>

    <div class="pricing-container">
        <h2>Pricing</h2>
        <p>Here are the current pricing options available:</p>

        <div class="pricing-card">
            <img src="https://example.com/basic-plan-image.jpg" alt="Basic Plan Image" class="pricing-image">
            <h3>Basic Plan</h3>
            <p>Perfect for personal use.</p>
            <p><strong>$10/month</strong></p>
            <ul>
                <li>10 GB Storage</li>
                <li>100 GB Bandwidth</li>
                <li>Basic Support</li>
            </ul>
            <button class="checkout-button" onclick="openPopup()">Checkout</button>
        </div>

        <!-- Repeat this block for additional pricing plans -->

    </div>

    <!-- Popup structure -->
    <div id="popup" class="popup-overlay">
        <div class="popup-content">
            <span class="close-button" onclick="closePopup()">&times;</span>
            <h3>Complete Your Purchase</h3>
            <p>You have selected the Basic Plan for $10/month.</p>
            <button class="finalize-button">Proceed to Checkout</button>
        </div>
    </div>

    <script>
        function openPopup() {
            document.getElementById("popup").style.display = "flex";
        }

        function closePopup() {
            document.getElementById("popup").style.display = "none";
        }
    </script>

</body>
</html>
