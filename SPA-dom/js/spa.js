function updateHeroSection() {
  const heroHeader = document.querySelector(".lm-hero__header");
  if (heroHeader) {
    heroHeader.textContent =
      "We are the best experimentation agency in the world";
  }

  if (heroHeader && !document.querySelector(".custom-vp")) {
    const listCopy = `
      <ul class="custom-vp">
        <li>&#10003; Increase conversion rates across your website</li>
        <li>&#10003; Iterative site redesign</li>
        <li>&#10003; Improve ROAS efficiency</li>
        <li>&#10003; Standing or scaling an experimentation program</li>
        <li>&#10003; Advanced customer research</li>
      </ul>
    `;
    heroHeader.insertAdjacentHTML("afterend", listCopy);
  }
}

function updateButtons() {
  const buttons = document.querySelectorAll(".btn");
  buttons.forEach((btn) => {
    if (btn.textContent.trim() === "Request a demo") {
      btn.textContent = "Contact us";
    }
  });

 const whyButton = document.querySelector(".btn.btn-video");
 const whySection = document.querySelector(".lm-why");

 if (whyButton && whySection && !whyButton.dataset.scrollAttached) {
   whyButton.addEventListener("click", (e) => {
     e.preventDefault();
     e.stopPropagation();
     whySection.scrollIntoView({ behavior: "smooth" });
   });
   whyButton.dataset.scrollAttached = "true";
 }
}

updateHeroSection();
updateButtons();

// SPA observer
const mainContent = document.querySelector("body");
const observer = new MutationObserver(() => {
  /* to avoid freeze the page */
  setTimeout(() => {
    updateHeroSection();
    updateButtons();
  }, 50);
});
observer.observe(mainContent, { childList: true, subtree: true });
