document.addEventListener("DOMContentLoaded", () => {
  // 1. WhatsApp booking links
  const WA_URL =
    "https://wa.me/2348170253496?text=" +
    encodeURIComponent("Hello Everyday Studios, I'd like to inquire about booking a photo session.");
  document.querySelectorAll(".wa-link").forEach((a) => (a.href = WA_URL));

  // 2. Mobile menu toggle
  const menuBtn = document.getElementById("menuBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => {
      const open = mobileMenu.classList.toggle("open");
      menuBtn.textContent = open ? "✕" : "☰";
    });
    mobileMenu.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        mobileMenu.classList.remove("open");
        menuBtn.textContent = "☰";
      })
    );
  }

  // 3. Portfolio filter
  const buttons = document.querySelectorAll("#filters button");
  const items = document.querySelectorAll("#gallery figure");
  buttons.forEach((btn) =>
    btn.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const f = btn.dataset.filter;
      items.forEach((item) => {
        const match = f === "all" || item.dataset.cat === f;
        item.classList.toggle("hidden", !match);
        item.classList.remove("show");
        if (match) {
          void item.offsetWidth; // restart animation
          item.classList.add("show");
        }
      });
    })
  );

  // 4. Footer year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // 5. Lightbox Functionality
  const gallery = document.getElementById("gallery");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxClose = document.getElementById("lightboxClose");

  if (gallery && lightbox && lightboxImg) {
    gallery.addEventListener("click", (e) => {
      const figure = e.target.closest("figure");
      if (!figure) return;
      const img = figure.querySelector("img");
      if (img) {
        lightboxImg.src = img.src;
        lightbox.style.display = "flex";
      }
    });

    const closeLightbox = () => {
      lightbox.style.display = "none";
    };

    lightbox.addEventListener("click", closeLightbox);
    if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);

    lightboxImg.addEventListener("click", (e) => {
      e.stopPropagation();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeLightbox();
    });
  }
});