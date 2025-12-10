// glitchButton.js

class GlitchButton {
  constructor(selector = ".glitch-btn") {
    this.buttons = document.querySelectorAll(selector);
    gsap.registerPlugin(EasePack);
    this.init();
  }

  init() {
    this.buttons.forEach((btn) => {
      const svg = btn.querySelector("svg");
      const blue = svg.querySelectorAll(".blue rect");
      const pink = svg.querySelectorAll(".pink rect");

      btn.addEventListener("mouseenter", () => {
        this.animateLines(blue, true);
        this.animateLines(pink, true);
      });

      btn.addEventListener("mouseleave", () => {
        this.animateLines(blue, false);
        this.animateLines(pink, false);
      });
    });
  }

  animateLines(nodes, enter) {
    const ease = `rough({
      template:none.out,
      strength:5,
      points:15,
      taper:none,
      randomize:false,
      clamp:false
    })`;

    gsap.to(nodes, {
      duration: 0.45,
      ease,
      xPercent: enter ? "100" : "-100",
      stagger: 0.02,
      overwrite: true
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new GlitchButton();
});
