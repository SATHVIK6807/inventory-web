// Array to hold inventory items
let inventory = [];

// DOM elements
const itemForm = document.getElementById("item-form");
const itemsTable = document.getElementById("items-table");
const totalItems = document.getElementById("total-items");
const lowStock = document.getElementById("low-stock");

// Function to update the dashboard
function updateDashboard() {
  const total = inventory.reduce((sum, item) => sum + item.quantity, 0);
  const lowStockItems = inventory.filter(item => item.quantity < 5).length;

  totalItems.textContent = total;
  lowStock.textContent = lowStockItems;
}

// Function to render inventory items in the table
function renderInventory() {
  itemsTable.innerHTML = "";
  inventory.forEach((item, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.quantity}</td>
      <td>$${item.price}</td>
      <td>
        <button onclick="editItem(${index})">Edit</button>
        <button onclick="deleteItem(${index})">Delete</button>
      </td>
    `;

    itemsTable.appendChild(row);
  });
  updateDashboard();
}

// Add item function
itemForm.addEventListener("submit", function(event) {
  event.preventDefault();

  const productName = document.getElementById("product-name").value;
  const productQuantity = parseInt(document.getElementById("product-quantity").value);
  const productPrice = parseFloat(document.getElementById("product-price").value);

  const newItem = {
    name: productName,
    quantity: productQuantity,
    price: productPrice
  };

  inventory.push(newItem);
  renderInventory();

  // Reset form
  itemForm.reset();
});

// Edit item function
function editItem(index) {
  const item = inventory[index];
  const newQuantity = prompt("Enter new quantity:", item.quantity);

  if (newQuantity !== null && !isNaN(newQuantity)) {
    inventory[index].quantity = parseInt(newQuantity);
    renderInventory();
  }
}

// Delete item function
function deleteItem(index) {
  inventory.splice(index, 1);
  renderInventory();
}
