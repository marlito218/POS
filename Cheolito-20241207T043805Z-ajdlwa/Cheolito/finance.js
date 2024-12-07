// Load receipts from localStorage
const receipts = JSON.parse(localStorage.getItem('receiptsss')) || [];

// Function to calculate finance data
function calculateFinanceData(receipts) {
  let totalRevenue = 0;
  let totalTaxCollected = 0;
  let totalNetSales = 0;

  receipts.forEach(receipt => {
    totalRevenue += parseFloat(receipt.total); // Total includes tax
    totalTaxCollected += parseFloat(receipt.tax);
    totalNetSales += parseFloat(receipt.subtotal); // Subtotal is without tax
  });

  return {
    revenue: totalRevenue.toFixed(2),
    taxCollected: totalTaxCollected.toFixed(2),
    netSales: totalNetSales.toFixed(2),
  };
}

// Display finance data on the page
function displayFinanceData() {
  const financeData = calculateFinanceData(receipts);

  document.getElementById('revenue').textContent = `$${financeData.revenue}`;
  document.getElementById('tax-collected').textContent = `$${financeData.taxCollected}`;
  document.getElementById('net-sales').textContent = `$${financeData.netSales}`;
}

// Initial render
displayFinanceData();
