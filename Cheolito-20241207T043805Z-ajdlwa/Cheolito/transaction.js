// Get the receipt list element
const receiptList = document.getElementById('receipt-list');

// Retrieve the receipts from localStorage
const receipts = JSON.parse(localStorage.getItem('receiptsss')) || [];  // Ensure the correct key

// Function to render the list of receipts
function renderReceipts() {
  if (receipts.length === 0) {
    receiptList.innerHTML = '<p>No receipts found.</p>';
    return;
  }

  receiptList.innerHTML = ''; // Clear the receipt list

  // Loop through each receipt and display it
  receipts.forEach(receipt => {
    const receiptItem = document.createElement('div');
    receiptItem.classList.add('receipt-item');
    receiptItem.innerHTML = `
      <p>Receipt ID: ${receipt.id}</p>
      <button class="view-details-btn" data-id="${receipt.id}">View Details</button>
    `;

    // Add event listener to view receipt details when clicked
    const viewDetailsBtn = receiptItem.querySelector('.view-details-btn');
    viewDetailsBtn.addEventListener('click', () => showReceiptDetails(receipt.id));

    receiptList.appendChild(receiptItem);
  });
}

// Function to display the receipt details
function showReceiptDetails(receiptId) {
  const receipt = receipts.find(r => r.id === receiptId);

  if (!receipt) {
    document.getElementById('receipt-details').innerHTML = '<p>Receipt not found.</p>';
    return;
  }

  let receiptInfo = `
    <h3>Receipt ID: ${receipt.id}</h3>
    <p>Date: ${receipt.date}</p>
    <h4>Products:</h4>
    <ul>
  `;

  // Loop through each product in the receipt and display its details
  receipt.products.forEach(product => {
    receiptInfo += `
      <li>${product.name} - $${product.price} x ${product.quantity}</li>
    `;
  });

  // Add subtotal, tax, and total to the receipt info
  receiptInfo += `
    </ul>
    <p><strong>Subtotal:</strong> $${receipt.subtotal}</p>
    <p><strong>Tax (12%):</strong> $${receipt.tax}</p>
    <p><strong>Total:</strong> $${receipt.total}</p>
  `;

  // Display the receipt details in the UI
  document.getElementById('receipt-details').innerHTML = receiptInfo;
}

// Initial load: render all receipts
renderReceipts();
