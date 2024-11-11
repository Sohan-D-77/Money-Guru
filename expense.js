document.getElementById("expense-form").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent default form submission

    const type = document.getElementById("type").value;
    const date = document.getElementById("date").value;
    const amount = document.getElementById("amount").value;
    const description = document.getElementById("description").value;

    // Create FormData object
    const formData = new FormData();
    formData.append("type", type);
    formData.append("date", date);
    formData.append("amount", amount);
    formData.append("description", description);

    // Send data via AJAX
    fetch("expense.php", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log("Server response:", data); // Debugging output

        if (data.success) {
            alert(data.message); // Display success message
            addExpenseToOutput(type, date, amount, description); // Update the display
        } else {
            alert("Error: " + data.message); // Display error message
        }
    })
    .catch(error => {
        console.error("Fetch error:", error); // Debugging output
    });

    // Clear form fields
    document.getElementById("expense-form").reset();
});

// Function to add an expense entry to the output dynamically
function addExpenseToOutput(type, date, amount, description) {
    const expenseOutput = document.getElementById("expense-output");

    const expenseItem = document.createElement("div");
    expenseItem.classList.add("expense-item");
    expenseItem.innerHTML = `
        <p><strong>Type:</strong> ${type}</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Amount:</strong> ${amount}</p>
        <p><strong>Description:</strong> ${description || "N/A"}</p>
        <hr>
    `;

    expenseOutput.appendChild(expenseItem);
}
// script.js

document.getElementById('expense-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    // Collect form data
    const formData = new FormData(this);

    // Send data to expense.php
    fetch('expense.php', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.text())
    .then(data => {
        // Display server response in #expense-output
        document.getElementById('expense-output').innerHTML = data;
    })
    .catch(error => console.error('Error:', error));
});
