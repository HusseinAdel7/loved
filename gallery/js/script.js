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
   "The beautiful moment when our eyes first met—a simple talk that opened a lifetime of blessings.",
   "Selecting the precious engagement gold together, preparing for our life-long journey.",
   "Our happy engagement day! Declaring our commitment before God and our loved ones.",
   "Celebrating my birthday together. Your presence made it the happiest day of my year.",
   "Celebrating the wedding day. A wonderful night filled with joy, family warmth, and sweet memories.",
   "Celebrating the Katb Ketab. A blessed marriage contract signing filled with prayers and family happiness.",
   "Celebrating Eid together. A beautiful holiday filled with happiness, blessings, and warm family moments.",
   "A candid snapshot capturing your grace, kindness, and gentle nature.",
   "A beautiful day we cherish deeply, a memory engraved in our hearts.",
   "Your warm glance that gives me absolute reassurance and comfort.",
   "A peaceful, beautiful day spent together, looking forward to our bright future.",
   "Sharing loud laughs and inside jokes, realizing how aligned we truly are.",
   "A day filled with happiness and absolute joy, making every step beautiful.",
   "Our sincere promise to walk hand in hand forever and build our family.",
   "A cozy, quiet moment of reflection, thanking God for bringing you into my life."
  ];

  const quotesAR = [
   "اللحظة الجميلة اللي عيوننا اتقابلت فيها أول مرة.. كلام بسيط فتح باب لعمر من الفرحة والبركة.",
   "واحنا بنختار شبكة خطوبتنا سوا، خطوة مباركة لرحلة عمرنا الجاية سوا.",
   "يوم خطوبتنا السعيدة! إعلان ارتباطنا الرسمي قدام ربنا وحبايبنا كلهم.",
   "احتفالنا بعيد ميلادي سوا.. وجودك جنبي خلاه أحلى يوم في سنتي كلها.",
   "يوم الفرح.. ليلة جميلة قضيناها سوا كلها بهجة وفرحة ولمة عيلة مميزة مش هننساها دايماً.",
   "يوم كتب الكتاب.. لحظات مباركة وسعيدة فرحنا فيها من قلبنا وشاركنا العيلة أجمل دعوات التوفيق والخير.",
   "يوم العيد.. فرحة ولمة جميلة في أيام مباركة، ربنا يديم وجودك وسعادتنا سوا بالخير والبركة.",
   "لقطة عفوية بتسجل رقتك وطيبتك وروحك الجميلة الهادية.",
   "يوم حلو من أيامنا بنعتز بيه أوي، وذكرى محفورة في قلوبنا دايماً.",
   "نظرتك الدافية والمليانة حنية اللي بتطمن قلبي وبتخليني مبسوط دايماً.",
   "يوم كله هدوء وراحة بال قضيناه سوا، وبنتطلع لمستقبلنا المشرق مع بعض.",
   "ضحكاتنا المشتركة من قلبنا، وتأكدنا من انسجامنا وتفاهمنا المريح.",
   "يوم مليان سعادة وبهجة من قلبنا، بيخلي كل خطوة جاية أجمل بكتير.",
   "وعدنا الصادق لبعض إننا نفضل إيد في إيد للأبد ونبني بيتنا السعيد.",
   "لحظة دافية وهادية بنشكر فيها ربنا على نعمة وجودك في حياتي يا لولو."
  ];

  const polaroids = document.querySelectorAll(".polaroid-card");
  const lightbox = document.getElementById("gallery-lightbox");
  const lightboxClose = lightbox.querySelector(".lightbox-close");
  const lightboxPrev = lightbox.querySelector(".arrow-left");
  const lightboxNext = lightbox.querySelector(".arrow-right");
  
  const lbArt = document.getElementById("lightbox-art");
  const lbTitle = document.getElementById("lightbox-title");
  const lbSubtitle = document.getElementById("lightbox-subtitle");
  const lbCaption = document.getElementById("lightbox-caption");

  let activeIndex = 0;
  let visibleCards = [];

  // Populate data attributes dynamically for all polaroid cards
  polaroids.forEach((card, index) => {
   card.setAttribute("data-index", index);

   // Attach click listener to launch Lightbox
   card.addEventListener("click", (e) => {
    // If the clicked element is the quest key or inside it, do NOT open the Lightbox
    if (e.target.closest(".glowing-quest-key")) {
     return;
    }

    visibleCards = Array.from(document.querySelectorAll(".gallery-item:not(.hidden) .polaroid-card"));
    activeIndex = visibleCards.indexOf(card);
    
    openLightbox(card);
   });
  });

  // 2. Lightbox Open and Populate Logic
  function openLightbox(card) {
   const index = parseInt(card.getAttribute("data-index"));
   
   // Retrieve localized values dynamically from translated headers
   const title = card.querySelector("h4").innerText;
   const subtitle = card.querySelector("p").innerText;
   const img = card.querySelector(".polaroid-img");
   const lbImg = document.getElementById("lightbox-img");
   if (img && lbImg) {
    lbImg.src = img.src;
   }
   // Read current language
   const currentLang = localStorage.getItem("romantic_language") || "en";
   const quote = currentLang === "ar" ? quotesAR[index] : quotesEN[index];
   
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
