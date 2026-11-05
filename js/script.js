document.addEventListener("DOMContentLoaded", function () {

    // Get the booking form from kiosk.html.
    const bookingForm = document.getElementById("bookingForm");

    // Run booking code only on the Kiosk page.
    if (bookingForm) {

        
bookingForm.addEventListener("submit", function (event) {

    event.preventDefault();

    // Hide the previous booking result.
    const resultSection = document.getElementById("resultSection");
    resultSection.hidden = true;

    // Validate customer input.
    const isValid = validateForm();

    if (!isValid) {
        return;
    }

    // Calculate and display the new booking result.
    calculateBooking();

});

    // Get the booking result elements.
    const resultSection = document.getElementById("resultSection");
    const bookingResult = document.getElementById("bookingResult");

    // Hide and clear the previous booking summary.
    function clearBookingResult() {
        resultSection.hidden = true;
        bookingResult.replaceChildren();
    }

    // Clear results when the Reset button is clicked.
    bookingForm.addEventListener("reset", function () {
        clearBookingResult();
    });

    // Hide outdated results when customer changes inputs.
    bookingForm.addEventListener("input", function () {
        clearBookingResult();
    });

    bookingForm.addEventListener("change", function () {
        clearBookingResult();
    });


    }

});

function validateForm() {

    // Read input values using DOM.
    const customerName = document.getElementById("customerName").value.trim();

    const customerEmail = document.getElementById("customerEmail").value.trim();

    const selectedPackage = document.getElementById("package").value;

    const quantityInput = document.getElementById("quantity").value.trim();

    // 1. Validate customer name.
    if (customerName === "") {
        alert("Please enter your full name.");
        document.getElementById("customerName").focus();
        return false;
    }

    // 2. Validate email address.
    if (customerEmail === "") {
        alert("Please enter your email address.");
        document.getElementById("customerEmail").focus();
        return false;
    }

    // Basic email format validation.
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(customerEmail)) {
        alert("Please enter a valid email address.");
        document.getElementById("customerEmail").focus();
        return false;
    }

    // 3. Validate equipment package.
    const validPackages = ["120", "250", "450"];

    if (!validPackages.includes(selectedPackage)) {
        alert("Please select an equipment package.");
        document.getElementById("package").focus();
        return false;
    }

    // 4. Validate quantity.
    if (quantityInput === "") {
        alert("Please enter the equipment quantity.");
        document.getElementById("quantity").focus();
        return false;
    }

    const quantity = Number(quantityInput);

    if (
        !Number.isInteger(quantity) ||
        quantity < 1 ||
        quantity > 10
    ) {
        alert("Quantity must be a whole number between 1 and 10.");
        document.getElementById("quantity").focus();
        return false;
    }

    // All validation checks passed.
    return true;
}

function calculateBooking() {

    // Read customer information.
    const customerName = document.getElementById("customerName").value.trim();
    const customerEmail = document.getElementById("customerEmail").value.trim();

    // Read selected package and quantity.
    const packageSelect = document.getElementById("package");
    const packagePrice = Number(packageSelect.value);

    const packageNames = {
        120: "AX-01 Initiate",
        250: "AX-02 Sentinel",
        450: "AX-03 Vanguard"
    };

    const packageName = packageNames[packagePrice];

    const quantity = Number(
        document.getElementById("quantity").value
    );

    // Read optional upgrades.
    const arcBooster = document.getElementById("arcBooster");
    const aiAssistant = document.getElementById("aiAssistant");

    let extrasPrice = 0;
    const selectedExtras = [];

    if (arcBooster.checked) {
        extrasPrice += Number(arcBooster.value);
        selectedExtras.push("Arc Power Booster");
    }

    if (aiAssistant.checked) {
        extrasPrice += Number(aiAssistant.value);
        selectedExtras.push("AI Tactical Assistant");
    }

    // Calculate booking costs.
    const packageSubtotal = packagePrice * quantity;
    const extrasSubtotal = extrasPrice * quantity;
    const grandTotal = packageSubtotal + extrasSubtotal;

    // Get the result elements.
    const resultSection = document.getElementById("resultSection");
    const bookingResult = document.getElementById("bookingResult");

    // Clear previous results.
    bookingResult.replaceChildren();

    // Helper function to create a safe result row.
    function addResultRow(label, value) {
        const paragraph = document.createElement("p");
        const strong = document.createElement("strong");

        strong.textContent = label + ": ";
        paragraph.appendChild(strong);
        paragraph.appendChild(document.createTextNode(value));

        bookingResult.appendChild(paragraph);
    }

    // Display customer and booking details.
    addResultRow("Customer Name", customerName);
    addResultRow("Email Address", customerEmail);
    addResultRow("Equipment Package", packageName);
    addResultRow("Quantity", quantity + " set(s)");

    addResultRow(
        "Optional Upgrades",
        selectedExtras.length > 0
            ? selectedExtras.join(", ")
            : "None"
    );

    // Display calculation breakdown.
    addResultRow(
        "Package Subtotal",
        "RM " + packageSubtotal.toFixed(2)
    );

    addResultRow(
        "Extras Subtotal",
        "RM " + extrasSubtotal.toFixed(2)
    );

    // Display grand total.
    const totalHeading = document.createElement("h3");
    totalHeading.textContent =
        "Grand Total: RM " + grandTotal.toFixed(2);

    bookingResult.appendChild(totalHeading);

    // Make the result section visible.
    resultSection.hidden = false;

    // Scroll to the result.
    resultSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

    // Give user feedback.
    alert("Booking calculation completed successfully!");

}