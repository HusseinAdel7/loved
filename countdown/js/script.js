/*
 =========================================
 Luxury Romantic Birthday Website
 Birthday Countdown Specific Script
 =========================================
*/

// currentLanguage is declared globally in global.js
currentLanguage = "en";
let noteIndex = 0;
let noteEl = null;

const notesEN = [
 "\"Counting down to the days we celebrate our formal steps together...\"",
 "\"Looking forward to celebrating your birthday with your family...\"",
 "\"Every tick of the clock brings us closer to building our future...\"",
 "\"The stars are in alignment, celebrating your kind and beautiful character...\"",
 "\"To the day that brought my dear fiancée Lolo into my life...\"",
 "\"My best wishes are always with you on this special day...\""
];

const notesAR = [
 "\"نعد الأيام والشهور لنخطو خطواتنا الرسمية المباركة معاً...\"",
 "\"أتطلع للاحتفال بعيد ميلادكِ السعيد مع عائلتكِ الكريمة...\"",
 "\"كل دقة من دقات هذه الساعة تقربنا أكثر من بناء بيتنا المستقبلي...\"",
 "\"النجوم تصطف في الفلك، مترقبة الاحتفال بيوم ميلادكِ السعيد يا لولو...\"",
 "\"إلى اليوم السعيد الذي ولدتِ فيه خطيبتي العزيزة لتنير حياتي...\"",
 "\"دعواتي لكِ بالتوفيق والنجاح الدائم ترافق دقات هذه الساعة...\""
];

document.addEventListener("DOMContentLoaded", () => {
 // 1. Initialize AOS (Animate On Scroll)
 AOS.init({
  duration: 800,
  easing: "ease-in-out",
  once: true
 });

 // Load language settings
 currentLanguage = localStorage.getItem("romantic_language") || "en";

 // 2. High-Performance Canvas Star Field Animation
 initStarsBackground();

 // 3. Digital Ticking Countdown Clock Engine
 initCountdownClock();

 // 4. Auto-Changing Dynamic Love Notes Banner
 initLoveNoteCycler();

 // 5. Interactive "Float My Wish" Board
 initWishBoard();

 // Hook translation callback to swap banner notes on switch
 window.onLanguageChanged = (newLang) => {
  currentLanguage = newLang;
  const pool = newLang === "ar" ? notesAR : notesEN;
  if (noteEl) {
   noteEl.innerText = pool[noteIndex];
  }
 };
});

/* ==========================================
  2. Twinkling Star Field Canvas Engine
  ========================================== */
function initStarsBackground() {
 const canvas = document.getElementById("stars-field-canvas");
 if (!canvas) return;
 const ctx = canvas.getContext("2d");
 let stars = [];
 const starCount = 100;

 function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
 }
 resize();
 window.addEventListener("resize", resize);

 class TwinklingStar {
  constructor() {
   this.reset();
   this.y = Math.random() * canvas.height;
  }

  reset() {
   this.x = Math.random() * canvas.width;
   this.y = canvas.height + 10;
   this.size = Math.random() * 1.8 + 0.5;
   this.speedY = Math.random() * 0.15 + 0.05;
   this.twinkleSpeed = Math.random() * 0.03 + 0.01;
   this.twinkleAngle = Math.random() * Math.PI * 2;
  }

  draw() {
   this.y -= this.speedY;
   this.twinkleAngle += this.twinkleSpeed;
   
   const opacity = 0.2 + Math.abs(Math.sin(this.twinkleAngle)) * 0.8;

   ctx.save();
   ctx.globalAlpha = opacity;
   ctx.fillStyle = "#fcf8f2";
   ctx.shadowBlur = 8;
   ctx.shadowColor = "#fcf8f2";
   ctx.beginPath();
   ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
   ctx.fill();
   ctx.restore();

   if (this.y < -10) {
    this.reset();
   }
  }
 }

 for (let i = 0; i < starCount; i++) {
  stars.push(new TwinklingStar());
 }

 function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  stars.forEach(s => s.draw());
  requestAnimationFrame(animate);
 }
 animate();
}

/* ==========================================
  3. Real-Time Countdown Clock Engine
  ========================================== */
