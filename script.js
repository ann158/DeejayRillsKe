// =========================
// HAMBURGER MENU
// =========================
const hamburger = document.getElementById("hamburger");
const topNav = document.getElementById("top-nav");

hamburger.addEventListener("click", () => {
  topNav.classList.toggle("open");
  hamburger.classList.toggle("open");
});

// Close menu when a nav link is clicked
topNav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    topNav.classList.remove("open");
    hamburger.classList.remove("open");
  });
});

// =========================
// EGEKABU THUMBNAILS (clickable)
// =========================
const thumbnails = document.querySelectorAll(".thumbnail-link");

thumbnails.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const url = link.getAttribute("href");
    window.open(url, "_blank");
  });
});

// =========================
// VIEW MORE / VIEW LESS GALLERY
// =========================
const viewMoreBtn = document.getElementById("view-more-btn");
const hiddenGallery = document.getElementById("hidden-gallery");

viewMoreBtn.addEventListener("click", () => {
  hiddenGallery.classList.toggle("visible");
  if (hiddenGallery.classList.contains("visible")) {
    hiddenGallery.style.display = "grid";
    viewMoreBtn.textContent = "View Less";
  } else {
    hiddenGallery.style.display = "none";
    viewMoreBtn.textContent = "View More";
  }
});

// =========================
// FADE-UP ANIMATION ON SCROLL
// =========================
const fadeElems = document.querySelectorAll(".fade-up");

const fadeOnScroll = () => {
  const triggerBottom = window.innerHeight * 0.85;
  fadeElems.forEach(elem => {
    const top = elem.getBoundingClientRect().top;
    if (top < triggerBottom) {
      elem.classList.add("visible");
    } else {
      elem.classList.remove("visible");
    }
  });
};

window.addEventListener("scroll", fadeOnScroll);
fadeOnScroll();

// =========================
// TESTIMONIALS SLIDER
// =========================
let testimonialIndex = 0;
const testimonials = document.querySelectorAll(".testimonial");
const prevBtn = document.querySelector(".testimonial-nav .prev");
const nextBtn = document.querySelector(".testimonial-nav .next");

const showTestimonial = index => {
  testimonials.forEach((t, i) => {
    t.style.display = i === index ? "block" : "none";
  });
};

showTestimonial(testimonialIndex);

prevBtn.addEventListener("click", () => {
  testimonialIndex = (testimonialIndex - 1 + testimonials.length) % testimonials.length;
  showTestimonial(testimonialIndex);
});

nextBtn.addEventListener("click", () => {
  testimonialIndex = (testimonialIndex + 1) % testimonials.length;
  showTestimonial(testimonialIndex);
});

// Auto-advance testimonials every 5 seconds
setInterval(() => {
  testimonialIndex = (testimonialIndex + 1) % testimonials.length;
  showTestimonial(testimonialIndex);
}, 5000);

// =========================
// CONTACT FORM FEEDBACK
// =========================
const contactForm = document.querySelector(".contact-panel");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    const btn = contactForm.querySelector("button[type=submit]");
    btn.textContent = "Sending...";
    btn.disabled = true;
    // Formspree handles submission — re-enable after 3s as fallback
    setTimeout(() => {
      btn.textContent = "Send Message";
      btn.disabled = false;
    }, 3000);
  });
}