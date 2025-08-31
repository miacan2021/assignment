// Helper Function
function createElement(tag, className, textContent) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (textContent) el.textContent = textContent;
  return el;
}

// Use material icon for progress bar
function loadMaterialSymbols() {
  const link = createElement("link");
  link.rel = "stylesheet";
  link.href =
    "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200";
  document.head.appendChild(link);
}

// Modal (progress section)
class ModalProgressForm {
  constructor(options) {
    this.icons = options.icons || ["person", "checkbook", "send"];
    this.formSelector = options.formSelector;
    this.formWrapperSelector = options.formWrapperSelector;
    this.modalHeader = options.modalHeader || "Hello Conversion!";
    this.modalText =
      options.modalText || "Click on the button below to contact us";
    this.buttonText = options.buttonText || "Click here";
    this.submitted = false;

    this.init();
  }

  init() {
    loadMaterialSymbols();
    this.createModal();
    this.createProgressBar();
    this.cacheFormElements();
    this.attachListeners();
  }

  // Modal initial contents
  createModal() {
    this.overlay = createElement("div", "modal-overlay");
    this.section = createElement("section", "modal-container");
    this.modalContent = createElement("div", "modal-content");

    const header = createElement("h3", "modal-header", this.modalHeader);
    const paragraph = createElement("p", "modal-paragraph", this.modalText);

    // button
    const buttonWrapper = createElement("button", "modal-button-wrapper");
    const buttonFrame = createElement("span", "modal-button-frame");
    const button = createElement("span", "modal-button");
    const buttonInner = createElement(
      "span",
      "modal-button-inner",
      this.buttonText
    );

    button.appendChild(buttonInner);
    buttonFrame.appendChild(button);
    buttonWrapper.appendChild(buttonFrame);

    this.modalContent.append(header, paragraph, buttonWrapper);
    this.section.appendChild(this.modalContent);
    document.body.append(this.overlay, this.section);

    // store button for click event
    this.modalButton = buttonWrapper;
  }

  // Progress bar
  createProgressBar() {
    this.contactFormWrapper = document.querySelector(this.formWrapperSelector);

    this.progressSection = createElement("section", "progress-section");
    this.progressBar = createElement("div", "progress-bar");
    this.progressSection.appendChild(this.progressBar);

    this.steps = this.icons.map((iconName) => {
      const step = createElement("div", "step");
      const icon = createElement("span", "material-symbols-outlined", iconName);
      step.appendChild(icon);
      this.progressSection.appendChild(step);
      return step;
    });

    this.contactFormWrapper.prepend(this.progressSection);
  }

  // Contact form
  cacheFormElements() {
    this.contactForm = document.querySelector(this.formSelector);

    this.firstNameInput = this.contactForm.querySelector('[name="firstname"]');
    this.lastNameInput = this.contactForm.querySelector('[name="lastname"]');
    this.emailInput = this.contactForm.querySelector('[name="email"]');

    this.howCanWeHelpYouInput = this.contactForm.querySelector(
      '[name="how_can_we_help_you___contact_us_form_"]'
    );
    this.checkBox = this.contactForm.querySelector(
      '[name="LEGAL_CONSENT.subscription_type_45081547"]'
    );
  }

  // Validate elements
  isStep1Valid() {
    return [this.firstNameInput, this.lastNameInput, this.emailInput].every(
      (el) => el.value.trim() !== ""
    );
  }

  isStep2Valid() {
    return (
      this.howCanWeHelpYouInput.value.trim() !== "" && this.checkBox.checked
    );
  }

  getCurrentStepIndex() {
    if (!this.isStep1Valid()) return 0;
    if (!this.isStep2Valid()) return 1;
    return 2;
  }

  updateStepUI() {
    const step1Done = this.isStep1Valid();
    const step2Done = this.isStep2Valid();
    const step3Done = this.submitted;

    const currentIndex = this.getCurrentStepIndex();

    this.steps.forEach((step, i) => {
      const isCompleted =
        (i === 0 && step1Done) ||
        (i === 1 && step2Done) ||
        (i === 2 && step3Done);

      step.classList.toggle("current", i === currentIndex);
      step.classList.toggle("completed", isCompleted);
    });

    this.progressBar.style.width =
      (currentIndex / (this.steps.length - 1)) * 100 + "%";
  }

  // Events
  attachListeners() {
    // Modal button click
    this.modalButton.addEventListener("click", () => {
      this.section.style.display = "none";
      this.contactFormWrapper.style.display = "block";
    });

    // Step inputs
    [this.firstNameInput, this.lastNameInput, this.emailInput].forEach((el) =>
      el.addEventListener("input", () => this.updateStepUI())
    );
    [this.howCanWeHelpYouInput, this.checkBox].forEach((el) => {
      el.addEventListener("input", () => this.updateStepUI());
      el.addEventListener("change", () => this.updateStepUI());
    });

    // Form submission
    this.contactForm.addEventListener("submit", (e) => this.handleSubmit(e));
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.isStep2Valid()) {
      this.updateStepUI();
      return;
    }

    // UI-only submission:
    this.submitted = true; // marks step 3 as completed
    this.updateStepUI();
    this.showThankYouMessage();

    // ! Real submission
    // this.contactForm.submit();
  }

  showThankYouMessage() {
    this.contactForm.style.display = "none";

    let thankYouMsg = document.querySelector(".submitted-message");
    if (!thankYouMsg) {
      thankYouMsg = createElement("div", "submitted-message");
      this.contactFormWrapper.appendChild(thankYouMsg);
    }

    thankYouMsg.innerHTML = ""; // clear previous content
    const heading = createElement("p", null, "Thank you!");
    thankYouMsg.appendChild(heading);
    thankYouMsg.style.display = "block";
  }
}

// Initial variables
new ModalProgressForm({
  formSelector: ".hbspt-form form",
  formWrapperSelector: ".contact-form__form ",
  icons: ["person", "checkbook", "send"],
  modalHeader: "Hello Conversion!",
  modalText: "Click on the button below to contact us",
  buttonText: "Click here",
});