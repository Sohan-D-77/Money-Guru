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
// URLs to the PHP scripts
const accountsURL = 'get_accounts.php';
const transactionsURL = 'get_transactions.php';
const investmentsURL = 'get_investments.php';
const expensesURL = 'get_expenses.php';
const budgetsURL = 'get_budgets.php';

// Fetch data and calculate totals
let totalIncome = 0;
let totalSpendings = 0;
let totalTransactions = 0;
let totalBudget = 0;
let totalInvestments = 0;

async function fetchData(url) {
    const response = await fetch(url);
    return await response.json();
}

async function calculateSummary() {
    const accounts = await fetchData(accountsURL);
    const transactions = await fetchData(transactionsURL);
    const investments = await fetchData(investmentsURL);
    const expenses = await fetchData(expensesURL);
    const budgets = await fetchData(budgetsURL);

    // Calculate total income and balance in all accounts
    accounts.forEach(account => {
        totalIncome += parseFloat(account.income);
    });
    
    // Calculate total transaction amount
    transactions.forEach(transaction => {
        totalTransactions += parseFloat(transaction.amount);
    });
    
    // Calculate total investments
    investments.forEach(investment => {
        totalInvestments += parseFloat(investment.amount);
    });
    
    // Calculate total expenses and check against budget
    let totalExpenses = 0;
    expenses.forEach(expense => {
        totalExpenses += parseFloat(expense.amount);
    });

    budgets.forEach(budget => {
        totalBudget += parseFloat(budget.amount);
    });

    // Display amounts in the Summary Page
    document.getElementById('total-earnings').innerText = `$${totalIncome.toFixed(2)}`;
    document.getElementById('total-spendings').innerText = `$${totalExpenses.toFixed(2)}`;
    document.getElementById('total-transactions').innerText = `$${totalTransactions.toFixed(2)}`;
    document.getElementById('total-investments').innerText = `$${totalInvestments.toFixed(2)}`;
    document.getElementById('total-budgets').innerText = `$${totalBudget.toFixed(2)}`;

    // Show warning if expenses exceed the budget
    if (totalExpenses > totalBudget) {
        document.getElementById('budget-warning').innerText = "Warning: You have exceeded your budget!";
    }
}

// Tax calculation
function calculateTax() {
    const taxPercentage = parseFloat(document.getElementById('tax-percentage').value);
    if (isNaN(taxPercentage) || taxPercentage < 0) {
        alert("Please enter a valid tax percentage.");
        return;
    }
    const taxAmount = (totalIncome * taxPercentage) / 100;
    document.getElementById('tax-amount').innerText = `$${taxAmount.toFixed(2)}`;
}

// Run calculations on page load
document.addEventListener('DOMContentLoaded', calculateSummary);
