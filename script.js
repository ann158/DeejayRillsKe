// =========================
// PRELOADER
// =========================
const preloader = document.createElement('div');
preloader.id = 'preloader';
preloader.style.cssText = `
  position: fixed;
  top:0; left:0; width:100%; height:100%;
  background:#fff;
  display:flex;
  justify-content:center;
  align-items:center;
  z-index:2000;
`;
preloader.innerHTML = '<div style="width:50px;height:50px;border:5px solid #b58e20;border-top:5px solid #fff;border-radius:50%;animation:spin 1s linear infinite;"></div>';
document.body.appendChild(preloader);

window.addEventListener('load', () => {
  preloader.style.opacity = '0';
  setTimeout(() => preloader.remove(), 500);
});

const style = document.createElement('style');
style.innerHTML = `@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`;
document.head.appendChild(style);

// =========================
// SMOOTH SCROLL
// =========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

// =========================
// FADE-UP ANIMATION ON SCROLL
// =========================
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

// =========================
// TESTIMONIAL SLIDER (Optional)
// =========================
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
let testimonialInterval;

function showTestimonial(index) {
  testimonials.forEach((t,i) => {
    t.style.opacity = 0;
    t.style.display = 'none';
    if(i === index) {
      t.style.display = 'block';
      setTimeout(()=> t.style.opacity=1,20);
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

if(testimonials.length > 0){
  showTestimonial(currentTestimonial);
  if(nextBtn && prevBtn){
    nextBtn.addEventListener('click', nextTestimonial);
    prevBtn.addEventListener('click', prevTestimonialFunc);
  }
  testimonialInterval = setInterval(nextTestimonial,6000);
  const slider = document.querySelector('.testimonial-slider');
  if(slider){
    slider.addEventListener('mouseenter',()=> clearInterval(testimonialInterval));
    slider.addEventListener('mouseleave',()=> testimonialInterval = setInterval(nextTestimonial,6000));
  }
}

// =========================
// CARD & BUTTON HOVER EFFECTS (Subtle Professional Touch)
// =========================
const hoverScale = (selector, scale=1.03) => {
  document.querySelectorAll(selector).forEach(el => {
    el.addEventListener('mouseenter', ()=> el.style.transform = `scale(${scale})`);
    el.addEventListener('mouseleave', ()=> el.style.transform = 'scale(1)');
    el.style.transition = 'transform 0.3s ease';
  });
};

hoverScale('.mix-card');
hoverScale('.card');
hoverScale('.btn-gold',1.05);
hoverScale('.btn-outline',1.05);

// =========================
// OPTIONAL: Lazy-load YouTube Iframes for Faster Load
// =========================
document.querySelectorAll('iframe').forEach(iframe => {
  iframe.loading = 'lazy';
});