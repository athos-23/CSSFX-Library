// Database originale 1:1 estratto dai file di bundle di CSSFX
export const DEFAULT_EFFECTS = [
  // --- BUTTONS ---
  {
    id: "btn-pulse",
    title: "Pulse Button",
    category: "Buttons",
    html: `<button class="btn-pulse">Hover me</button>`,
    css: `.btn-pulse {\n  position: relative;\n  padding: 12px 24px;\n  border: none;\n  background: #6366f1;\n  color: #fff;\n  font-weight: 600;\n  border-radius: 8px;\n  cursor: pointer;\n  transition: all 0.3s ease;\n}\n.btn-pulse:hover {\n  box-shadow: 0 0 0 12px rgba(99, 102, 241, 0);\n}`
  },
  {
    id: "btn-shine",
    title: "Shine Button",
    category: "Buttons",
    html: `<button class="btn-shine"><span>Shine</span></button>`,
    css: `.btn-shine {\n  position: relative;\n  padding: 12px 24px;\n  background: #1e293b;\n  color: #fff;\n  border: 1px solid #334155;\n  border-radius: 8px;\n  overflow: hidden;\n  cursor: pointer;\n}\n.btn-shine::after {\n  content: '';\n  position: absolute;\n  top: -50%;\n  left: -50%;\n  width: 200%;\n  height: 200%;\n  background: linear-gradient(60deg, transparent, rgba(255,255,255,0.2), transparent);\n  transform: rotate(30deg) translateY(-100%);\n  transition: transform 0.6s ease;\n}\n.btn-shine:hover::after {\n  transform: rotate(30deg) translateY(100%);\n}`
  },
  {
    id: "btn-border-draw",
    title: "Border Draw",
    category: "Buttons",
    html: `<button class="btn-border-draw">Draw Border</button>`,
    css: `.btn-border-draw {\n  position: relative;\n  padding: 12px 24px;\n  background: transparent;\n  color: #a855f7;\n  border: 2px solid transparent;\n  font-weight: 600;\n  cursor: pointer;\n  transition: color 0.3s ease;\n}\n.btn-border-draw::before {\n  content: '';\n  position: absolute;\n  inset: 0;\n  border: 2px solid #a855f7;\n  transition: clip-path 0.4s ease;\n  clip-path: polygon(0 0, 0 0, 0 100%, 0 100%);\n}\n.btn-border-draw:hover::before {\n  clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);\n}`
  },

  // --- INPUTS & TEXT ---
  {
    id: "input-underline",
    title: "Animated Input Underline",
    category: "Inputs",
    html: `<div class="input-container">\n  <input type="text" required placeholder=" " />\n  <label>Your Name</label>\n  <span class="focus-border"></span>\n</div>`,
    css: `.input-container {\n  position: relative;\n  width: 200px;\n}\n.input-container input {\n  width: 100%;\n  padding: 8px 0;\n  font-size: 14px;\n  color: #fff;\n  border: none;\n  border-bottom: 1px solid #475569;\n  outline: none;\n  background: transparent;\n}\n.input-container label {\n  position: absolute;\n  top: 8px;\n  left: 0;\n  font-size: 14px;\n  color: #94a3b8;\n  pointer-events: none;\n  transition: 0.3s ease all;\n}\n.input-container input:focus ~ label,\n.input-container input:not(:placeholder-shown) ~ label {\n  top: -12px;\n  font-size: 11px;\n  color: #38bdf8;\n}\n.focus-border {\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  width: 0;\n  height: 2px;\n  background-color: #38bdf8;\n  transition: 0.4s ease-out;\n}\n.input-container input:focus ~ .focus-border {\n  width: 100%;\n}`
  },

  // --- CARDS ---
  {
    id: "card-glow-border",
    title: "Glowing Border Card",
    category: "Cards",
    html: `<div class="glow-card">\n  <div class="glow-content">Glowing Card</div>\n</div>`,
    css: `.glow-card {\n  position: relative;\n  width: 180px;\n  height: 100px;\n  border-radius: 12px;\n  background: #0f172a;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  overflow: hidden;\n}\n.glow-card::before {\n  content: '';\n  position: absolute;\n  width: 150px;\n  height: 200%;\n  background: linear-gradient(#06b6d4, #ec4899);\n  animation: rotate 4s linear infinite;\n}\n.glow-card::after {\n  content: '';\n  position: absolute;\n  inset: 2px;\n  background: #020617;\n  border-radius: 10px;\n}\n.glow-content {\n  position: relative;\n  z-index: 10;\n  color: #fff;\n  font-weight: 600;\n  font-size: 13px;\n}\n@keyframes rotate {\n  0% { transform: rotate(0deg); }\n  100% { transform: rotate(360deg); }\n}`
  },

  // --- LOADERS ---
  {
    id: "loader-dots",
    title: "Bouncing Dots Loader",
    category: "Loaders",
    html: `<div class="bouncing-loader">\n  <div></div>\n  <div></div>\n  <div></div>\n</div>`,
    css: `.bouncing-loader {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  gap: 6px;\n}\n.bouncing-loader > div {\n  width: 10px;\n  height: 10px;\n  background-color: #a855f7;\n  border-radius: 50%;\n  animation: bouncing-loader 0.6s infinite alternate;\n}\n.bouncing-loader > div:nth-child(2) {\n  animation-delay: 0.2s;\n}\n.bouncing-loader > div:nth-child(3) {\n  animation-delay: 0.4s;\n}\n@keyframes bouncing-loader {\n  to {\n    opacity: 0.1;\n    transform: translateY(-8px);\n  }\n}`
  }
];