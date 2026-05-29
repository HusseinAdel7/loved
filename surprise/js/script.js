/*
  =========================================
  Luxury Romantic Birthday Website
  Final Surprise Page Specific Script
  =========================================
*/

document.addEventListener("DOMContentLoaded", () => {
  // 1. Initialize AOS (Animate On Scroll)
  AOS.init({
    duration: 800,
    easing: "ease-in-out",
    once: true
  });

  // 2. Lock Overlay & Quest Keys Checker
  const collectedStr = localStorage.getItem("heart_keys_collected") || "";
  const collected = collectedStr ? collectedStr.split(",") : [];
  const lockOverlay = document.getElementById("quest-lock-overlay");
  const grandEnvelope = document.getElementById("grand-envelope");

  if (collected.length < 3) {
    // She hasn't collected all keys. Show lock screen overlay
    if (lockOverlay) {
      lockOverlay.style.display = "flex";
      
      // Translate dynamic URL paths in lock screen button based on depth
      const goBtn = lockOverlay.querySelector("a");
      if (goBtn) {
        // Find which key is missing to direct her to that specific page
        if (!collected.includes("story")) {
          goBtn.setAttribute("href", "../love-story/love-story.html");
        } else if (!collected.includes("gallery")) {
          goBtn.setAttribute("href", "../gallery/gallery.html");
        } else if (!collected.includes("reasons")) {
          goBtn.setAttribute("href", "../reasons/reasons.html");
        }
      }
    }
    if (grandEnvelope) {
      grandEnvelope.style.filter = "blur(8px) grayscale(0.5)";
      grandEnvelope.style.pointerEvents = "none";
    }
    return; // Stop execution of fireworks/effects
  } else {
    // All 3 keys collected! Bypass lock screen
    if (lockOverlay) {
      lockOverlay.style.display = "none";
    }
    if (grandEnvelope) {
      grandEnvelope.style.filter = "none";
      grandEnvelope.style.pointerEvents = "auto";
    }
  }

  // 3. Setup Firework & Confetti Canvas Physics
  const canvas = document.getElementById("fireworks-canvas");
  const ctx = canvas.getContext("2d");
  let fireworks = [];
  let particles = [];
  let confetti = [];
  let isEffectsRunning = false;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  class Firework {
    constructor(startX, startY, targetX, targetY) {
      this.x = startX;
      this.y = startY;
      this.targetX = targetX;
      this.targetY = targetY;
      this.speed = 8;
      this.angle = Math.atan2(targetY - startY, targetX - startX);
      this.distanceToTarget = Math.sqrt((startX - targetX)**2 + (startY - targetY)**2);
      this.distanceTraveled = 0;
      this.hue = Math.random() * 80 + 320;
    }
    update() {
      const vx = Math.cos(this.angle) * this.speed;
      const vy = Math.sin(this.angle) * this.speed;
      this.x += vx;
      this.y += vy;
      this.distanceTraveled += Math.sqrt(vx**2 + vy**2);

      if (this.distanceTraveled >= this.distanceToTarget) {
        explode(this.x, this.y, this.hue);
        return false;
      }
      return true;
    }
    draw() {
      ctx.save();
      ctx.fillStyle = `hsl(${this.hue}, 100%, 70%)`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  class FireworkParticle {
    constructor(x, y, hue) {
      this.x = x;
      this.y = y;
      this.hue = hue;
      this.angle = Math.random() * Math.PI * 2;
      this.speed = Math.random() * 6 + 2;
      this.gravity = 0.08;
      this.friction = 0.96;
      this.alpha = 1;
      this.decay = Math.random() * 0.015 + 0.008;
    }
    update() {
      this.speed *= this.friction;
      this.x += Math.cos(this.angle) * this.speed;
      this.y += Math.sin(this.angle) * this.speed + this.gravity;
      this.alpha -= this.decay;
      return this.alpha > 0;
    }
    draw() {
      ctx.save();
      ctx.globalAlpha = this.alpha;
      ctx.fillStyle = `hsl(${this.hue}, 100%, 60%)`;
      ctx.shadowBlur = 10;
      ctx.shadowColor = `hsl(${this.hue}, 100%, 50%)`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, Math.random() * 3 + 1, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  class Confetti {
    constructor() {
      this.reset();
      this.y = Math.random() * canvas.height;
    }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = -20;
      this.size = Math.random() * 8 + 4;
      this.speedY = Math.random() * 2 + 1.5;
      this.wobble = Math.random() * Math.PI;
      this.wobbleSpeed = Math.random() * 0.04 + 0.01;
      this.color = `hsl(${Math.random() * 360}, 100%, 75%)`;
    }
    update() {
      this.y += this.speedY;
      this.wobble += this.wobbleSpeed;
      this.x += Math.sin(this.wobble) * 0.5;

      return this.y < canvas.height + 20;
    }
    draw() {
      ctx.save();
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.fillRect(this.x, this.y, this.size, this.size);
      ctx.restore();
    }
  }

  function explode(x, y, hue) {
    for (let i = 0; i < 40; i++) {
      particles.push(new FireworkParticle(x, y, hue));
    }
  }

  function runEffectsLoop() {
    if (!isEffectsRunning) return;

    ctx.fillStyle = "rgba(5, 1, 8, 0.15)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (Math.random() < 0.035) {
      const startX = Math.random() < 0.5 ? 50 : canvas.width - 50;
      const startY = canvas.height;
      const targetX = Math.random() * (canvas.width - 200) + 100;
      const targetY = Math.random() * (canvas.height / 2);
      fireworks.push(new Firework(startX, startY, targetX, targetY));
    }

    fireworks = fireworks.filter(f => {
      f.draw();
      return f.update();
    });

    particles = particles.filter(p => {
      p.draw();
      return p.update();
    });

    if (confetti.length < 50 && Math.random() < 0.2) {
      confetti.push(new Confetti());
    }
    confetti = confetti.filter(c => {
      c.draw();
      return c.update();
    });

    requestAnimationFrame(runEffectsLoop);
  }

  // 4. Immersive Envelope & Autoscroll Mechanics
  const sealBtn = document.getElementById("trigger-seal");
  const closeScrollBtn = document.getElementById("btn-close-scroll");
  
  const headerBlock = document.getElementById("surprise-header-block");
  const ctaBlock = document.getElementById("surprise-footer-cta");
  const footerBlock = document.getElementById("surprise-shared-footer");
  const neonDeclaration = document.getElementById("neon-declaration-block");
  const scrollerBox = document.querySelector(".sheet-scroller-box");
  
  let autoScrollActive = false;
  let scrollAnimationFrame = null;

  function triggerAutoScroll() {
    if (!autoScrollActive) return;

    scrollerBox.scrollTop += 0.25;

    if (scrollerBox.scrollTop + scrollerBox.clientHeight >= scrollerBox.scrollHeight - 1) {
      autoScrollActive = false;
      return;
    }

    scrollAnimationFrame = requestAnimationFrame(triggerAutoScroll);
  }

  grandEnvelope.addEventListener("click", (e) => {
    if (grandEnvelope.classList.contains("open")) return;
    
    grandEnvelope.classList.add("open");
    
    headerBlock.classList.add("fade-hidden");
    ctaBlock.classList.add("fade-hidden");
    footerBlock.classList.add("fade-hidden");

    setTimeout(() => {
      neonDeclaration.classList.add("visible");
    }, 1200);

    isEffectsRunning = true;
    runEffectsLoop();

    setTimeout(() => {
      autoScrollActive = true;
      triggerAutoScroll();
    }, 2800);
  });

  closeScrollBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    
    grandEnvelope.classList.remove("open");

    headerBlock.classList.remove("fade-hidden");
    ctaBlock.classList.remove("fade-hidden");
    footerBlock.classList.remove("fade-hidden");
    neonDeclaration.classList.remove("visible");

    isEffectsRunning = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    fireworks = [];
    particles = [];
    confetti = [];

    autoScrollActive = false;
    if (scrollAnimationFrame) cancelAnimationFrame(scrollAnimationFrame);
    scrollerBox.scrollTop = 0;
  });

  const pauseAutoScroll = () => {
    if (autoScrollActive) {
      autoScrollActive = false;
      if (scrollAnimationFrame) cancelAnimationFrame(scrollAnimationFrame);
    }
  };

  scrollerBox.addEventListener("wheel", pauseAutoScroll);
  scrollerBox.addEventListener("touchstart", pauseAutoScroll);
  scrollerBox.addEventListener("mousedown", pauseAutoScroll);
});
