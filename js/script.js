class Particle {
    constructor(canvas) {
        this.canvas = canvas;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        
        // Generate random gold colors
        const goldHue = 45; // Gold hue in HSL
        const saturation = Math.random() * 20 + 80; // 80-100%
        const lightness = Math.random() * 30 + 50; // 50-80%
        this.color = `hsla(${goldHue}, ${saturation}%, ${lightness}%, ${Math.random() * 0.5 + 0.5})`;
    }
  
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
  
        if (this.x > this.canvas.width) this.x = 0;
        if (this.x < 0) this.x = this.canvas.width;
        if (this.y > this.canvas.height) this.y = 0;
        if (this.y < 0) this.y = this.canvas.height;
    }
  
    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
  }
  
  class ParticleSystem {
    constructor() {
        this.canvas = document.getElementById('particle-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.particleCount = 150;
        
        this.init();
        window.addEventListener('resize', () => this.resize());
    }
  
    init() {
        this.resize();
        this.createParticles();
        this.animate();
    }
  
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
  
    createParticles() {
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push(new Particle(this.canvas));
        }
    }
  
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            particle.update();
            particle.draw(this.ctx);
            
            // Draw lines between nearby particles
            this.particles.forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    this.ctx.beginPath();
                    // Golden connecting lines
                    this.ctx.strokeStyle = `hsla(45, 80%, 50%, ${1 * (1 - distance/100)})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(otherParticle.x, otherParticle.y);
                    this.ctx.stroke();
                }
            });
        });
        
        requestAnimationFrame(() => this.animate());
    }
  }
  
  // Initialize the particle system when the page loads
  window.addEventListener('load', () => {
    new ParticleSystem();
  });

let transactions = [];

document.getElementById('transaction-form').addEventListener('submit', (event) => {
    event.preventDefault();

    const type = document.getElementById('type').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const description = document.getElementById('description').value;

    if (amount > 0 && description) {
        transactions.push({ type, amount, description });
        updateUI();
        event.target.reset();
    }
});

function updateUI() {
    const income = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
    const expense = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
    const balance = income - expense;

    document.getElementById('total-income').innerText = `$${income.toFixed(2)}`;
    document.getElementById('total-expense').innerText = `$${expense.toFixed(2)}`;
    document.getElementById('balance').innerText = `$${balance.toFixed(2)}`;

    const transactionList = document.getElementById('transaction-list');
    transactionList.innerHTML = '';
    transactions.forEach(t => {
        const listItem = document.createElement('li');
        listItem.textContent = `${t.description} - ${t.type === 'income' ? '+' : '-'}$${t.amount.toFixed(2)}`;
        listItem.classList.add(t.type);
        transactionList.appendChild(listItem);
    });
}// Login form submission
document.getElementById('login-form')?.addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Retrieve the entered username and password
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Mock authentication (replace with backend API call)
    if (username && password) {
        alert("Logged in successfully!");
        window.location.href = "index.html"; // Redirect to main dashboard
    } else {
        alert("Please enter a valid username and password.");
    }
});

// Signup form submission
document.getElementById('signup-form')?.addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Collect form data
    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Simple form validation
    if (firstName && lastName && phone && email && username && password) {
        alert("Account created successfully! You can now log in.");
        window.location.href = "login.html"; // Redirect to login page
    } else {
        alert("Please fill in all fields.");
    }
});
// Simulated authentication status
let isAuthenticated = false;

// Redirect to the dashboard after login
document.getElementById('login-form')?.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username && password) {
        alert("Login successful!");
        isAuthenticated = true;
        window.location.href = "index.html"; // Redirect to main dashboard
    } else {
        alert("Please enter a valid username and password.");
    }
});

// Redirect to login after signup and show success message
document.getElementById('signup-form')?.addEventListener('submit', function(event) {
    event.preventDefault();

    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (firstName && lastName && phone && email && username && password) {
        alert("Account created successfully! Please log in.");
        window.location.href = "login.html"; // Redirect to login page
    } else {
        alert("Please fill in all fields.");
    }
});

// Logout function on dashboard
function logout() {
    isAuthenticated = false;
    alert("You have been logged out.");
    window.location.href = "login.html"; // Redirect to login page
}
// Redirect to the dashboard after login
document.getElementById('login-form')?.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username && password) {
        alert("Login successful!");
        window.location.href = "index.html"; // Redirect to main dashboard
    } else {
        alert("Please enter a valid username and password.");
    }
});

// Redirect to login after signup and show success message
document.getElementById('signup-form')?.addEventListener('submit', function(event) {
    event.preventDefault();

    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (firstName && lastName && phone && email && username && password) {
        alert("Account created successfully! Please log in.");
        window.location.href = "login.html"; // Redirect to login page
    } else {
        alert("Please fill in all fields.");
    }
});

// Logout function on dashboard
function logout() {
    alert("You have been logged out.");
    window.location.href = "login.html"; // Redirect to login page
}
// Sample data structures for transactions and budgets
let transaction = [];
let budgets = [];

// Function to handle adding transactions
document.getElementById('transaction-form')?.addEventListener('submit', function(event) {
    event.preventDefault();

    const transactionType = document.getElementById('transaction-type').value;
    const amount = document.getElementById('amount').value;
    const category = document.getElementById('category').value;
    const description = document.getElementById('description').value;

    const transaction = {
        date: new Date().toLocaleDateString(),
        type: transactionType,
        amount: parseFloat(amount),
        category: category,
        description: description,
    };

    transactions.push(transaction);
    displayTransactions();
    this.reset(); // Clear the form
});

// Function to display transactions
function displayTransactions() {
    const tbody = document.getElementById('transaction-history').querySelector('tbody');
    tbody.innerHTML = '';
    transactions.forEach((trans, index) => {
        const row = `<tr>
            <td>${trans.date}</td>
            <td>${trans.type}</td>
            <td>${trans.amount}</td>
            <td>${trans.category}</td>
            <td>${trans.description}</td>
            <td><button onclick="deleteTransaction(${index})">Delete</button></td>
        </tr>`;
        tbody.innerHTML += row;
    });
}

// Function to delete a transaction
function deleteTransaction(index) {
    transactions.splice(index, 1);
    displayTransactions();
}

// Function to handle budget creation
document.getElementById('budget-form')?.addEventListener('submit', function(event) {
    event.preventDefault();

    const category = document.getElementById('budget-category').value;
    const amount = document.getElementById('budget-amount').value;

    const budget = {
        category: category,
        budgetAmount: parseFloat(amount),
        spent: 0,
    };

    budgets.push(budget);
    displayBudgets();
    this.reset(); // Clear the form
});

// Function to display budgets
function displayBudgets() {
    const tbody = document.getElementById('budget-list').querySelector('tbody');
    tbody.innerHTML = '';
    budgets.forEach((bud) => {
        const remaining = bud.budgetAmount - bud.spent;
        const row = `<tr>
            <td>${bud.category}</td>
            <td>${bud.budgetAmount}</td>
            <td>${bud.spent}</td>
            <td>${remaining}</td>
            <td><button onclick="deleteBudget('${bud.category}')">Delete</button></td>
        </tr>`;
        tbody.innerHTML += row;
    });
}

// Function to delete a budget
function deleteBudget(category) {
    budgets = budgets.filter(bud => bud.category !== category);
    displayBudgets();
}

// Function to generate reports (placeholder functionality)
function generateReport() {
    const output = document.getElementById('report-output');
    output.innerHTML = '<h3>Expense Report</h3><p>Here would be your expense report...</p>';
}

function generateIncomeReport() {
    const output = document.getElementById('report-output');
    output.innerHTML = '<h3>Income Report</h3><p>Here would be your income report...</p>';
}

//