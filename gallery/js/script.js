/*
  =========================================
  Luxury Romantic Birthday Website
  Memories Gallery Specific Script
  =========================================
*/

document.addEventListener("DOMContentLoaded", () => {
  // 1. Initialize AOS (Animate On Scroll)
  AOS.init({
    duration: 800,
    easing: "ease-in-out",
    once: true
  });

  // Bilingual emotional quote maps for each Polaroid memory
  const quotesEN = [
    "That sunset in Paris was beautiful, but it couldn't compete with the glow on your gorgeous face.",
    "The candles were glowing, the music was soft, but the only thing I could look at was you.",
    "Wrapped in a cozy blanket with you, doing absolutely nothing, is my absolute favorite place to be.",
    "The ocean breeze was refreshing, but the sight of you smiling against the tides took my breath away.",
    "Hearing you laugh under the warm acoustic stage lights filled my heart with a quiet, infinite peace.",
    "On that snowy hill, down on one knee, your teary 'Yes' made me the luckiest, happiest soul on Earth.",
    "Walking through the falling golden leaves, I realized I want to walk through every season of life with you.",
    "The fireplace crackled, the night was freezing, but my entire world was warm because you were in my arms."
  ];

  const quotesAR = [
    "غروب الشمس في باريس كان ساحراً، لكنه عجز تماماً عن منافسة توهج وجهكِ الجميل.",
    "الشموع كانت تضيء واللحن كان هادئاً، لكن الشيء الوحيد الذي استطعت النظر إليه هو عينيكِ.",
    "الالتفاف بغطاء دافئ معكِ، وعدم القيام بأي شيء على الإطلاق، هو مكاني المفضل في الكون.",
    "نسمات البحر كانت منعشة، لكن رؤية ابتسامتكِ الجميلة في مواجهة الأمواج سلبت روحي.",
    "سماع ضحكاتكِ العذبة تحت أضواء المسرح الهادئة ملأ قلبي بسلام وسكينة لا تنتهي.",
    "على ذلك التل الثلجي، حين جثوت على ركبتي، دموع موافقتكِ جعلتني أسعد كائن على الأرض.",
    "أسير معكِ بين أوراق الخريف الذهبية المتساقطة، وأدرك يقيناً أنني أريد مرافقتكِ في كل فصول الحياة.",
    "نار المدفأة كانت تشتعل والليل كان قارساً، لكن كوني بأكمله كان دافئاً لأنكِ بين يدي."
  ];

  const polaroids = document.querySelectorAll(".polaroid-card");
  const lightbox = document.getElementById("gallery-lightbox");
  const lightboxClose = lightbox.querySelector(".lightbox-close");
  const lightboxPrev = lightbox.querySelector(".arrow-left");
  const lightboxNext = lightbox.querySelector(".arrow-right");
  
  const lbArt = document.getElementById("lightbox-art");
  const lbIcon = document.getElementById("lightbox-art-icon");
  const lbTitle = document.getElementById("lightbox-title");
  const lbSubtitle = document.getElementById("lightbox-subtitle");
  const lbCaption = document.getElementById("lightbox-caption");

  let activeIndex = 0;
  let visibleCards = [];

  // Populate data attributes dynamically for all polaroid cards
  polaroids.forEach((card, index) => {
    const placeholder = card.querySelector(".polaroid-placeholder");
    
    // Extract gradient class
    let gradientClass = "";
    placeholder.classList.forEach(cls => {
      if (cls.startsWith("gradient-")) gradientClass = cls;
    });
    
    // Extract icon class
    const icon = placeholder.querySelector("i");
    let iconClass = "";
    icon.classList.forEach(cls => {
      if (cls.startsWith("fa-")) iconClass = cls;
    });

    card.setAttribute("data-index", index);
    card.setAttribute("data-gradient", gradientClass);
    card.setAttribute("data-icon", iconClass);

    // Attach click listener to launch Lightbox
    card.addEventListener("click", () => {
      visibleCards = Array.from(document.querySelectorAll(".gallery-item:not(.hidden) .polaroid-card"));
      activeIndex = visibleCards.indexOf(card);
      
      openLightbox(card);
    });
  });

  // 2. Lightbox Open and Populate Logic
  function openLightbox(card) {
    const index = parseInt(card.getAttribute("data-index"));
    const gradient = card.getAttribute("data-gradient");
    const icon = card.getAttribute("data-icon");
    
    // Retrieve localized values dynamically from translated headers
    const title = card.querySelector("h4").innerText;
    const subtitle = card.querySelector("p").innerText;
    
    // Read current language
    const currentLang = localStorage.getItem("romantic_language") || "en";
    const quote = currentLang === "ar" ? quotesAR[index] : quotesEN[index];

    // Populate visual displays
    lbArt.className = "lightbox-visual-display " + gradient;
    lbIcon.className = "fa-solid " + icon + " absolute-icon";
    
    lbTitle.innerText = title;
    lbSubtitle.innerText = subtitle;
    lbCaption.innerText = quote;

    lightbox.classList.add("active");
    document.body.style.overflow = "hidden"; // Disable scroll when active

    if (typeof gsap !== "undefined") {
      gsap.fromTo(".lightbox-visual-display", 
        { opacity: 0, scale: 0.8 }, 
        { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.2)" }
      );
      
      gsap.fromTo(".lightbox-details-panel", 
        { opacity: 0, x: 30 }, 
        { opacity: 1, x: 0, duration: 0.6, delay: 0.1 }
      );
    }
  }

  function closeLightbox() {
    lightbox.classList.remove("active");
    document.body.style.overflow = ""; // Restore scroll
  }

  // 3. Arrow Navigation Controls
  function navigateLightbox(direction) {
    if (visibleCards.length <= 1) return;
    
    if (direction === "next") {
      activeIndex = (activeIndex + 1) % visibleCards.length;
    } else {
      activeIndex = (activeIndex - 1 + visibleCards.length) % visibleCards.length;
    }

    const nextCard = visibleCards[activeIndex];
    openLightbox(nextCard);
  }

  // Hook handlers
  lightboxClose.addEventListener("click", closeLightbox);
  lightboxNext.addEventListener("click", () => navigateLightbox("next"));
  lightboxPrev.addEventListener("click", () => navigateLightbox("prev"));

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("active")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") navigateLightbox("next");
    if (e.key === "ArrowLeft") navigateLightbox("prev");
  });

  // 4. Tab Category Sorting Engine
  const filterButtons = document.querySelectorAll(".btn-filter");
  const galleryItems = document.querySelectorAll(".gallery-item");

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filterVal = btn.getAttribute("data-filter");

      galleryItems.forEach((item) => {
        const itemCategory = item.getAttribute("data-category");
        
        if (filterVal === "all" || itemCategory === filterVal) {
          item.classList.remove("hidden");
          setTimeout(() => {
            item.style.opacity = "1";
            item.style.transform = "scale(1)";
          }, 50);
        } else {
          item.style.opacity = "0";
          item.style.transform = "scale(0.8)";
          setTimeout(() => {
            item.classList.add("hidden");
          }, 400);
        }
      });

      setTimeout(() => {
        AOS.refresh();
      }, 450);
    });
  });
});
