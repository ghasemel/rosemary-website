/**
 * RosaFinance Website - Minimal JavaScript
 * Apple-style interactions and animations
 */

// =============================================
// Intersection Observer for Scroll Animations
// =============================================
const observeElements = () => {
  const features = document.querySelectorAll('.feature');

  const observerOptions = {
    root: null,
    threshold: 0.2,
    rootMargin: '0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  features.forEach(feature => {
    observer.observe(feature);
  });
};

// =============================================
// Video Play on Scroll - Play videos when visible
// =============================================
const observeVideos = () => {
  const videos = document.querySelectorAll('video');

  // Pause all videos initially (except hero which should autoplay)
  videos.forEach(video => {
    // Check if it's not the hero video
    if (!video.closest('.hero-rosa-circle')) {
      video.pause();
    }
  });

  const videoObserverOptions = {
    root: null,
    threshold: 0.5,
    rootMargin: '0px'
  };

  const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const video = entry.target;
      if (entry.isIntersecting) {
        video.play();
      } else {
        video.pause();
        // Optionally reset to start when out of view
        // video.currentTime = 0;
      }
    });
  }, videoObserverOptions);

  videos.forEach(video => {
    videoObserver.observe(video);
  });
};

// =============================================
// Email Signup Form Handler - Web3Forms Integration
// =============================================
const handleEmailSignup = () => {
  const form = document.getElementById('emailForm');
  const emailInput = form.querySelector('.email-input');
  const messageDiv = document.getElementById('emailMessage');
  const submitButton = form.querySelector('.email-submit');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      showMessage('Please enter a valid email address', 'error');
      return;
    }

    // Disable submit button and show loading state
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';

    try {
      // Prepare form data
      const formData = new FormData(form);

      // Submit to Web3Forms
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        showMessage('Thanks! We\'ll notify you when RosaFinance launches.', 'success');
        emailInput.value = '';
      } else {
        showMessage('Something went wrong. Please try again.', 'error');
      }
    } catch (error) {
      showMessage('Something went wrong. Please try again.', 'error');
      console.error('Form submission error:', error);
    } finally {
      // Re-enable submit button
      submitButton.disabled = false;
      submitButton.textContent = 'Get notified';
    }
  });

  function showMessage(text, type) {
    messageDiv.textContent = text;
    messageDiv.className = `email-message ${type}`;

    // Clear message after 5 seconds
    setTimeout(() => {
      messageDiv.textContent = '';
      messageDiv.className = 'email-message';
    }, 5000);
  }
};

// =============================================
// Smooth Scroll for Nav Links
// =============================================
const smoothScrolling = () => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');

      // Don't prevent default for placeholder links (#)
      if (href === '#') return;

      e.preventDefault();
      const target = document.querySelector(href);

      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
};

// =============================================
// Gallery Horizontal Scroll Enhancement
// =============================================
const enhanceGallery = () => {
  const gallery = document.querySelector('.gallery-scroll');

  if (!gallery) return;

  // Enable smooth scroll snap behavior
  gallery.style.scrollBehavior = 'smooth';

  // Optional: Add touch/drag scrolling for desktop
  let isDown = false;
  let startX;
  let scrollLeft;

  gallery.addEventListener('mousedown', (e) => {
    isDown = true;
    gallery.style.cursor = 'grabbing';
    startX = e.pageX - gallery.offsetLeft;
    scrollLeft = gallery.scrollLeft;
  });

  gallery.addEventListener('mouseleave', () => {
    isDown = false;
    gallery.style.cursor = 'grab';
  });

  gallery.addEventListener('mouseup', () => {
    isDown = false;
    gallery.style.cursor = 'grab';
  });

  gallery.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - gallery.offsetLeft;
    const walk = (x - startX) * 2;
    gallery.scrollLeft = scrollLeft - walk;
  });
};

// =============================================
// Nav Scroll Effect
// =============================================
const handleNavScroll = () => {
  const nav = document.querySelector('.nav');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
  });
};

// =============================================
// Initialize All Functions on DOM Load
// =============================================
document.addEventListener('DOMContentLoaded', () => {
  observeElements();
  observeVideos();
  handleEmailSignup();
  smoothScrolling();
  enhanceGallery();
  handleNavScroll();
  initTranslationCarousel();
});

// =============================================
// Translation Carousel with Flickity
// =============================================
const initTranslationCarousel = () => {
  // Flickity initializes automatically from data-flickity attribute
  // No JavaScript needed!
  console.log('Flickity carousel initialized via data attribute');
};

// =============================================
// Lazy Load Images (Already handled by loading="lazy" in HTML)
// =============================================
// Modern browsers support native lazy loading with loading="lazy" attribute
// No additional JavaScript needed