function initCountdownClock() {
 const currentYear = new Date().getFullYear();
 
 // Cross-browser bulletproof integer arguments: year, monthIndex (6 = July), day (13), hours (0), minutes (0), seconds (0)
 // This bypasses string parsing entirely and NEVER returns NaN
 let targetTime = new Date(currentYear, 6, 13, 0, 0, 0).getTime();
 const now = new Date().getTime();
 
 // If birthday has passed this year, set target to next year's date
 if (targetTime < now) {
  targetTime = new Date(currentYear + 1, 6, 13, 0, 0, 0).getTime();
 }

 const daysEl = document.getElementById("clock-days");
 const hoursEl = document.getElementById("clock-hours");
 const minutesEl = document.getElementById("clock-minutes");
 const secondsEl = document.getElementById("clock-seconds");

 if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

 function updateClock() {
  const currentTime = new Date().getTime();
  const difference = targetTime - currentTime;

  // Standard time metrics
  const d = Math.floor(difference / (1000 * 60 * 60 * 24));
  const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const s = Math.floor((difference % (1000 * 60)) / 1000);

  // Render numbers, guaranteeing padded formats
  daysEl.innerText = String(d).padStart(2, '0');
  hoursEl.innerText = String(h).padStart(2, '0');
  minutesEl.innerText = String(m).padStart(2, '0');
  secondsEl.innerText = String(s).padStart(2, '0');

  if (typeof gsap !== "undefined" && s !== parseInt(secondsEl.getAttribute("data-sec") || -1)) {
   secondsEl.setAttribute("data-sec", s);
   gsap.fromTo(".highlight-sec-card", 
    { scale: 0.96 }, 
    { scale: 1, duration: 0.35, ease: "bounce.out" }
   );
  }
 }

 updateClock();
 setInterval(updateClock, 1000);
}

/* ==========================================
  4. Auto-Changing Dynamic Love Notes Banner
  ========================================== */
function initLoveNoteCycler() {
 noteEl = document.getElementById("countdown-dynamic-note");
 if (!noteEl) return;

 const pool = currentLanguage === "ar" ? notesAR : notesEN;
 noteEl.innerText = pool[noteIndex];
 
 setInterval(() => {
  const activePool = currentLanguage === "ar" ? notesAR : notesEN;
  noteIndex = (noteIndex + 1) % activePool.length;
  
  if (typeof gsap !== "undefined") {
   gsap.to(noteEl, {
    opacity: 0,
    y: -10,
    duration: 0.4,
    onComplete: () => {
     noteEl.innerText = activePool[noteIndex];
     gsap.to(noteEl, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out"
     });
    }
   });
  } else {
   noteEl.innerText = activePool[noteIndex];
  }
 }, 6000);
}

/* ==========================================
  5. Interactive Floating Wish Board System
  ========================================== */
function initWishBoard() {
 const textarea = document.getElementById("wish-textarea");
 const button = document.getElementById("btn-float-wish");
 const floatingLayer = document.getElementById("wishes-floating-layer");

 if (!textarea || !button || !floatingLayer) return;

 button.addEventListener("click", () => {
  const text = textarea.value.trim();
  
  if (text === "") {
   if (typeof gsap !== "undefined") {
    gsap.fromTo(".wish-input-wrapper", 
     { x: -10 }, 
     { x: 0, duration: 0.4, ease: "rough", clearProps: "x" }
    );
   }
   
   const errorMsg = currentLanguage === "ar" ? "يرجى كتابة أمنيتكِ أولاً! ❤" : "Please write a wish first! ❤";
   textarea.setAttribute("placeholder", errorMsg);
   return;
  }

  const wishHeart = document.createElement("div");
  wishHeart.classList.add("floating-wish-heart");
  wishHeart.innerText = text;

  const randomLeft = Math.random() * 70 + 10;
  const randomDuration = Math.random() * 4 + 10;
  const wobbleAngle = Math.random() * 360;

  wishHeart.style.left = `${randomLeft}%`;
  wishHeart.style.animationDuration = `${randomDuration}s`;
  
  wishHeart.style.setProperty("--wobble-angle", `${wobbleAngle}deg`);

  floatingLayer.appendChild(wishHeart);

  if (typeof gsap !== "undefined") {
   gsap.fromTo(button, 
    { scale: 0.9 }, 
    { scale: 1, duration: 0.35, ease: "back.out(2)" }
   );
  }

  textarea.value = "";
  
  const placeholderMsg = currentLanguage === "ar" ? "أمنيتي لكِ في يومكِ الاستثنائي والجميل هي..." : "My wish for you on your special day is...";
  textarea.setAttribute("placeholder", placeholderMsg);

  setTimeout(() => {
   wishHeart.remove();
  }, randomDuration * 1000);
 });
}
