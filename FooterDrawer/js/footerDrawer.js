// Load Swiper CSS & JS
const swiperCSS = document.createElement("link");
swiperCSS.rel = "stylesheet";
swiperCSS.href = "https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.css";
document.head.appendChild(swiperCSS);

const swiperJS = document.createElement("script");
swiperJS.src = "https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.js";
document.body.appendChild(swiperJS);

// Create Drawer
const drawer = document.createElement("div");
drawer.id = "footer-drawer";
drawer.innerHTML = `
  <div class="drawer-content">
    <div class="drawer-tab">
      <div class="drawer-toggle">
        <p class="drawer-title">Sticky drawer</p>
        <div class="slider-arrows">
          <div class="swiper-button-next"></div>
          <div class="swiper-pagination"></div>
          <div class="swiper-button-prev"></div>
        </div>
        <span class="chevron">&#8964;</span>
      </div>
    </div>
    <div class="swiper">
      <div class="swiper-wrapper"></div>
    </div>
  </div>
  <div class="drawer-overlay"></div>
`;
document.body.appendChild(drawer);

// Init Vals
const tab = drawer.querySelector(".drawer-tab");
const content = drawer.querySelector(".drawer-content");
const overlay = drawer.querySelector(".drawer-overlay");
const chevron = drawer.querySelector(".chevron");
const arrows = drawer.querySelector(".slider-arrows");

// Toggle Drawer
function toggleDrawer() {
  const isOpen = !content.classList.contains("open");

  content.classList.toggle("open", isOpen);
  overlay.style.display = isOpen ? "block" : "none";
  chevron.style.transform = isOpen ? "rotate(180deg)" : "rotate(0deg)";
  chevron.style.top = isOpen ? "0.5rem" : "-0.2rem";
  tab.classList.toggle("open", isOpen);
  arrows.style.display = isOpen ? "flex" : "none";
}

chevron.addEventListener("click", toggleDrawer);
overlay.addEventListener("click", toggleDrawer);

// Auto-close drawer on scroll bottom
window.addEventListener("scroll", () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    content.style.bottom = "-300px";
    chevron.style.transform = "rotate(0deg)";
    overlay.style.display = "none";
  }
});

// Create Slides
async function createSlides() {
  const wrapper = document.querySelector(".swiper-wrapper");
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=7");
  const data = await res.json();

  for (const [index, pokemon] of data.results.entries()) {
    const pokeRes = await fetch(pokemon.url);
    const pokeData = await pokeRes.json();
    // Fetch species data for flavor text
    const speciesRes = await fetch(pokeData.species.url);
    const speciesData = await speciesRes.json(); // <-- make sure to await and assign

    // Get English flavor text (first available)
    const flavorEntry = speciesData.flavor_text_entries.find(
      (entry) => entry.language.name === "en"
    );
    const description = flavorEntry
      ? flavorEntry.flavor_text.replace(/\n|\f/g, " ")
      : "";

    const slide = document.createElement("div");
    slide.classList.add("swiper-slide", `slide${index}`);
    slide.innerHTML = `
      <h3>${pokeData.name}</h3>
      <img src="${pokeData.sprites.front_default}" alt="${pokeData.name}" class="pokemon-img" />
      <p>${description}</p>
      <button class="button">Click</button>
    `;
    wrapper.appendChild(slide);
  }
}

// Initialize Swiper
swiperJS.onload = () => {
  createSlides().then(() => {
    new Swiper(".swiper", {
      slidesPerView: 4,
      slidesPerGroup: 4,
      spaceBetween: 20,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      pagination: {
        el: ".swiper-pagination",
        type: "fraction",
      },
      breakpoints: {
        1024: { slidesPerView: 4, slidesPerGroup: 4 },
        768: { slidesPerView: 2, slidesPerGroup: 2 },
        375: { slidesPerView: 1, slidesPerGroup: 1 },
      },
    });
  });
};
