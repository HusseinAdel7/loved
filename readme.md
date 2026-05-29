# Luxury Animated Romantic Birthday Website 💖✨

A premium, fully animated, responsive, and cinematic multi-page romantic website designed as a birthday surprise for your fiancée. It features smooth scroll reveals, custom radial glows, float heart canvas particles, persistent cross-page music controllers, twinkling celestial stargardens, 3D interactive flip cards, and fullscreen canvas fireworks/confetti displays.

---

## 📂 Project Directory Structure

The project follows your requested structured layout exactly:

```text
d:/Loved/
│
├── index.html                   # Cinematic opening gold wax seal invite
├── readme.md                    # Instructions & Customization guide
│
├── index/                       # Chapter I: Home Dashboard
│   ├── index.html
│   ├── css/style.css & media.css
│   └── js/script.js
│
├── love-story/                  # Chapter II: Relationship Timeline
│   ├── love-story.html
│   ├── css/style.css & media.css
│   └── js/script.js
│
├── gallery/                     # Chapter III: Vintage Polaroid Memories
│   ├── gallery.html
│   ├── css/style.css & media.css
│   └── js/script.js
│
├── countdown/                   # Chapter IV: Ticking Celestial Clock
│   ├── countdown.html
│   ├── css/style.css & media.css
│   └── js/script.js
│
├── reasons/                     # Chapter V: 3D Flip reasons Board
│   ├── reasons.html
│   ├── css/style.css & media.css
│   └── js/script.js
│
├── surprise/                    # Chapter VI: Grand Cinematic Surprise Letter
│   ├── surprise.html
│   ├── css/style.css & media.css
│   └── js/script.js
│
├── assets/                      # Media directory
│   ├── images/                  # Drop your couple photos here
│   ├── videos/                  # Drop background videos here (optional)
│   └── music/                   # Drop your custom background song here
│       └── romantic-bg.mp3
│
└── shared/                      # Reusable modular layouts
    ├── css/
    │   ├── global.css           # Typography tokens, scrollbars, loaders, custom cursor glow
    │   └── navigation.css       # Translucent sticky navbar & footer
    └── js/
        ├── global.js            # Persistent Audio controller & Web Audio Synth engine
        └── hearts.js            # Hardware-accelerated canvas floating hearts
```

---

## 🌟 Elite Premium Features Installed

1. **Gatekeeping Cinematic Envelope (`/index.html`)**: A 3D realistic envelope with gold wax seals glowing in candle lights. Clicking the seal unfolds the flap, triggers page loaders, and plays a fade transition.
2. **Persistent Audio Sync Engine (`shared/js/global.js`)**: Seamlessly preserves background music play state, volume, and playback positions in `localStorage` across page changes.
3. **Web Audio Fallback Synthesizer**: If no custom `romantic-bg.mp3` file is added, the custom vanilla engine automatically synthesizes gorgeous, slow, luxury ambient romantic piano chords (progression: *Cmaj9 - Am9 - Fmaj9 - G11*) using browser Web Audio oscillators so that the website **always plays gorgeous romantic music on first interaction out-of-the-box!**
4. **Twinkling Star field Canvas (`countdown/`)**: A hardware-accelerated 2D canvas drawing 100+ twinkling golden and silver stars drifting slowly upwards.
5. **Drifting Wish Board (`countdown/`)**: Users can type written wishes that load dynamically into custom glowing hearts and float up into the starry sky.
6. **3D perspective flip cards (`reasons/`)**: Glassmorphic cards with gold outlines that flip 180 degrees. Flipping cards speeds up the centerpiece glowing SVG heart pulse.
7. **Credit Roll Scroller & Fireworks (`surprise/`)**: Opening the final envelope fades out headers/footers, triggers automatic scrolling of the letter (credits style), launches fireworks from bottom corners, rains down colorful confetti, and glows neon declarations.

---

## 🛠 How to Run & Customize

### Running locally
1. Double-click the root `index.html` file in the main folder to launch it directly in your browser.
2. For absolute smooth transitions, run a local development server in the root folder (e.g., using VS Code Live Server extension or `npm install -g http-server` and typing `http-server` in terminal).

### Customizing Assets
* **Add Music**: Put a gorgeous romantic MP3 track into `assets/music/` and name it `romantic-bg.mp3`. The script will instantly play your song instead of the built-in ambient synth!
* **Add Photos**: The Memories Gallery currently displays stunning CSS abstract vector art matching your dates (e.g., sunset walks, cozy concert dates). To swap these with your real couple photographs:
  1. Drop your images inside `assets/images/`.
  2. Inside `gallery/gallery.html`, swap out the `<div class="polaroid-placeholder gradient-...">...</div>` lines with standard HTML images pointing to your photos:
     ```html
     <img src="../assets/images/my-photo.jpg" alt="Paris" class="polaroid-photo-wrapper">
     ```
* **Fiancée's Name**: Open `index/index.html` and edit `<span class="highlight-gold text-glow">My Beautiful fiancée</span>` or add her real name (e.g. `Sarah`) to customize the hero headings.
# loved
