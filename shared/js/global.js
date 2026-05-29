/*
  =========================================
  Luxury Romantic Birthday Website
  Shared Global JavaScript - Core Logic
  =========================================
*/

document.addEventListener("DOMContentLoaded", () => {
  // 1. Initialize Translation System (AR / EN)
  initTranslationEngine();

  // 2. Initialize Interactive Heart Key Quest Tracker
  initHeartQuestEngine();

  // 3. Initialize Custom Interactive Cursor Glow
  initCursorGlow();

  // 4. Initialize Smooth Page Loader
  initPageLoader();

  // 5. Initialize Scroll Progress & Sticky Navbar Dynamics
  initScrollDynamics();

  // 6. Initialize Multi-Page Audio Engine
  initAudioEngine();

  // 7. Initialize Responsive Mobile Navbar Toggle
  initMobileNavbar();
});

/* ==========================================
   1. Bilingual Translation Engine (AR / EN)
   ========================================== */
let currentLanguage = "en";

function initTranslationEngine() {
  // Load saved preference or default to English
  currentLanguage = localStorage.getItem("romantic_language") || "en";
  applyLanguage(currentLanguage);

  // Bind clicks on any translation buttons
  document.addEventListener("click", (e) => {
    const langBtn = e.target.closest(".btn-lang-toggle");
    if (langBtn) {
      const nextLang = currentLanguage === "en" ? "ar" : "en";
      currentLanguage = nextLang;
      localStorage.setItem("romantic_language", nextLang);
      applyLanguage(nextLang);
      
      // Fire refresh triggers
      if (window.onLanguageChanged) {
        window.onLanguageChanged(nextLang);
      }
    }
  });
}

function applyLanguage(lang) {
  if (typeof window.romanticTranslations === "undefined") return;
  const dict = window.romanticTranslations[lang];
  if (!dict) return;

  // A. Set document attributes
  document.documentElement.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
  document.documentElement.setAttribute("lang", lang);

  // B. Body classes for font swapping
  if (lang === "ar") {
    document.body.classList.add("lang-ar");
  } else {
    document.body.classList.remove("lang-ar");
  }

  // C. Scan and translate data-translate elements
  const elements = document.querySelectorAll("[data-translate]");
  elements.forEach((el) => {
    const key = el.getAttribute("data-translate");
    if (dict[key]) {
      // If it's an input or textarea, translate the placeholder
      if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
        el.setAttribute("placeholder", dict[key]);
      } else {
        el.innerHTML = dict[key];
      }
    }
  });

  // D. Update navbar key tracker text
  updateNavbarKeysDisplay(lang);
}

/* ==========================================
   2. Interactive Heart Key Quest Engine
   ========================================== */
function initHeartQuestEngine() {
  // Check localStorage for collected keys (stored as comma-separated string)
  let collected = getCollectedKeys();
  
  // Render sparkle canvas container
  const canvas = document.createElement("canvas");
  canvas.id = "sparkle-quest-canvas";
  document.body.appendChild(canvas);

  // Detect key clicks dynamically
  document.addEventListener("click", (e) => {
    const keyBtn = e.target.closest(".glowing-quest-key");
    if (keyBtn) {
      const keyName = keyBtn.getAttribute("data-key-name");
      if (keyName && !collected.includes(keyName)) {
        collectHeartKey(keyName, keyBtn, e.clientX, e.clientY);
      }
    }
  });

  // Update counter display
  updateNavbarKeysDisplay(currentLanguage);
}

function getCollectedKeys() {
  const str = localStorage.getItem("heart_keys_collected") || "";
  return str ? str.split(",") : [];
}

function collectHeartKey(keyName, keyEl, clickX, clickY) {
  let collected = getCollectedKeys();
  if (collected.includes(keyName)) return;

  collected.push(keyName);
  localStorage.setItem("heart_keys_collected", collected.join(","));

  // Sparkle burst effects on canvas
  triggerSparkleBurst(clickX, clickY);

  // Exciting chime sound fallback via Web Audio
  playChimeSound();

  // Hide key button with a beautiful GSAP scale down
  if (typeof gsap !== "undefined") {
    gsap.to(keyEl, {
      scale: 0,
      opacity: 0,
      rotation: 180,
      duration: 0.6,
      ease: "back.in(1.5)",
      onComplete: () => keyEl.remove()
    });
  } else {
    keyEl.style.display = "none";
  }

  // Update all UI count components
  updateNavbarKeysDisplay(currentLanguage);

  // Check if fully unlocked, alert user with high-fidelity alert
  if (collected.length === 3) {
    setTimeout(() => {
      // Trigger a beautiful success alert based on current locale
      const alertMsg = window.romanticTranslations[currentLanguage]["quest_unlocked_alert"];
      showQuestUnlockedAlert(alertMsg);
    }, 800);
  }
}

