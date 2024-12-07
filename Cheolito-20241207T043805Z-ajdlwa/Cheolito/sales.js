// Helper function to group receipts by a key (date, week, month)
function groupReceipts(receipts, getKey) {
  return receipts.reduce((acc, receipt) => {
    const key = getKey(new Date(receipt.date));
    if (!acc[key]) acc[key] = [];
    acc[key].push(receipt);
    return acc;
  }, {});
}

// Calculate sales summary for a group of receipts
function calculateSummary(receipts) {
  let totalSales = 0;
  let totalQuantity = 0;
  const productBreakdown = {};

  receipts.forEach(receipt => {
    totalSales += parseFloat(receipt.total);
    receipt.products.forEach(product => {
      totalQuantity += product.quantity;
      if (!productBreakdown[product.name]) {
        productBreakdown[product.name] = 0;
      }
      productBreakdown[product.name] += product.quantity;
    });
  });

  return {
    totalSales: totalSales.toFixed(2),
    totalQuantity,
    productBreakdown,
  };
}

// Render sales data to a table
function renderTable(tableId, groupedData, formatKey) {
  const tableBody = document.getElementById(tableId).querySelector('tbody');
  tableBody.innerHTML = ''; // Clear table body

  Object.entries(groupedData).forEach(([key, receipts]) => {
    const { totalSales, totalQuantity, productBreakdown } = calculateSummary(receipts);

    const breakdownText = Object.entries(productBreakdown)
      .map(([name, quantity]) => `${name}: ${quantity}`)
      .join(', ');

    const row = `
      <tr>
        <td>${formatKey(key)}</td>
        <td>$${totalSales}</td>
        <td>${totalQuantity}</td>
        <td>${breakdownText}</td>
      </tr>
    `;
    tableBody.innerHTML += row;
  });
}

// Main function to display sales reports
function displaySalesReports() {
  const receipts = JSON.parse(localStorage.getItem('receiptsss')) || [];

  // Group receipts by day, week, and month
  const dailySales = groupReceipts(receipts, date => date.toISOString().split('T')[0]); // Format as YYYY-MM-DD
  const weeklySales = groupReceipts(receipts, date => {
    const week = Math.ceil((date.getDate() - date.getDay() + 1) / 7);
    return `${date.getFullYear()}-W${week}`;
  });
  const monthlySales = groupReceipts(receipts, date => `${date.getFullYear()}-${date.getMonth() + 1}`);

  // Render tables
  renderTable('daily-sales-table', dailySales, key => key);
  renderTable('weekly-sales-table', weeklySales, key => `Week ${key.split('-W')[1]} (${key.split('-W')[0]})`);
  renderTable('monthly-sales-table', monthlySales, key => `Month ${key.split('-')[1]} (${key.split('-')[0]})`);
}

// Initialize sales reports
displaySalesReports();
