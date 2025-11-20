/* script.js  — navigation toggle, WhatsApp helper, reveal-on-scroll */

/* ------------------------------
   MOBILE NAV MENU TOGGLE
--------------------------------*/
document.addEventListener("DOMContentLoaded", function () {
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      const expanded = navToggle.getAttribute("aria-expanded") === "true";

      navToggle.setAttribute("aria-expanded", !expanded);

      // If menu is visible -> hide it
      if (expanded) {
        navMenu.style.display = "none";
      } else {
        navMenu.style.display = "flex";
        navMenu.style.flexDirection = "column"; // vertical for mobile
        navMenu.style.gap = "10px";
        navMenu.style.padding = "12px 0";
      }
    });
  }

  /* ------------------------------
     REVEAL ON SCROLL ANIMATION
  --------------------------------*/
  const revealElements = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealElements.forEach((el) => observer.observe(el));
});

/* ------------------------------
   OPEN WHATSAPP CHAT
--------------------------------*/
function openWhatsApp() {
  // Primary number (change anytime)
  const phone = "971581285338"; // no + sign for wa.me links

  const url = `https://wa.me/${phone}`;

  window.open(url, "_blank");
}
