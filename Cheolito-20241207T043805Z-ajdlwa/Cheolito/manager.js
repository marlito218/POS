// Ensure products are initialized in localStorage
const initialProducts = [
  { id: 'SKU001', name: 'Refrigerator', price: 299.99, stock: 5 },
  { id: 'SKU002', name: 'Microwave', price: 79.99, stock: 10 },
  { id: 'SKU003', name: 'Dishwasher', price: 199.99, stock: 7 },
  { id: 'SKU004', name: 'Washing Machine', price: 499.99, stock: 3 },
  { id: 'SKU005', name: 'Air Conditioner', price: 349.99, stock: 2 },
  { id: 'SKU006', name: 'Blender', price: 49.99, stock: 15 },
  { id: 'SKU007', name: 'Toaster', price: 29.99, stock: 20 },
  { id: 'SKU008', name: 'Vacuum Cleaner', price: 159.99, stock: 8 },
  { id: 'SKU009', name: 'Coffee Maker', price: 89.99, stock: 12 },
  { id: 'SKU010', name: 'Electric Kettle', price: 39.99, stock: 10 },
];

// Initialize localStorage with default products if not already set
if (!localStorage.getItem('productsss')) {
  localStorage.setItem('productsss', JSON.stringify(initialProducts));
}

// Load products from localStorage
let products = JSON.parse(localStorage.getItem('productsss'));

// Elements
const searchBar = document.getElementById('search-bar');
const productTableBody = document.querySelector('#product-table tbody');

// Function to render products in the table
function renderProducts(filter = '') {
  productTableBody.innerHTML = ''; // Clear table body

  const filteredProducts = products.filter(product =>
    product.id.toLowerCase().includes(filter.toLowerCase())
  );

  filteredProducts.forEach(product => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${product.id}</td>
      <td>${product.name}</td>
      <td>$${product.price.toFixed(2)}</td>
      <td>
        <input type="number" value="${product.stock}" min="0" class="stock-input" data-id="${product.id}" />
      </td>
      <td>
        <button class="save-btn" data-id="${product.id}">Save</button>
      </td>
    `;
    productTableBody.appendChild(row);
  });
}

// Function to update stock in localStorage
function updateStock(productId, newStock) {
  const productIndex = products.findIndex(product => product.id === productId);
  if (productIndex !== -1) {
    products[productIndex].stock = newStock;

    // Update localStorage with new stock values
    localStorage.setItem('productsss', JSON.stringify(products));

    alert(`Stock updated for ${products[productIndex].name}.`);
  } else {
    alert('Product not found!');
  }
}

/// Track products already alerted for low stock
let alertedProducts = new Set();

// Function to constantly check stock levels
function checkStockLevels() {
  let lowStockAlert = [];
  
  products.forEach(product => {
    if (product.stock < 10 && !alertedProducts.has(product.id)) {
      lowStockAlert.push(`${product.name} (Stock: ${product.stock})`);
      alertedProducts.add(product.id); // Add to alerted products
    }
  });

  if (lowStockAlert.length > 0) {
    alert(`Low Stock Alert:\n${lowStockAlert.join('\n')}`);
  }
}

// Function to reset alerted products if stock is replenished
function resetAlertedProducts() {
  alertedProducts.forEach(productId => {
    const product = products.find(p => p.id === productId);
    if (product && product.stock >= 10) {
      alertedProducts.delete(productId);
    }
  });
}

// Set interval to constantly check stock levels every 5 seconds
setInterval(() => {
  checkStockLevels();
  resetAlertedProducts(); // Check if stock levels are replenished
}, 5000);

// Run the stock check once on page load
checkStockLevels();


// Event listener for saving stock updates
productTableBody.addEventListener('click', event => {
  if (event.target.classList.contains('save-btn')) {
    const productId = event.target.dataset.id;
    const stockInput = document.querySelector(`.stock-input[data-id="${productId}"]`);
    const newStock = parseInt(stockInput.value, 10);

    if (!isNaN(newStock) && newStock >= 0) {
      updateStock(productId, newStock);
    } else {
      alert('Stock must be a valid number greater than or equal to 0.');
    }
  }
});

// Event listener for search functionality
searchBar.addEventListener('input', () => {
  renderProducts(searchBar.value.trim());
});

// Set interval to constantly check stock levels every 5 seconds
setInterval(checkStockLevels, 5000);

// Initial render
renderProducts();
