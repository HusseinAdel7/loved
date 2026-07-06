/*
 =========================================
 Luxury Romantic Birthday Website
 Love Story Page Specific Script
 =========================================
*/

document.addEventListener("DOMContentLoaded", () => {
 // 1. Initialize AOS (Animate On Scroll)
 AOS.init({
  duration: 1000,
  easing: "ease-in-out",
  once: true,
  mirror: false
 });

 // 2. Custom GSAP Timeline grow animation
 if (typeof gsap !== "undefined") {
  // Grow the timeline glowing line from 0% height to 100% height when page loads
  gsap.fromTo(".timeline-glowing-line", 
   { height: "0%" }, 
   { height: "100%", duration: 2.2, ease: "power2.out", delay: 0.6 }
  );

  // Fade and scale timeline hero contents in sequence
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
  
  tl.fromTo(".timeline-main-title", 
   { opacity: 0, y: -40 }, 
   { opacity: 1, y: 0, duration: 1, delay: 0.8 }
  );
  
  tl.fromTo(".timeline-lead-subtitle", 
   { opacity: 0 }, 
   { opacity: 1, duration: 1 }, 
   "-=0.5"
  );
  
  tl.fromTo(".timeline-hero-divider", 
   { opacity: 0, scale: 0.5 }, 
   { opacity: 1, scale: 1, duration: 0.8 }, 
   "-=0.6"
  );
 }
});
