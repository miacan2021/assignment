// Apply hero text and value proposition
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

updateHeroSection();

// Reapply on SPA route changes
const observer = new MutationObserver(() => {
  updateHeroSection();
});
observer.observe(document.body, { childList: true, subtree: true });
