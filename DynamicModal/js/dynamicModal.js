// Create glass wall overlay
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

// button
const buttonWrapper = document.createElement("button");
const buttonFrame = document.createElement("span");
const button = document.createElement("span");
const buttonInner = document.createElement("span");
buttonWrapper.className = "modal-button-wrapper";
buttonFrame.className = "modal-button-frame";
button.className = "modal-button";
buttonInner.className = "modal-button-inner";
buttonInner.textContent = "Click here";
button.appendChild(buttonInner);
buttonFrame.appendChild(button);
buttonWrapper.appendChild(buttonFrame);

// Append h2, p, button to modal-content
modalContent.appendChild(header);
modalContent.appendChild(paragraph);
modalContent.appendChild(buttonWrapper);

// Append modal-content to section
section.appendChild(modalContent);

// Finally, add section to the page
document.body.appendChild(overlay);
document.body.appendChild(section);
