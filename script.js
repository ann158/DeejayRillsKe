// ===== Smooth Scroll =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

// ===== Fade-up on Scroll =====
const fadeElements = document.querySelectorAll('.fade-up');
const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

fadeElements.forEach(el => fadeObserver.observe(el));

// ===== Testimonials Slider =====
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
let testimonialInterval;

// Show testimonial with fade
function showTestimonial(index) {
  testimonials.forEach((t, i) => {
    t.style.opacity = 0;
    t.style.transition = 'opacity 0.5s';
    t.style.display = 'none';
    if (i === index) {
      t.style.display = 'block';
      setTimeout(() => t.style.opacity = 1, 20);
    }
  });
}

function nextTestimonial() {
  currentTestimonial = (currentTestimonial + 1) % testimonials.length;
  showTestimonial(currentTestimonial);
}

function prevTestimonialFunc() {
  currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
  showTestimonial(currentTestimonial);
}

// Initialize
showTestimonial(currentTestimonial);

// Buttons
if (nextBtn && prevBtn) {
  nextBtn.addEventListener('click', nextTestimonial);
  prevBtn.addEventListener('click', prevTestimonialFunc);
}

// Auto slide every 6 seconds
testimonialInterval = setInterval(nextTestimonial, 6000);

// Pause auto-slide on hover
const slider = document.querySelector('.testimonial-slider');
if (slider) {
  slider.addEventListener('mouseenter', () => clearInterval(testimonialInterval));
  slider.addEventListener('mouseleave', () => testimonialInterval = setInterval(nextTestimonial, 6000));
}
