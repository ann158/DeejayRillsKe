// =========================
// EGEKABU THUMBNAILS (clickable)
// =========================
const thumbnails = document.querySelectorAll(".thumbnail-link");

thumbnails.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault(); // prevent default if using modal before
    const url = link.getAttribute("href");
    window.open(url, "_blank"); // open in new tab
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
    hiddenGallery.style.display = "grid"; // show the hidden gallery
    viewMoreBtn.textContent = "View Less";
  } else {
    hiddenGallery.style.display = "none"; // hide it again
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
fadeOnScroll(); // trigger on load

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