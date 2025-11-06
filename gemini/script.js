/**
 * Core JavaScript for Navigation and Interactivity
 */

// =======================================
// STATE & VARIABLES
// =======================================
let currentPage = 1; // Start on page 1
const totalPages = 6;
const pages = document.querySelectorAll('.page');
const navButtons = document.querySelectorAll('.nav-button');

// Page 3 Interaction Elements
const heartTrigger = document.getElementById('heart-trigger');
const nextButton3 = document.getElementById('next-3');

// =======================================
// NAVIGATION LOGIC
// =======================================

/**
 * Hides all pages and shows the one specified by the index.
 * @param {number} index - The page number to show (1 to 6).
 */
function showPage(index) {
    if (index < 1 || index > totalPages) return; // Boundary check

    // 1. Hide all pages and remove animation classes
    pages.forEach(page => {
        page.classList.add('hidden');
        // Optional: Reset animations here if needed, e.g., remove specific animation classes
    });

    // 2. Show the target page
    const targetPage = document.getElementById(`page-${index}`);
    if (targetPage) {
        targetPage.classList.remove('hidden');
        // Optional: Re-apply base animation class to trigger it on transition
        // targetPage.classList.add('fade-in-slow');
    }

    currentPage = index;

    // Special check for Page 3 state upon navigation
    if (currentPage === 3) {
        // Re-check if the heart is already filled when coming back or forward
        if (heartTrigger.classList.contains('filled-heart')) {
            nextButton3.classList.remove('disabled');
        } else {
            nextButton3.classList.add('disabled');
        }
    }
}

// Event listener for all navigation buttons (Next and Back)
navButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (button.classList.contains('disabled')) return; // Prevent clicking disabled buttons
        
        const targetIndex = parseInt(button.getAttribute('data-target'));
        if (!isNaN(targetIndex)) {
            showPage(targetIndex);
        }
    });
});

// =======================================
// PAGE 3: INTERACTIVE HEART LOGIC
// =======================================

if (heartTrigger && nextButton3) {
    heartTrigger.addEventListener('click', () => {
        // 1. Change the button appearance to a heart
        heartTrigger.textContent = '♥';
        heartTrigger.classList.add('filled-heart');
        heartTrigger.style.cursor = 'default';

        // 2. Enable the 'Next' button
        nextButton3.classList.remove('disabled');

        // 3. Optional: Add a subtle animation to the filled heart
        heartTrigger.style.animation = 'pulse 1s 3 ease-in-out'; // Pulses 3 times
    });
}

// Initialize the app on page 1
document.addEventListener('DOMContentLoaded', () => {
    showPage(1);
});