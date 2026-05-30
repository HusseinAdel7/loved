/*
  =========================================
  Luxury Romantic Birthday Website
  Reasons I Love You Specific Script
  =========================================
*/

document.addEventListener("DOMContentLoaded", () => {
  // 1. Initialize AOS (Animate On Scroll)
  AOS.init({
    duration: 800,
    easing: "ease-in-out",
    once: true
  });

  // 2. Interactive Card Flips and Pulse Centerpiece Acceleration
  const cards = document.querySelectorAll(".flip-card-container");
  const heartCenterpiece = document.getElementById("central-pulsing-heart");

  cards.forEach((card) => {
    card.addEventListener("click", (e) => {
      // If the clicked element is the quest key or inside it, do NOT flip the card
      if (e.target.closest(".glowing-quest-key")) {
        return;
      }

      // Toggle flipped state
      card.classList.toggle("flipped");

      // Check how many cards are currently flipped
      const flippedCount = document.querySelectorAll(".flip-card-container.flipped").length;

      // Animate center heart centerpiece speed based on flipped states
      if (heartCenterpiece) {
        if (flippedCount > 0) {
          heartCenterpiece.classList.add("excited");
        } else {
          heartCenterpiece.classList.remove("excited");
        }
      }

      // Add a clean click feedback pop using GSAP if available
      if (typeof gsap !== "undefined") {
        gsap.fromTo(card, 
          { scale: 0.98 }, 
          { scale: 1, duration: 0.4, ease: "back.out(1.5)" }
        );
      }
    });
  });

  // 3. Central Heart Centerpiece Click Easter Egg
  if (heartCenterpiece) {
    heartCenterpiece.addEventListener("click", () => {
      // Temporarily trigger rapid heart pulsing + massive glow
      heartCenterpiece.classList.add("excited");
      
      if (typeof gsap !== "undefined") {
        // Pop all cards to flip open or closed as a grand visual wave
        const tl = gsap.timeline();
        
        cards.forEach((card, i) => {
          tl.to(card, {
            scale: 1.05,
            duration: 0.15,
            yoyo: true,
            repeat: 1
          }, i * 0.08);
        });
      }

      // Cool off back to normal state after 2 seconds
      setTimeout(() => {
        const flippedCount = document.querySelectorAll(".flip-card-container.flipped").length;
        if (flippedCount === 0) {
          heartCenterpiece.classList.remove("excited");
        }
      }, 2000);
    });
  }
});
