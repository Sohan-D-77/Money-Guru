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
