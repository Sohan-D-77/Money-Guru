// script.js

document.getElementById("transaction-form").addEventListener("submit", function(event) {
    event.preventDefault();  // Prevent the default form submission

    const formData = new FormData(this);

    // Send form data to the PHP script via POST
    fetch("transactions.php", {
        method: "POST",
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        document.getElementById("transaction-output").innerHTML = data; // Display the result
        this.reset(); // Reset the form after submission
    })
    .catch(error => {
        console.error("Error:", error);
        document.getElementById("transaction-output").innerHTML = "An error occurred while saving the transaction.";
    });
});
