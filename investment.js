// investment.js

document.getElementById("investment-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const formData = new FormData(this);

    fetch("investment.php", {
        method: "POST",
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        document.getElementById("investment-output").innerHTML = data;
        this.reset();
    })
    .catch(error => {
        console.error("Error:", error);
        document.getElementById("investment-output").innerHTML = "An error occurred while saving the investment.";
    });
});



// investment.js

document.getElementById("investment-form").addEventListener("submit", function(event) {
    event.preventDefault();  // Prevent form from submitting normally

    const formData = new FormData(this);

    // Send form data to PHP script via POST
    fetch("investment.php", {
        method: "POST",
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        document.getElementById("investment-output").innerHTML = data; // Display response
        this.reset(); // Reset form fields
    })
    .catch(error => {
        console.error("Error:", error);
        document.getElementById("investment-output").innerHTML = "An error occurred while saving the investment.";
    });
});
