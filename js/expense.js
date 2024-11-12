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