function updateNavbarKeysDisplay(lang) {
  const tracker = document.querySelector(".nav-key-tracker");
  if (!tracker) return;

  const collected = getCollectedKeys();
  const dict = window.romanticTranslations[lang];
  if (!dict) return;

  const countStr = `${collected.length}/3`;
  const label = dict["quest_keys"];

  tracker.innerHTML = `🔑 ${label}: <span>${countStr}</span>`;
}

// Custom sparkler particle physics
let sparkles = [];
function triggerSparkleBurst(x, y) {
  const canvas = document.getElementById("sparkle-quest-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  class Sparkle {
    constructor() {
      this.x = x;
      this.y = y;
      this.size = Math.random() * 5 + 2;
      this.speed = Math.random() * 6 + 3;
      this.angle = Math.random() * Math.PI * 2;
      this.gravity = 0.05;
      this.alpha = 1;
      this.decay = Math.random() * 0.02 + 0.01;
      this.color = `hsl(${Math.random() * 40 + 35}, 100%, 65%)`; // Golden sparks
    }
    update() {
      this.x += Math.cos(this.angle) * this.speed;
      this.y += Math.sin(this.angle) * this.speed + this.gravity;
      this.alpha -= this.decay;
      return this.alpha > 0;
    }
    draw() {
      ctx.save();
      ctx.globalAlpha = this.alpha;
      ctx.fillStyle = this.color;
      ctx.shadowBlur = 10;
      ctx.shadowColor = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  for (let i = 0; i < 35; i++) {
    sparkles.push(new Sparkle());
  }

  function anim() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    sparkles = sparkles.filter(s => {
      s.draw();
      return s.update();
    });

    if (sparkles.length > 0) {
      requestAnimationFrame(anim);
    }
  }
  anim();
}

// Gentle synthetic sound chime trigger
function playChimeSound() {
  try {
    const actx = new (window.AudioContext || window.webkitAudioContext)();
    const now = actx.currentTime;
    
    // Play an elegant major chord arpeggio
    const freqs = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    
    freqs.forEach((freq, idx) => {
      const osc = actx.createOscillator();
      const gainNode = actx.createGain();
      
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now + idx * 0.1);
      
      gainNode.gain.setValueAtTime(0, now + idx * 0.1);
      gainNode.gain.linearRampToValueAtTime(0.12, now + idx * 0.1 + 0.05);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 1.2 + idx * 0.1);
      
      osc.connect(gainNode);
      gainNode.connect(actx.destination);
      
      osc.start(now + idx * 0.1);
      osc.stop(now + 1.5 + idx * 0.1);
    });
  } catch (e) {
    console.log("Audio contexts blocked or failed: ", e);
  }
}

function showQuestUnlockedAlert(msg) {
  // Create beautiful glass alert overlay
  const overlay = document.createElement("div");
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.background = "rgba(10, 1, 12, 0.8)";
  overlay.style.backdropFilter = "blur(10px)";
  overlay.style.zIndex = "100000";
  overlay.style.display = "flex";
  overlay.style.justifyContent = "center";
  overlay.style.alignItems = "center";
  overlay.style.opacity = "0";
  overlay.style.transition = "opacity 0.5s ease";

  const alertBox = document.createElement("div");
  alertBox.className = "glass-card";
  alertBox.style.maxWidth = "450px";
  alertBox.style.width = "90%";
  alertBox.style.padding = "40px 30px";
  alertBox.style.textAlign = "center";
  alertBox.style.border = "1px solid var(--accent-gold)";
  alertBox.style.boxShadow = "0 15px 40px rgba(212, 175, 55, 0.25)";

  const icon = document.createElement("div");
  icon.innerHTML = "💖";
  icon.style.fontSize = "4rem";
  icon.style.marginBottom = "20px";
  icon.style.animation = "heart-beat 1.2s infinite ease-in-out";

  const text = document.createElement("p");
  text.innerText = msg;
  text.style.fontFamily = "var(--font-luxury)";
  text.style.fontSize = "1.3rem";
  text.style.color = "var(--text-primary)";
  text.style.lineHeight = "1.7";
  text.style.marginBottom = "30px";

  const btn = document.createElement("button");
  btn.className = "btn-gold-glow";
  btn.innerText = currentLanguage === "ar" ? "دعنا نذهب!" : "Let's Go!";
  btn.style.padding = "10px 25px";
  btn.addEventListener("click", () => {
    overlay.style.opacity = "0";
    setTimeout(() => {
      overlay.remove();
      // Redirect to surprise page
      const currentPath = window.location.pathname;
      let targetPath = "../surprise/surprise.html";
      if (currentPath.endsWith("index.html") && !currentPath.includes("/index/")) {
        targetPath = "./surprise/surprise.html";
      }
      window.location.href = targetPath;
    }, 500);
  });

  alertBox.appendChild(icon);
  alertBox.appendChild(text);
  alertBox.appendChild(btn);
  overlay.appendChild(alertBox);
  document.body.appendChild(overlay);

  setTimeout(() => {
    overlay.style.opacity = "1";
    if (typeof gsap !== "undefined") {
      gsap.fromTo(alertBox, { scale: 0.8 }, { scale: 1, duration: 0.5, ease: "back.out(1.2)" });
    }
  }, 50);
}

