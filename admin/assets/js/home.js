const link = new URLSearchParams(window.location.search).get('page');
if (link === null) {
    // Example list containing revenue data and labels
const revenueData = [1200, 1900, 3000, 5000, 2300, 4000, 3500, 4500, 6000, 7000, 8000, 9000]; // Example data for each month
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const ctx = document.getElementById('revenueChart').getContext('2d');
const revenueChart = new Chart(ctx, {
    type: 'bar', // You can change this to 'line', 'pie', etc.
    data: {
        labels: months, // Use the list for labels
        datasets: [{
            label: 'Revenue (in USD)',
            data: revenueData, // Use the list for data
            backgroundColor: [
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 99, 132, 0.2)'
            ],
            borderColor: [
                'rgba(75, 192, 192, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(255, 99, 132, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

const topCustomers = [
    { name: 'John Doe', consumption: 1200 },
    { name: 'Jane Smith', consumption: 950 },
    { name: 'Alice Johnson', consumption: 870 },
    { name: 'Bob Brown', consumption: 780 },
    { name: 'Charlie White', consumption: 720 },
];

const topCustomersList = document.getElementById('topCustomersList');
topCustomers.forEach(customer => {
    const listItem = document.createElement('li');
    listItem.textContent = `${customer.name} - ${customer.consumption} units`;
    topCustomersList.appendChild(listItem);
});

const topProducts = [
    { name: 'Product A', sales: 500 },
    { name: 'Product B', sales: 300 },
    { name: 'Product C', sales: 250 },
    { name: 'Product D', sales: 200 },
    { name: 'Product E', sales: 150 },
];

const topProductsList = document.getElementById('topProductsList');
topProducts.forEach(product => {
    const listItem = document.createElement('li');
    listItem.textContent = `${product.name} - ${product.sales} units sold`;
    topProductsList.appendChild(listItem);
});
}