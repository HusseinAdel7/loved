/*
 =========================================
 Luxury Romantic Birthday Website
 Home Page Specific Script
 =========================================
*/

let typedInstance = null;

document.addEventListener("DOMContentLoaded", () => {
 // 1. Initialize AOS (Animate On Scroll)
 AOS.init({
  duration: 1000,
  easing: "ease-in-out",
  once: true,
  mirror: false
 });

 // Read current language
 const activeLang = localStorage.getItem("romantic_language") || "en";

 // 2. Initialize Typed.js with support for EN/AR string swapping
 initTyped(activeLang);

 // Hook translation callback to swap Typed.js strings on language switch
 window.onLanguageChanged = (newLang) => {
  if (typedInstance) {
   typedInstance.destroy();
  }
  initTyped(newLang);
 };

 // 3. Initialize Swiper.js Slider
 const swiperElement = document.querySelector(".romantic-swiper");
 if (swiperElement) {
  new Swiper(".romantic-swiper", {
   loop: true,
   spaceBetween: 30,
   centeredSlides: true,
   effect: "fade",
   fadeEffect: {
    crossFade: true
   },
   autoplay: {
    delay: 6000,
    disableOnInteraction: false
   },
   pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true
   },
   navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev"
   }
  });
 }

 // 4. Custom GSAP Intro Entrance Timeline
 if (typeof gsap !== "undefined") {
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
  
  tl.fromTo(".hero-pre-title", 
   { opacity: 0, y: -30 }, 
   { opacity: 1, y: 0, duration: 1, delay: 0.8 }
  );
  
  tl.fromTo(".hero-title", 
   { opacity: 0, scale: 0.9 }, 
   { opacity: 1, scale: 1, duration: 1.2 }, 
   "-=0.6"
  );
  
  tl.fromTo(".hero-typed-container", 
   { opacity: 0 }, 
   { opacity: 1, duration: 0.8 }, 
   "-=0.4"
  );
  
  tl.fromTo(".hero-btn-group", 
   { opacity: 0, y: 30 }, 
   { opacity: 1, y: 0, duration: 1 }, 
   "-=0.6"
  );

  gsap.to(".orb-1", {
   y: -30,
   x: 20,
   duration: 6,
   repeat: -1,
   yoyo: true,
   ease: "sine.inOut"
  });
  
  gsap.to(".orb-2", {
   y: 30,
   x: -20,
   duration: 7,
   repeat: -1,
   yoyo: true,
   ease: "sine.inOut"
  });
 }
});

function initTyped(lang) {
 const stringsEN = [
  "To the wonderful woman who makes every day brighter...",
  "You are my inspiration, my partner, and my future...",
  "Happy Birthday to my dear fiancée Lolo! ❤"
 ];

 const stringsAR = [
  "لأغلى خطيبة في الدنيا، اللي بتنوّر كل يوم في حياتي...",
  "أنتي سندي، وشريكة حياتي، وكل تفاؤلي باللي جاي...",
  "كل سنة وأنتي طيبة يا خطيبتي لولو! ❤"
 ];

 const typedElement = document.getElementById("typed-birthday-message");
 if (typedElement) {
  typedInstance = new Typed("#typed-birthday-message", {
   strings: lang === "ar" ? stringsAR : stringsEN,
   typeSpeed: 50,
   backSpeed: 30,
   backDelay: 2500,
   loop: true,
   showCursor: true,
   cursorChar: "|"
  });
 }
}
