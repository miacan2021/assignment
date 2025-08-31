// Create glass walloverlay
const overlay = document.createElement("div");
overlay.className = "modal-overlay";

// Create modal section
const section = document.createElement("section");
section.className = "modal-container";

// Create modal content div
const modalContent = document.createElement("div");
modalContent.className = "modal-content";

// h2
const header = document.createElement("h3");
header.className = "modal-header";
header.textContent = "Hello Conversion!";

// paragraph
const paragraph = document.createElement("p");
paragraph.className = "modal-paragraph";
paragraph.textContent = "Click on the button below to contact us";

// Append h2, p, button to modal-content
modalContent.appendChild(header);
modalContent.appendChild(paragraph);

// Append modal-content to section
section.appendChild(modalContent);

// Finally, add section to the page (for example inside body)
document.body.appendChild(overlay);
document.body.appendChild(section);
