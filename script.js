const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");

menuToggle?.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  siteNav?.classList.toggle("is-open", !isExpanded);
});

siteNav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle?.setAttribute("aria-expanded", "false");
    siteNav.classList.remove("is-open");
  });
});

const filterButtons = [...document.querySelectorAll("[data-filter]")];
const categoryCards = [...document.querySelectorAll(".category-card")];
const filterStatus = document.querySelector(".filter-status");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    let visibleCount = 0;

    filterButtons.forEach((item) => {
      const selected = item === button;
      item.classList.toggle("is-active", selected);
      item.setAttribute("aria-pressed", String(selected));
    });

    categoryCards.forEach((card) => {
      const visible = filter === "todas" || card.dataset.branch === filter;
      card.hidden = !visible;
      if (visible) visibleCount += 1;
    });

    if (filterStatus) {
      filterStatus.textContent = `${visibleCount} ${visibleCount === 1 ? "categoría" : "categorías"}`;
    }
  });
});

const lightbox = document.querySelector("#lightbox");
const lightboxImage = lightbox?.querySelector("img");
const lightboxCaption = lightbox?.querySelector(".lightbox-caption");

document.querySelectorAll("[data-lightbox]").forEach((item) => {
  item.addEventListener("click", () => {
    if (!lightbox || !lightboxImage) return;
    lightboxImage.src = item.dataset.lightbox;
    lightboxImage.alt = item.dataset.caption ?? "Imagen ampliada";
    if (lightboxCaption) lightboxCaption.textContent = item.dataset.caption ?? "";
    lightbox.showModal();
  });
});

lightbox?.querySelector(".lightbox-close")?.addEventListener("click", () => lightbox.close());
lightbox?.addEventListener("click", (event) => {
  if (event.target === lightbox) lightbox.close();
});
lightbox?.addEventListener("close", () => {
  if (lightboxImage) lightboxImage.src = "";
});

const countdown = document.querySelector("#countdown");
const eventStart = new Date("2026-12-18T00:00:00-06:00");
const eventEnd = new Date("2026-12-21T00:00:00-06:00");

function updateCountdown() {
  if (!countdown) return;
  const now = new Date();
  let message = "";

  if (now < eventStart) {
    const days = Math.ceil((eventStart.getTime() - now.getTime()) / 86_400_000);
    message = `Faltan ${days} ${days === 1 ? "día" : "días"} para la Copa`;
  } else if (now < eventEnd) {
    message = "La Copa ADEMEBA Yucatán está en juego";
  } else {
    message = "Gracias por vivir la Copa ADEMEBA Yucatán 2026";
  }

  countdown.textContent = message;
}

updateCountdown();
window.setInterval(updateCountdown, 60_000);
