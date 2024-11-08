document.getElementById("budget-form").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent form from submitting normally

    const category = document.getElementById("budget-category").value;
    const amount = document.getElementById("budget-amount").value;

    // Create a FormData object to send data
    const formData = new FormData();
    formData.append("category", category);
    formData.append("amount", amount);

    // Send data via AJAX
    fetch("budget.php", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert(data.message); // Display success message
            addBudgetToTable(category, amount); // Update the table
        } else {
            alert(data.message); // Display error message
        }
    })
    .catch(error => console.error("Error:", error));

    // Clear the form fields
    document.getElementById("budget-form").reset();
});

// Function to add a budget entry to the table dynamically
function addBudgetToTable(category, amount) {
    const budgetList = document.getElementById("budget-list").querySelector("tbody");
    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${category}</td>
        <td>${amount}</td>
        <td>0.00</td>
        <td>${amount}</td>
        <td><button onclick="deleteBudget(this)">Delete</button></td>
    `;

    budgetList.appendChild(row);
}

// Function to handle budget deletion
function deleteBudget(button) {
    const row = button.parentNode.parentNode;
    row.remove(); // Remove the row from the table
}
