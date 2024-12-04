// Cursor elements
const cursor = document.querySelector('.cursor');
const cursorOutline = document.querySelector('.cursor-outline');

// Helper function for smoother cursor movement
let lastX = 0;
let lastY = 0;

function updateCursorPosition(x, y) {
    // Using requestAnimationFrame for smooth updates
    window.requestAnimationFrame(() => {
        cursor.style.left = `${x}px`;
        cursor.style.top = `${y}px`;
        cursorOutline.style.left = `${x}px`;
        cursorOutline.style.top = `${y}px`;
    });
}

// Cursor Movement
document.addEventListener('mousemove', (e) => {
    const { pageX: x, pageY: y } = e;

    // Update cursor position only if it has moved
    if (Math.abs(x - lastX) > 1 || Math.abs(y - lastY) > 1) {
        lastX = x;
        lastY = y;
        updateCursorPosition(x, y);
    }
});

// Handle Hover Animations for links and buttons
document.querySelectorAll('a, button').forEach((el) => {
    el.addEventListener('mouseenter', () => {
        cursorOutline.style.transform = 'translate(-50%, -50%) scale(2.2)';
        cursorOutline.style.opacity = '0.8';
    });

    el.addEventListener('mouseleave', () => {
        cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.2)';
        cursorOutline.style.opacity = '0.6';
    });
});

// Section Reveal on Scroll
const sections = document.querySelectorAll('section');

const revealOnScroll = () => {
    const triggerHeight = window.innerHeight * 0.8;
    sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop < triggerHeight) {
            section.classList.add('show');
        } else {
            section.classList.remove('show');
        }
    });
};

// Listen for Scroll
window.addEventListener('scroll', revealOnScroll);

// Trigger on Page Load
revealOnScroll();

// Theme Toggle Functionality
const themeToggleButton = document.getElementById('theme-toggle');
const body = document.body;

// Check the initial theme stored in localStorage
if (localStorage.getItem('theme') === 'light') {
    body.classList.add('light-mode');
    themeToggleButton.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggleButton.setAttribute("data-tooltip", "Toggle to Dark Mode");
    cursor.style.backgroundColor = '#121212';
    cursorOutline.style.borderColor = '#121212';
} else {
    body.classList.add('dark-mode');
    themeToggleButton.innerHTML = '<i class="fas fa-sun"></i>';
    themeToggleButton.setAttribute("data-tooltip", "Toggle to Light Mode");
    cursor.style.backgroundColor = '#00ffcc';
    cursorOutline.style.borderColor = '#00ffcc';
}

// Toggle theme when the button is clicked
themeToggleButton.addEventListener('click', () => {
    if (body.classList.contains('light-mode')) {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        themeToggleButton.innerHTML = '<i class="fas fa-sun"></i>';
        themeToggleButton.setAttribute("data-tooltip", "Toggle to Light Mode");
        localStorage.setItem('theme', 'dark');
        cursor.style.backgroundColor = '#00ffcc';
        cursorOutline.style.borderColor = '#00ffcc';
    } else {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        themeToggleButton.innerHTML = '<i class="fas fa-moon"></i>';
        themeToggleButton.setAttribute("data-tooltip", "Toggle to Dark Mode");
        localStorage.setItem('theme', 'light');
        cursor.style.backgroundColor = '#121212';
        cursorOutline.style.borderColor = '#121212';
    }
});

// Navbar hide/show on scroll
let lastScrollY = window.scrollY;
const navbarHeader = document.querySelector('header');

// Listen for the scroll event
window.addEventListener('scroll', () => {
    if (window.scrollY > lastScrollY) {
        navbarHeader.classList.add('hidden'); // Hide navbar when scrolling down
    } else {
        navbarHeader.classList.remove('hidden'); // Show navbar when scrolling up
    }
    lastScrollY = window.scrollY;
});

document.addEventListener("DOMContentLoaded", function () {
    let slideIndex = 0;
    const slides = document.querySelectorAll(".slide");

    function showSlides() {
        // Hide all slides
        slides.forEach((slide) => {
            slide.style.display = "none"; // Hide all slides
        });

        // Increment slide index
        slideIndex++;
        if (slideIndex >= slides.length) {
            slideIndex = 0; // Reset to the first slide
        }

        // Display the current slide
        slides[slideIndex].style.display = "block";

        // Set a timer for the next slide
        setTimeout(showSlides, 5000); // Change slide every 5 seconds
    }

    showSlides(); // Initialize the slideshow
});
const audio = document.getElementById("background-audio");
const audioControlBtn = document.getElementById("audio-control-btn");
const audioIcon = audioControlBtn.querySelector("i");

// Enable autoplay by starting muted and unmuting when the button is clicked
audio.play().catch(() => {
    // Catch autoplay rejection and handle it gracefully
    console.log("Autoplay blocked by browser; will require user interaction to start audio.");
});

audioControlBtn.addEventListener("click", () => {
    if (audio.muted) {
        audio.muted = false; // Unmute the audio
        audioIcon.classList.replace("fa-volume-mute", "fa-volume-up");
    } else {
        audio.muted = true; // Mute the audio
        audioIcon.classList.replace("fa-volume-up", "fa-volume-mute");
    }
});

// Ensure the page starts at the home section on reload
document.addEventListener("DOMContentLoaded", function () {
    // Remove any existing hash to reset scroll position
    window.location.hash = "";
    // Set the hash to home after reset
    setTimeout(() => {
        window.location.hash = "#home";
    }, 0); // Small delay to ensure it sets after the page loads
});


