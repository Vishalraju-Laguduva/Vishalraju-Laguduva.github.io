const tabs = [...document.querySelectorAll(".tab")];
const panels = [...document.querySelectorAll(".tab-panel")];

function showTab(name) {
  tabs.forEach(tab => {
    const active = tab.dataset.tab === name;
    tab.classList.toggle("active", active);
    tab.setAttribute("aria-current", active ? "page" : "false");
  });
  panels.forEach(panel => panel.classList.toggle("hidden", panel.id !== `panel-${name}`));
  document.getElementById("home").scrollIntoView({ behavior: "smooth", block: "start" });
  document.getElementById("mainNav").classList.remove("open");
  document.getElementById("menuToggle").setAttribute("aria-expanded", "false");
}
tabs.forEach(tab => tab.addEventListener("click", () => showTab(tab.dataset.tab)));
document.querySelectorAll("[data-jump]").forEach(button => button.addEventListener("click", () => showTab(button.dataset.jump)));

const menuToggle = document.getElementById("menuToggle");
menuToggle.addEventListener("click", () => {
  const nav = document.getElementById("mainNav");
  const open = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
document.querySelectorAll(".gallery-image").forEach(button => {
  button.addEventListener("click", () => {
    const image = button.querySelector("img");
    if (!image || !image.complete || image.naturalWidth === 0) return;
    lightboxImage.src = button.dataset.full;
    lightboxImage.alt = image.alt || "Project image";
    lightbox.showModal();
  });
});
document.getElementById("lightboxClose").addEventListener("click", () => lightbox.close());
lightbox.addEventListener("click", event => {
  if (event.target === lightbox) lightbox.close();
});
document.querySelectorAll(".placeholder-link").forEach(link => link.addEventListener("click", event => {
  if (link.getAttribute("href") === "#") {
    event.preventDefault();
    alert("Replace this placeholder link with your report, publication, or project page URL.");
  }
}));
document.getElementById("year").textContent = new Date().getFullYear();
