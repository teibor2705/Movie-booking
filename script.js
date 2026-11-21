// Variables to store booking details
let currentMovie = "";
let ticketPrice = 200;
let selectedSeats = [];

// Pre-occupied seats for demonstration
const occupiedSeats = ["A3", "A4", "B2", "C5", "D1"];

// Set today's date as default when the page loads
window.onload = function () {
    const today = new Date().toISOString().split("T")[0];
    document.getElementById("show-date").value = today;
};


// STEP 1: Select a movie
function selectMovie(movieName, price) {
    currentMovie = movieName;
    ticketPrice = price;
    selectedSeats = [];

    document.getElementById("selected-movie-title").innerText = movieName;

    document.getElementById("movie-section").classList.add("hidden");
    document.getElementById("seat-section").classList.remove("hidden");

    createSeats();
    updateSeatSummary();
}


// Create 4 rows (A to D) with 6 seats each
function createSeats() {
    const seatGrid = document.getElementById("seat-grid");
    seatGrid.innerHTML = "";

    const rows = ["A", "B", "C", "D"];
    const cols = 6;

    for (let i = 0; i < rows.length; i++) {
        for (let j = 1; j <= cols; j++) {

            const seatId = rows[i] + j;
            const seatDiv = document.createElement("div");

            seatDiv.classList.add("seat");
            seatDiv.innerText = seatId;

            // Check if seat is already occupied
            if (occupiedSeats.includes(seatId)) {
                seatDiv.classList.add("occupied");
            } else {
                seatDiv.onclick = function () {
                    toggleSeat(seatDiv, seatId);
                };
            }

            seatGrid.appendChild(seatDiv);
        }
    }
}


// Select or deselect a seat
function toggleSeat(seatElement, seatId) {

    if (selectedSeats.includes(seatId)) {

        selectedSeats = selectedSeats.filter(function (seat) {
            return seat !== seatId;
        });

        seatElement.classList.remove("selected");

    } else {

        selectedSeats.push(seatId);
        seatElement.classList.add("selected");
    }

    updateSeatSummary();
}


// Update live seat count and total price
function updateSeatSummary() {

    const seatsText = document.getElementById("selected-seats-text");
    const countText = document.getElementById("ticket-count");
    const priceText = document.getElementById("total-price");

    if (selectedSeats.length === 0) {
        seatsText.innerText = "None";
    } else {
        seatsText.innerText = selectedSeats.join(", ");
    }

    countText.innerText = selectedSeats.length;
    priceText.innerText = selectedSeats.length * ticketPrice;
}


// STEP 2: Move from seat selection to checkout
function goToCheckout() {

    if (selectedSeats.length === 0) {
        alert("Please select at least one seat before proceeding.");
        return;
    }

    const date = document.getElementById("show-date").value;
    const time = document.getElementById("show-time").value;

    if (!date) {
        alert("Please select a valid date.");
        return;
    }

    // Fill checkout summary
    document.getElementById("summary-movie").innerText = currentMovie;
    document.getElementById("summary-datetime").innerText = date + " at " + time;
    document.getElementById("summary-seats").innerText = selectedSeats.join(", ");
    document.getElementById("summary-amount").innerText = selectedSeats.length * ticketPrice;

    document.getElementById("seat-section").classList.add("hidden");
    document.getElementById("checkout-section").classList.remove("hidden");
}


// STEP 3: Open GPay payment after entering customer details
function confirmBooking(event) {

    event.preventDefault();

    const name = document.getElementById("customer-name").value;
    const phone = document.getElementById("customer-phone").value;

    // Store customer details
    document.getElementById("ticket-name").innerText = name;
    document.getElementById("ticket-phone").innerText = phone;

    // Calculate payment amount
    const amount = selectedSeats.length * ticketPrice;

    document.getElementById("payment-amount").innerText = amount;

    // Open payment section
    document.getElementById("checkout-section").classList.add("hidden");
    document.getElementById("payment-section").classList.remove("hidden");
}


// STEP 4: Complete payment and generate ticket
function completePayment() {

    const payment = document.getElementById("payment-method").value;
    const date = document.getElementById("show-date").value;
    const time = document.getElementById("show-time").value;

    // Generate random 4-digit Booking ID
    const randomId = Math.floor(1000 + Math.random() * 9000);

    // Fill final ticket details
    document.getElementById("ticket-id").innerText = "CB" + randomId;
    document.getElementById("ticket-movie").innerText = currentMovie;
    document.getElementById("ticket-datetime").innerText = date + " at " + time;
    document.getElementById("ticket-seats").innerText = selectedSeats.join(", ");
    document.getElementById("ticket-payment").innerText = payment;
    document.getElementById("ticket-amount").innerText = selectedSeats.length * ticketPrice;

    // Switch to confirmation page
    document.getElementById("payment-section").classList.add("hidden");
    document.getElementById("ticket-section").classList.remove("hidden");
}


// NAVIGATION FUNCTIONS

// Go back to movie selection
function goBackToMovies() {

    document.getElementById("seat-section").classList.add("hidden");
    document.getElementById("movie-section").classList.remove("hidden");
}


// Go back to seat selection
function goBackToSeats() {

    document.getElementById("checkout-section").classList.add("hidden");
    document.getElementById("seat-section").classList.remove("hidden");
}


// Go back to checkout from GPay
function goBackToCheckout() {

    document.getElementById("payment-section").classList.add("hidden");
    document.getElementById("checkout-section").classList.remove("hidden");
}


// Reset application and book another ticket
function resetApp() {

    document.getElementById("checkout-form").reset();

    selectedSeats = [];
    currentMovie = "";
    ticketPrice = 200;

    document.getElementById("ticket-section").classList.add("hidden");
    document.getElementById("movie-section").classList.remove("hidden");

    updateSeatSummary();
}