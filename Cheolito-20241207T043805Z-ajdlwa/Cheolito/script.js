const initialProducts = [
  { id: 'SKU001', name: 'Refrigerator', price: 299.99, stock: 5, image: 'data:image/jpeg;base64,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' },
  { id: 'SKU002', name: 'Microwave', price: 79.99, stock: 10, image: 'https://i.imgur.com/microwave.jpg' },
  { id: 'SKU003', name: 'Dishwasher', price: 199.99, stock: 7, image: 'https://i.imgur.com/dishwasher.jpg' },
  { id: 'SKU004', name: 'Washing Machine', price: 499.99, stock: 3, image: 'https://i.imgur.com/washing.jpg' },
  { id: 'SKU005', name: 'Air Conditioner', price: 349.99, stock: 2, image: 'https://i.imgur.com/aircon.jpg' },
  { id: 'SKU006', name: 'Blender', price: 49.99, stock: 15, image: 'https://i.imgur.com/blender.jpg' },
  { id: 'SKU007', name: 'Toaster', price: 29.99, stock: 20, image: 'https://i.imgur.com/toaster.jpg' },
  { id: 'SKU008', name: 'Vacuum Cleaner', price: 159.99, stock: 8, image: 'https://i.imgur.com/vacuum.jpg' },
  { id: 'SKU009', name: 'Coffee Maker', price: 89.99, stock: 12, image: 'https://i.imgur.com/water-heater.jpg' },
  { id: 'SKU010', name: 'Electric Kettle', price: 39.99, stock: 10, image: 'https://i.imgur.com/electric-kettle.jpg' },
];


/// Ensure `productsss` is set in localStorage if not already initialized
if (!localStorage.getItem('productsss')) {
  localStorage.setItem('productsss', JSON.stringify(initialProducts));
}

// Load products from localStorage (this ensures the latest stock values)
let products = JSON.parse(localStorage.getItem('productsss'));

// Elements
const productList = document.getElementById('product-list');
const cartIcon = document.getElementById('cart-icon');
const cartCount = document.getElementById('cart-count');
const cart = document.getElementById('cart');
const cartItems = document.getElementById('cart-items');
const totalPriceElement = document.getElementById('total-price');
const checkoutBtn = document.getElementById('checkout-btn');
const notification = document.getElementById('notification');
const receiptPopup = document.getElementById('receipt-popup');
const receiptDetails = document.getElementById('receipt-details');
const closePopup = document.getElementById('close-popup');

// Cart state
let cartData = [];

// Function to display the product list
function displayProducts() {
  productList.innerHTML = '';
  products.forEach(product => {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');
    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>₱${product.price.toFixed(2)}</p>
      <p>Stock: ${product.stock}</p>
      <button ${product.stock === 0 ? 'disabled' : ''} class="add-to-cart-btn" data-id="${product.id}">
        ${product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
      </button>
    `;
    productList.appendChild(productCard);
  });
}

// Function to update localStorage when stock changes
function updateStockInLocalStorage() {
  localStorage.setItem('productsss', JSON.stringify(products));
}

// Function to add product to cart
function addToCart(productId) {
  const productIndex = products.findIndex(p => p.id === productId);
  if (productIndex !== -1 && products[productIndex].stock > 0) {
    // Decrease stock by 1
    products[productIndex].stock--;

    // Update localStorage with new stock value
    updateStockInLocalStorage();

    const cartItem = cartData.find(item => item.id === productId);
    if (cartItem) {
      cartItem.quantity++;
    } else {
      cartData.push({ ...products[productIndex], quantity: 1 });
    }

    updateCart();
    displayProducts();
    showNotification(`${products[productIndex].name} added to cart!`);
  }
}

// Function to update the cart display
function updateCart() {
  cartItems.innerHTML = '';
  let total = 0;
  cartData.forEach(item => {
    total += item.price * item.quantity;
    const cartItem = document.createElement('li');
    cartItem.textContent = `${item.name} x${item.quantity} - ₱${(item.price * item.quantity).toFixed(2)}`;
    cartItems.appendChild(cartItem);
  });
  cartCount.textContent = cartData.length;
  totalPriceElement.textContent = total.toFixed(2);
  cart.classList.toggle('hidden', cartData.length === 0);
}

// Function to checkout
function checkout() {
  if (cartData.length === 0) {
    alert('Your cart is empty.');
    return;
  }

  // Generate the receipt details
  const receiptId = `R${Math.floor(Math.random() * 1000000)}`;
  const date = new Date().toLocaleString();
  let receiptDetails = `Receipt ID: ${receiptId}\nDate: ${date}\nProducts:\n`;

  let totalPrice = 0;
  cartData.forEach(item => {
    totalPrice += item.price * item.quantity;
    receiptDetails += `${item.name} - ₱${item.price} x ${item.quantity}\n`;
  });

  // Calculate tax (12%)
  const tax = totalPrice * 0.12;
  const totalWithTax = totalPrice - tax;

  receiptDetails += `\nSub Total (less vat): ₱${totalWithTax.toFixed(2)}`;
  receiptDetails += `\nTax (12%): ₱${tax.toFixed(2)}`;
  receiptDetails += `\nTotal: ₱${totalPrice.toFixed(2)}`;

  alert(receiptDetails);

  // Call saveReceipt function to store receipt
  saveReceipt(receiptId, date, totalPrice, tax, totalWithTax);

  // Clear the cart after checkout
  cartData = [];
  localStorage.setItem('cartData', JSON.stringify(cartData)); // Update cart in localStorage
  updateCart();
}

// Function to save receipt to localStorage
function saveReceipt(receiptId, date, totalPrice, tax, totalWithTax) {
  const receiptDetails = {
    id: receiptId,
    date: date,
    products: cartData.map(item => ({
      name: item.name,
      price: item.price,
      quantity: item.quantity
    })),
    subtotal: totalPrice.toFixed(2),
    tax: tax.toFixed(2),
    total: totalWithTax.toFixed(2)
  };

  // Retrieve existing receipts from localStorage
  const existingReceipts = JSON.parse(localStorage.getItem('receiptsss')) || [];

  // Add the new receipt to the receipts array
  existingReceipts.push(receiptDetails);

  // Save the updated receipts array back to localStorage
  localStorage.setItem('receiptsss', JSON.stringify(existingReceipts));

  alert(`Receipt saved successfully. Receipt ID: ${receiptId}`);
}

// Function to display notifications
function showNotification(message) {
  notification.textContent = message;
  notification.classList.remove('hidden');
  setTimeout(() => notification.classList.add('hidden'), 3000);
}

// Function to display the receipt
function showReceipt(content) {
  receiptDetails.textContent = content;
  receiptPopup.classList.add('visible');
}

// Close receipt popup
function closeReceipt() {
  receiptPopup.classList.remove('visible');
}

// Event listeners
document.addEventListener('click', e => {
  if (e.target.classList.contains('add-to-cart-btn')) {
    addToCart(e.target.dataset.id);
  }
});

checkoutBtn.addEventListener('click', checkout);
closePopup.addEventListener('click', closeReceipt);

// Initial render
displayProducts();

// Function to open/close the cart
function toggleCart() {
  if (cart.classList.contains('hidden')) {
    cart.classList.remove('hidden');
    cart.style.transform = 'translateX(0)';
  } else {
    cart.style.transform = 'translateX(100%)';
    setTimeout(() => cart.classList.add('hidden'), 300); // hide after transition
  }
}

// Event listener for the cart icon
cartIcon.addEventListener('click', toggleCart);