/* ==========================================
   3. Custom Interactive Cursor Glow
   ========================================== */
function initCursorGlow() {
  const cursor = document.createElement("div");
  cursor.classList.add("cursor-glow");
  document.body.appendChild(cursor);

  document.addEventListener("mousemove", (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
  });

  const hoverables = document.querySelectorAll("a, button, .glass-card, .btn-gold-glow, .btn-magenta-glow, .glowing-quest-key");
  hoverables.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor.style.width = "400px";
      cursor.style.height = "400px";
      cursor.style.background = "radial-gradient(circle, rgba(217, 27, 92, 0.22) 0%, rgba(112, 27, 168, 0.08) 50%, transparent 70%)";
    });
    el.addEventListener("mouseleave", () => {
      cursor.style.width = "300px";
      cursor.style.height = "300px";
      cursor.style.background = "radial-gradient(circle, rgba(217, 27, 92, 0.15) 0%, rgba(112, 27, 168, 0.05) 50%, transparent 70%)";
    });
  });
}

/* ==========================================
   4. Page Loader Fade-Out Transition
   ========================================== */
function initPageLoader() {
  const loader = document.querySelector(".page-loader");
  if (loader) {
    window.addEventListener("load", () => {
      setTimeout(() => {
        loader.classList.add("fade-out");
      }, 500);
    });
  }
}

/* ==========================================
   5. Scroll Dynamics: Progress Bar & Navbar
   ========================================== */
function initScrollDynamics() {
  const scrollProgress = document.querySelector(".scroll-progress");
  const navbar = document.querySelector(".custom-navbar");
  const backToTop = document.querySelector(".back-to-top");

  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    if (scrollProgress) {
      scrollProgress.style.width = `${scrolled}%`;
    }

    if (navbar) {
      if (scrollTop > 50) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    }

    if (backToTop) {
      if (scrollTop > 300) {
        backToTop.classList.add("visible");
      } else {
        backToTop.classList.remove("visible");
      }
    }
  });

  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }
}

/* ==========================================
   6. Seamless Multi-Page Audio Engine
   ========================================== */
let audioContext = null;
let pianoOscs = [];
let audioInterval = null;

