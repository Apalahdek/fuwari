<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Pricing</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css">
</head>
<body>

<!-- Pricing Section -->
<div class="container mx-auto py-12">
  <h1 class="text-4xl font-bold text-center mb-12">Pricing Plans</h1>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    
    <!-- Basic Plan -->
    <div class="card-base p-6 rounded-lg shadow-md border text-center">
      <img src="https://telegra.ph/file/ee2fd9ee8b03a68274b71.jpg" alt="Basic Plan Image" class="w-full h-48 object-cover rounded-md mb-4">
      <h2 class="text-xl font-semibold">Basic Plan</h2>
      <p class="text-gray-600 mt-2">Perfect for personal use.</p>
      <p class="text-2xl font-bold mt-4">$10/month</p>
      <ul class="mt-4 space-y-2">
        <li>✔️ 10 GB Storage</li>
        <li>✔️ 100 GB Bandwidth</li>
        <li>✔️ Basic Support</li>
      </ul>
      <button data-plan-name="Basic Plan" class="pay-now mt-6 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Pay Now</button>
    </div>

    <!-- Pro Plan -->
    <div class="card-base p-6 rounded-lg shadow-md border text-center">
      <img src="https://telegra.ph/file/ee2fd9ee8b03a68274b71.jpg" alt="Pro Plan Image" class="w-full h-48 object-cover rounded-md mb-4">
      <h2 class="text-xl font-semibold">Pro Plan</h2>
      <p class="text-gray-600 mt-2">Best for small businesses.</p>
      <p class="text-2xl font-bold mt-4">$30/month</p>
      <ul class="mt-4 space-y-2">
        <li>✔️ 50 GB Storage</li>
        <li>✔️ 500 GB Bandwidth</li>
        <li>✔️ Priority Support</li>
      </ul>
      <button data-plan-name="Pro Plan" class="pay-now mt-6 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Pay Now</button>
    </div>

    <!-- Enterprise Plan -->
    <div class="card-base p-6 rounded-lg shadow-md border text-center">
      <img src="https://telegra.ph/file/ee2fd9ee8b03a68274b71.jpg" alt="Enterprise Plan Image" class="w-full h-48 object-cover rounded-md mb-4">
      <h2 class="text-xl font-semibold">Enterprise Plan</h2>
      <p class="text-gray-600 mt-2">For large companies.</p>
      <p class="text-2xl font-bold mt-4">$100/month</p>
      <ul class="mt-4 space-y-2">
        <li>✔️ Unlimited Storage</li>
        <li>✔️ Unlimited Bandwidth</li>
        <li>✔️ 24/7 Dedicated Support</li>
      </ul>
      <button data-plan-name="Enterprise Plan" class="pay-now mt-6 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Pay Now</button>
    </div>

  </div>
</div>

<!-- Payment Details Modal -->
<div id="paymentModal" class="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50 hidden">
  <div class="bg-white rounded-lg p-8 w-full max-w-md shadow-lg">
    <h2 class="text-2xl font-semibold mb-4">Enter Payment Details</h2>
    <form id="paymentForm">
      <div class="mb-4">
        <label for="whatsapp" class="block text-sm font-medium text-gray-700">WhatsApp Number</label>
        <input type="text" id="whatsapp" name="whatsapp" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" required>
      </div>
      <div class="mb-4">
        <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
        <input type="email" id="email" name="email" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" required>
      </div>
      <div class="mb-4">
        <label for="fullName" class="block text-sm font-medium text-gray-700">Full Name</label>
        <input type="text" id="fullName" name="fullName" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" required>
      </div>
      <div class="flex justify-end">
        <button type="button" class="mr-2 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600" onclick="closeModal()">Cancel</button>
        <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Confirm Payment</button>
      </div>
    </form>
  </div>
</div>

<script>
  // Open modal when Pay Now button is clicked
  const payButtons = document.querySelectorAll('.pay-now');
  payButtons.forEach(button => {
    button.addEventListener('click', function(event) {
      event.preventDefault();
      const planName = button.getAttribute('data-plan-name');
      document.getElementById('paymentForm').setAttribute('data-plan-name', planName);
      document.getElementById('paymentModal').classList.remove('hidden');
    });
  });

  // Close modal
  function closeModal() {
    document.getElementById('paymentModal').classList.add('hidden');
  }

  // Handle form submission
  document.getElementById('paymentForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const formData = new FormData(this);
    const paymentDetails = {
      whatsapp: formData.get('whatsapp'),
      email: formData.get('email'),
      fullName: formData.get('fullName'),
      planName: this.getAttribute('data-plan-name')
    };

    // Proceed with payment API call or any other necessary actions here
    console.log('Payment details:', paymentDetails);

    // Example: Displaying a success message
    alert(`Payment initiated for the ${paymentDetails.planName} plan.`);

    // Close the modal after submission
    closeModal();
  });
</script>

</body>
</html>
