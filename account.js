document.getElementById("account-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form from submitting traditionally

    // Get form data
    const accountName = document.querySelector("input[name='account_name']").value;
    const income = document.querySelector("input[name='income']").value;
    const balance = document.querySelector("input[name='balance']").value;
    const bank = document.querySelector("input[name='bank']").value;

    // Create an AJAX request
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "account.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    // Handle the response
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            document.getElementById("account-output").innerHTML = xhr.responseText;
        }
    };

    // Prepare data for POST
    const params = `account_name=${encodeURIComponent(accountName)}&income=${encodeURIComponent(income)}&balance=${encodeURIComponent(balance)}&bank=${encodeURIComponent(bank)}`;

    // Send the request
    xhr.send(params);
});