function initAudioEngine() {
  const audio = document.createElement("audio");
  audio.id = "global-romantic-music";
  audio.loop = true;
  audio.style.display = "none";
  document.body.appendChild(audio);

  const currentPath = window.location.pathname;
  let assetPath = "../assets/music/romantic-bg.mp3";
  if (currentPath.endsWith("index.html") && !currentPath.includes("/index/")) {
    assetPath = "./assets/music/romantic-bg.mp3";
  } else if (currentPath.includes("/index/") || currentPath.includes("/love-story/") || currentPath.includes("/gallery/") || currentPath.includes("/countdown/") || currentPath.includes("/reasons/") || currentPath.includes("/surprise/")) {
    assetPath = "../assets/music/romantic-bg.mp3";
  }
  audio.src = assetPath;

  const audioController = document.querySelector(".audio-controller");
  if (!audioController) return;

  const audioBtn = audioController.querySelector(".audio-btn");
  const visualizer = audioController.querySelector(".audio-visualizer");
  const playIcon = '<i class="fa-solid fa-play"></i>';
  const pauseIcon = '<i class="fa-solid fa-pause"></i>';

  let isPlaying = localStorage.getItem("romantic_music_playing") === "true";
  let savedTime = parseFloat(localStorage.getItem("romantic_music_time")) || 0;

  const fallbackSynth = {
    gainNode: null,
    isPlaying: false,
    timer: null,
    playChords: function() {
      if (this.isPlaying) return;
      this.isPlaying = true;
      if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
      }
      this.gainNode = audioContext.createGain();
      this.gainNode.gain.setValueAtTime(0.001, audioContext.currentTime);
      this.gainNode.gain.linearRampToValueAtTime(0.15, audioContext.currentTime + 2);
      this.gainNode.connect(audioContext.destination);

      let chordIndex = 0;
      const chords = [
        [130.81, 164.81, 196.00, 246.94, 293.66], // Cmaj9
        [110.00, 146.83, 174.61, 220.00, 277.18], // Fmaj9
        [110.00, 130.81, 164.81, 196.00, 246.94], // Am9
        [98.00, 146.83, 196.00, 220.00, 293.66]   // G11
      ];

      const playSynthArpeggio = () => {
        if (!this.isPlaying) return;
        const now = audioContext.currentTime;
        const currentChord = chords[chordIndex];

        currentChord.forEach((freq, i) => {
          const osc = audioContext.createOscillator();
          const noteGain = audioContext.createGain();
          
          osc.type = i === 0 ? "sine" : "triangle"; 
          osc.frequency.setValueAtTime(freq, now + i * 0.15);
          
          noteGain.gain.setValueAtTime(0, now + i * 0.15);
          noteGain.gain.linearRampToValueAtTime(0.03, now + i * 0.15 + 0.1);
          noteGain.gain.exponentialRampToValueAtTime(0.0001, now + 4 + i * 0.15);

          osc.connect(noteGain);
          noteGain.connect(this.gainNode);
          
          osc.start(now + i * 0.15);
          osc.stop(now + 5.5 + i * 0.15);
          
          pianoOscs.push(osc);
        });

        chordIndex = (chordIndex + 1) % chords.length;
        this.timer = setTimeout(playSynthArpeggio, 6000);
      };

      playSynthArpeggio();
    },
    stopChords: function() {
      this.isPlaying = false;
      if (this.timer) clearTimeout(this.timer);
      if (this.gainNode) {
        try {
          this.gainNode.gain.setValueAtTime(this.gainNode.gain.value, audioContext.currentTime);
          this.gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 1.5);
        } catch(e) {}
      }
      setTimeout(() => {
        pianoOscs.forEach(o => { try{ o.stop(); } catch(e){} });
        pianoOscs = [];
      }, 1600);
    }
  };

  const startMusic = () => {
    audio.play()
      .then(() => {
        audio.currentTime = savedTime;
        audio.volume = 0;
        let fadeInterval = setInterval(() => {
          if (audio.volume < 0.5) {
            audio.volume += 0.05;
          } else {
            clearInterval(fadeInterval);
          }
        }, 100);
        visualizer.classList.add("playing");
        audioBtn.innerHTML = pauseIcon;
      })
      .catch((err) => {
        console.log("MP3 play blocked, using Web Audio SynthFallback...", err);
        fallbackSynth.playChords();
        visualizer.classList.add("playing");
        audioBtn.innerHTML = pauseIcon;
      });

    isPlaying = true;
    localStorage.setItem("romantic_music_playing", "true");

    if (audioInterval) clearInterval(audioInterval);
    audioInterval = setInterval(() => {
      localStorage.setItem("romantic_music_time", audio.currentTime);
    }, 500);
  };

  const stopMusic = () => {
    let fadeInterval = setInterval(() => {
      if (audio.volume > 0.05) {
        audio.volume -= 0.05;
      } else {
        clearInterval(fadeInterval);
        audio.pause();
      }
    }, 50);

    fallbackSynth.stopChords();
    visualizer.classList.remove("playing");
    audioBtn.innerHTML = playIcon;
    isPlaying = false;
    localStorage.setItem("romantic_music_playing", "false");
    if (audioInterval) clearInterval(audioInterval);
  };

  audioBtn.addEventListener("click", () => {
    if (isPlaying) {
      stopMusic();
    } else {
      startMusic();
    }
  });

  if (isPlaying) {
    const userInteractionHandler = () => {
      startMusic();
      document.removeEventListener("click", userInteractionHandler);
      document.removeEventListener("scroll", userInteractionHandler);
      document.removeEventListener("touchstart", userInteractionHandler);
    };

    document.addEventListener("click", userInteractionHandler);
    document.addEventListener("scroll", userInteractionHandler);
    document.addEventListener("touchstart", userInteractionHandler);
  } else {
    audioBtn.innerHTML = playIcon;
    visualizer.classList.remove("playing");
  }
}

/* ==========================================
   7. Mobile Responsive Navbar Navigation Toggle
   ========================================== */
function initMobileNavbar() {
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.querySelector(".nav-menu");
  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      toggle.classList.toggle("open");
      menu.classList.toggle("open");
    });

    const links = menu.querySelectorAll("a");
    links.forEach((l) => {
      l.addEventListener("click", () => {
        toggle.classList.remove("open");
        menu.classList.remove("open");
      });
    });
  }
}
