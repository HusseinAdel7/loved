/*
  =========================================
  Luxury Romantic Birthday Website
  Floating Canvas Heart Particle Engine
  =========================================
*/

class FloatingHearts {
  constructor() {
    this.canvas = document.createElement("canvas");
    this.canvas.id = "hearts-canvas";
    document.body.prepend(this.canvas);
    
    this.ctx = this.canvas.getContext("2d");
    this.particles = [];
    this.particleCount = 25; // Balanced for high performance
    this.colors = [
      "rgba(217, 27, 92, 0.4)",  /* Romantic Pink-Red */
      "rgba(112, 27, 168, 0.35)", /* Velvet Amethyst */
      "rgba(255, 105, 180, 0.4)", /* Soft Rose */
      "rgba(253, 248, 242, 0.25)" /* Pearl White Glow */
    ];

    this.resize();
    window.addEventListener("resize", () => this.resize());
    
    this.init();
    this.animate();
  }

  resize() {
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
  }

  init() {
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push(this.createParticle(true));
    }
  }

  createParticle(randomY = false) {
    return {
      x: Math.random() * this.width,
      y: randomY ? Math.random() * this.height : this.height + 50,
      size: Math.random() * 15 + 8, // size in pixels
      speedY: Math.random() * 0.8 + 0.3, // slow float up
      wobbleSpeed: Math.random() * 0.02 + 0.005,
      wobbleRange: Math.random() * 15 + 5,
      wobbleAngle: Math.random() * Math.PI * 2,
      opacity: Math.random() * 0.6 + 0.2,
      color: this.colors[Math.floor(Math.random() * this.colors.length)],
      growth: Math.random() * 0.01 + 0.002
    };
  }

  drawHeart(ctx, x, y, size, color, opacity) {
    ctx.save();
    ctx.globalAlpha = opacity;
    ctx.fillStyle = color;
    ctx.shadowBlur = 15;
    ctx.shadowColor = color;
    ctx.beginPath();
    
    // Smooth custom math curve for classical heart path
    const topCurveHeight = size * 0.3;
    ctx.moveTo(x, y + topCurveHeight);
    
    // Top-left curve
    ctx.bezierCurveTo(
      x - size / 2, y - size / 2, 
      x - size, y + size / 3, 
      x, y + size
    );
    
    // Top-right curve
    ctx.bezierCurveTo(
      x + size, y + size / 3, 
      x + size / 2, y - size / 2, 
      x, y + topCurveHeight
    );
    
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  animate() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      
      // Update position
      p.y -= p.speedY;
      p.wobbleAngle += p.wobbleSpeed;
      const currentX = p.x + Math.sin(p.wobbleAngle) * p.wobbleRange;
      
      // Draw the floating particle
      this.drawHeart(this.ctx, currentX, p.y, p.size, p.color, p.opacity);

      // Handle off-screen particles (reset bottom)
      if (p.y < -50) {
        this.particles[i] = this.createParticle(false);
      }
    }

    requestAnimationFrame(() => this.animate());
  }
}

// Automatically mount engine to window or start on document ready
window.addEventListener("DOMContentLoaded", () => {
  window.floatingHeartsEngine = new FloatingHearts();
});
