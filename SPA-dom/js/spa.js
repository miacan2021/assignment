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
     e.preventDefault(); // Prevent default click action
     e.stopPropagation(); // Stop other click handlers (like opening modal)
     whySection.scrollIntoView({ behavior: "smooth" });
   });
   whyButton.dataset.scrollAttached = "true";
 }
}

// Initial application
updateHeroSection();
updateButtons();

// SPA-safe observer (observe only the main content)
const mainContent = document.querySelector("body"); // or more specific container
const observer = new MutationObserver(() => {
  // Delay to prevent feedback loop
  setTimeout(() => {
    updateHeroSection();
    updateButtons();
  }, 50);
});
observer.observe(mainContent, { childList: true, subtree: true });
