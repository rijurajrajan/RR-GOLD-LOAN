let dashboardChart = null;

/**
 * Toggles the collapsed state of the sidebar.
 */
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  if (sidebar) sidebar.classList.toggle('collapsed');
}

/**
 * Initializes all sidebar-related functionality.
 */
(function() {
  // Attach listener to the hamburger menu button
  const toggleBtn = document.querySelector('.toggle-btn');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', toggleSidebar);
  }

  // Attach listener to the main content overlay for closing the sidebar
  const overlay = document.getElementById('mainOverlay');
  const sidebar = document.getElementById('sidebar');
  if (overlay && sidebar) {
    overlay.addEventListener('click', () => {
      sidebar.classList.add('collapsed');
    });
  }
})();




/**
 * Shows a toast notification message.
 * @param {string} message The message to display.
 * @param {string} type The type of toast ('success', 'error', 'info').
 */
function showToast(message, type = 'success') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast-message ${type}`;

  let iconClass = 'bi-check-circle-fill';
  if (type === 'error') iconClass = 'bi-x-circle-fill';
  else if (type === 'info') iconClass = 'bi-info-circle-fill';

  toast.innerHTML = `<i class="bi ${iconClass}"></i><span>${message}</span>`;

  container.appendChild(toast);

  // Scroll container to show latest toast
  container.scrollTop = container.scrollHeight;

  // Animate in
  setTimeout(() => toast.classList.add('show'), 100);

  // Animate out and remove after 4 seconds
  setTimeout(() => {
    toast.classList.remove('show');
    toast.addEventListener('transitionend', () => toast.remove());
  }, 4000);
}

/**
 * Handles the Login/Register form toggle functionality.
 */
if (document.getElementById('loginForm')) {
  const loginToggleBtn = document.getElementById('loginToggleBtn');
  const registerToggleBtn = document.getElementById('registerToggleBtn');
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const forgotPasswordLink = document.getElementById('forgotPasswordLink');

  const showLogin = () => {
    loginForm.classList.remove('d-none');
    registerForm.classList.add('d-none');
    loginToggleBtn.classList.add('btn-warning');
    loginToggleBtn.classList.remove('btn-outline-warning');
    registerToggleBtn.classList.add('btn-outline-light');
    registerToggleBtn.classList.remove('btn-light');
  };

  const showRegister = () => {
    registerForm.classList.remove('d-none');
    loginForm.classList.add('d-none');
    registerToggleBtn.classList.add('btn-light');
    registerToggleBtn.classList.remove('btn-outline-light');
    loginToggleBtn.classList.add('btn-outline-warning');
    loginToggleBtn.classList.remove('btn-warning');
  };

  loginToggleBtn.addEventListener('click', showLogin);
  registerToggleBtn.addEventListener('click', showRegister);

  showLogin();

  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();
    window.location.href = 'dashboard.html';
  });

  registerForm.addEventListener('submit', function (e) {
    e.preventDefault();
    showToast("Registration successful! Please login.");
    showLogin();
  });

  if (forgotPasswordLink) {
    forgotPasswordLink.addEventListener('click', function(e) {
      e.preventDefault();
      showToast('Password reset instructions have been sent to your email.', 'info');
    });
  }
}

/**
 * Handles the Enquiry form submission on the dashboard.
 */
if (document.getElementById('enquiryForm')) {
  const enquiryForm = document.getElementById('enquiryForm');
  enquiryForm.addEventListener('submit', function(e) {
    e.preventDefault();
    showToast('Enquiry submitted successfully!', 'success');
    enquiryForm.reset(); // Clear the form fields
  });
}

/**
 * Image Slider Functionality for dashboard.html
 */
let slideIndex = 1;
let slideInterval;

function showSlides(n) {
  const slides = document.getElementsByClassName("slide");
  const dots = document.getElementsByClassName("dot");
  if (!slides.length) return;

  if (n > slides.length) slideIndex = 1;
  if (n < 1) slideIndex = slides.length;

  const slidesContainer = document.querySelector('.slides');
  if (slidesContainer) {
    slidesContainer.style.transform = `translateX(-${(slideIndex - 1) * 100}%)`;
  }

  for (let i = 0; i < dots.length; i++) {
    dots[i].classList.remove("active");
  }
  if (dots[slideIndex - 1]) dots[slideIndex - 1].classList.add("active");
}

function moveSlide(n) {
  slideIndex += n;
  showSlides(slideIndex);
  resetSliderInterval();
}

function currentSlide(n) {
  slideIndex = n;
  showSlides(slideIndex);
  resetSliderInterval();
}

function startAutoSlider() {
  slideInterval = setInterval(() => {
    slideIndex++;
    showSlides(slideIndex);
  }, 5000);
}

function resetSliderInterval() {
  clearInterval(slideInterval);
  startAutoSlider();
}

/**
 * Initializes the image slider functionality.
 */
(function() {
  const sliderContainer = document.querySelector('.slider-container');
  if (!sliderContainer) return;

  const prevBtn = sliderContainer.querySelector('.prev-btn');
  const nextBtn = sliderContainer.querySelector('.next-btn');
  const dots = sliderContainer.querySelectorAll('.dot');

  if (prevBtn) prevBtn.addEventListener('click', () => moveSlide(-1));
  if (nextBtn) nextBtn.addEventListener('click', () => moveSlide(1));

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => currentSlide(index + 1));
  });

  showSlides(slideIndex); // Show the initial slide
  startAutoSlider(); // Start the automatic sliding
})();

/**
 * Handles the interactive FAQ section on the loans page.
 */
(function() {
  const faqQuestions = document.querySelectorAll('.faq-question');
  if (!faqQuestions.length) return;

  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const parentItem = question.closest('.faq-item');
      document.querySelectorAll('.faq-item').forEach(item => {
        if (item !== parentItem && item.classList.contains('active')) {
          item.classList.remove('active');
        }
      });

      parentItem.classList.toggle('active');
    });
  });
})();

/**
 * Handles the "Back to Top" button functionality.
 */
(function() {
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (!backToTopBtn) return;

  // The main scrollable container is `.main` on most pages.
  // On the login page (`index.html`), it's the `window`.
  const scrollableContainer = document.querySelector('.main') || window;
  
  // The element to check `scrollTop` on is different for `window`.
  const scrollPositionSource = document.querySelector('.main') || document.documentElement;

  const handleScroll = () => {
    if (scrollPositionSource.scrollTop > 300) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  };

  const scrollToTop = () => {
    // `scrollTo` is a method on both `window` and DOM elements.
    scrollableContainer.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  scrollableContainer.addEventListener('scroll', handleScroll);
  backToTopBtn.addEventListener('click', scrollToTop);
})();

/**
 * Handles the video modal functionality on the media page.
 */
function initVideoModal() {
  const videoCards = document.querySelectorAll('.video-card');
  const modal = document.getElementById('videoModal');
  const closeModalBtn = document.getElementById('closeVideoModal');
  const videoPlayerContainer = document.getElementById('videoPlayerContainer');

  if (!modal || !videoCards.length) return;

  const openModal = (videoId) => {
    videoPlayerContainer.innerHTML = `
      <iframe 
        src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1" 
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen>
      </iframe>`;
    modal.classList.add('show');
    document.body.classList.add('modal-open');
  };

  const closeModal = () => {
    modal.classList.remove('show');
    document.body.classList.remove('modal-open');
    // Stop the video by removing the iframe
    videoPlayerContainer.innerHTML = '';
  };

  videoCards.forEach(card => {
    card.addEventListener('click', () => {
      const videoId = card.dataset.videoId;
      if (videoId) {
        openModal(videoId);
      }
    });
  });

  closeModalBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) { // Close if clicking on the overlay itself
      closeModal();
    }
  });
}

// Initialize video modal if on the media page
if (document.querySelector('.media-page')) {
  initVideoModal();
}

/**
 * Handles filtering and "Load More" functionality for the news page.
 */
function initNewsPage() {
  const searchInput = document.getElementById('newsSearchInput');
  const allArticles = Array.from(document.querySelectorAll('.news-article-card'));
  const noResultsMessage = document.getElementById('noNewsResults');
  const loadMoreBtn = document.getElementById('loadMoreBtn');
  const loadMoreContainer = document.getElementById('loadMoreContainer');
  const itemsPerLoad = 3; // Number of items to show per "load more" click
  let currentlyVisibleCount = 0;
  let filteredArticles = [];

  if (!allArticles.length || !loadMoreBtn || !loadMoreContainer) return;

  function displayMoreItems() {
    const nextItemsToShow = filteredArticles.slice(currentlyVisibleCount, currentlyVisibleCount + itemsPerLoad);
    nextItemsToShow.forEach(article => article.style.display = 'flex');
    currentlyVisibleCount += nextItemsToShow.length;

    // Hide "Load More" button if all items are visible
    if (currentlyVisibleCount >= filteredArticles.length) {
      loadMoreContainer.style.display = 'none';
    } else {
      loadMoreContainer.style.display = 'block';
    }
  }

  function handleUpdate() {
    const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : '';
    
    filteredArticles = allArticles.filter(article => {
      const title = article.querySelector('.news-title').textContent.toLowerCase();
      return title.includes(searchTerm);
    });

    // Hide all articles initially
    allArticles.forEach(article => article.style.display = 'none');
    currentlyVisibleCount = 0;

    if (noResultsMessage) {
      noResultsMessage.style.display = filteredArticles.length === 0 ? 'block' : 'none';
    }
    
    if (loadMoreContainer) {
        loadMoreContainer.style.display = filteredArticles.length > 0 ? 'block' : 'none';
    }

    displayMoreItems();
  }

  loadMoreBtn.addEventListener('click', displayMoreItems);

  if (searchInput) {
    searchInput.addEventListener('input', handleUpdate);
  }

  // Initial load
  handleUpdate();
}

// Initialize news page functionality (filter + load more)
if (document.querySelector('.news-page')) {
  initNewsPage();
}

/**
 * Handles the EMI Calculator widget on the loans page.
 */
function initEmiCalculator() {
  const calculateBtn = document.getElementById('calculateEmiBtn');
  if (!calculateBtn) return;

  const loanAmountInput = document.getElementById('loanAmount');
  const interestRateInput = document.getElementById('interestRate');
  const loanTenureInput = document.getElementById('loanTenure');
  const emiResultDiv = document.getElementById('emiResult');
  const emiValueSpan = document.getElementById('emiValue');

  calculateBtn.addEventListener('click', () => {
    const p = parseFloat(loanAmountInput.value);
    const annualRate = parseFloat(interestRateInput.value);
    const n = parseFloat(loanTenureInput.value); // Tenure in months

    if (isNaN(p) || isNaN(annualRate) || isNaN(n) || p <= 0 || annualRate <= 0 || n <= 0) {
      showToast('Please enter valid positive numbers for all fields.', 'error');
      return;
    }

    const r = annualRate / 12 / 100; // Monthly interest rate

    const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

    if (isFinite(emi)) {
      emiValueSpan.textContent = emi.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      emiResultDiv.style.display = 'block';
    } else {
      showToast('Could not calculate EMI. Please check your inputs.', 'error');
      emiResultDiv.style.display = 'none';
    }
  });
}

// Initialize EMI Calculator if it exists on the page
if (document.querySelector('.emi-calculator-card')) {
  initEmiCalculator();
}

/**
 * Handles filtering job listings on the careers page.
 */
function initCareersFilter() {
  const searchInput = document.getElementById('jobSearchInput');
  const jobCards = document.querySelectorAll('.job-card');
  const noResultsMessage = document.getElementById('noJobResults');

  if (!searchInput || !jobCards.length) return;

  searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase().trim();
    let visibleCount = 0;

    jobCards.forEach(card => {
      const title = card.querySelector('h3').textContent.toLowerCase();
      const location = card.querySelector('.job-location').textContent.toLowerCase();
      const isVisible = title.includes(searchTerm) || location.includes(searchTerm);

      // The job-card is a block element by default
      card.style.display = isVisible ? 'block' : 'none';

      if (isVisible) {
        visibleCount++;
      }
    });

    if (noResultsMessage) {
      noResultsMessage.style.display = visibleCount === 0 ? 'block' : 'none';
    }
  });
}

// Initialize careers filter if on the careers page
if (document.querySelector('.careers-page')) {
  initCareersFilter();
}

/**
 * Handles the contact form submission.
 */
if (document.getElementById('contactForm')) {
  const contactForm = document.getElementById('contactForm');
  const emailInput = document.getElementById('email');

  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // Email validation
    const email = emailInput.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showToast('Please enter a valid email address.', 'error');
      return; // Stop submission if email is invalid
    }

    showToast('Your message has been sent successfully!', 'success');
    contactForm.reset(); // Clear the form fields
  });
}

/**
 * Initializes the dashboard chart.
 */
function initDashboardChart(isDarkMode) {
  const ctx = document.getElementById('loanChart');
  if (!ctx) return;

  // Destroy existing chart if it exists
  if (dashboardChart) {
    dashboardChart.destroy();
  }

  const gridColor = isDarkMode ? 'rgba(255, 255, 255, 0.1)' : '#eef0f6';
  const ticksColor = isDarkMode ? '#8b949e' : '#666';

  dashboardChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['May', 'June', 'July', 'August', 'September', 'October'],
      datasets: [{
        label: 'Loan Applications',
        data: [65, 59, 80, 81, 56, 95],
        backgroundColor: 'rgba(59, 75, 120, 0.6)',
        borderColor: 'rgba(59, 75, 120, 1)',
        borderWidth: 1
      }, {
        label: 'Approved Loans',
        data: [50, 45, 70, 65, 48, 82],
        backgroundColor: 'rgba(255, 193, 7, 0.6)',
        borderColor: 'rgba(255, 193, 7, 1)',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          grid: { color: gridColor },
          stacked: false,
          ticks: { color: ticksColor }
        },
        x: {
          grid: { display: false },
          stacked: false,
          ticks: { color: ticksColor }
        }
      },
      plugins: {
        legend: {
          display: true // Show legend to distinguish datasets
        }
      }
    }
  });
}

// Initialize Dashboard Chart if it exists
// The chart is now initialized by the dark mode toggle logic
// to ensure the correct theme is applied on load.

/**
 * Handles the print button on the loans page.
 */
function initPrintButton() {
  const printBtn = document.getElementById('printLoanDetailsBtn');
  if (!printBtn) return;

  printBtn.addEventListener('click', () => {
    window.print();
  });
}

// Initialize Print Button if it exists
if (document.getElementById('printLoanDetailsBtn')) {
  initPrintButton();
}

/**
 * Handles opening news articles in a modal.
 */
function initNewsModal() {
  const newsLinks = document.querySelectorAll('.news-link');
  const modal = document.getElementById('newsModal');
  const closeModalBtn = document.getElementById('closeNewsModal');
  const modalBody = document.getElementById('newsModalBody');

  if (!modal || !newsLinks.length) return;

  const openModal = (articleCard) => {
    const imageSrc = articleCard.querySelector('.news-image img').src;
    const title = articleCard.querySelector('.news-title').textContent;
    const meta = articleCard.querySelector('.news-meta').innerHTML;
    const summary = articleCard.querySelector('.news-summary').innerHTML;

    // For a real app, you'd load the full article content here, maybe via AJAX.
    // For this demo, we'll just use the summary as the main content.
    modalBody.innerHTML = `
      <img src="${imageSrc}" alt="${title}">
      <h2>${title}</h2>
      <div class="news-meta">${meta}</div>
      <p>${summary}</p>
      <p><em>(This is a summary. In a full application, the complete article content would be loaded here.)</em></p>
    `;

    modal.classList.add('show');
    document.body.classList.add('modal-open');
  };

  const closeModal = () => {
    modal.classList.remove('show');
    document.body.classList.remove('modal-open');
  };

  newsLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const articleCard = link.closest('.news-article-card');
      if (articleCard) openModal(articleCard);
    });
  });

  closeModalBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
}

// Initialize news modal if on the news page
if (document.querySelector('.news-page')) {
  initNewsModal();
}

/**
 * Handles the dark mode toggle functionality.
 */
function initDarkModeToggle() {
  const darkModeToggle = document.getElementById('darkModeToggle');
  if (!darkModeToggle) return;

  const body = document.body;

  // Apply saved theme on page load
  if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode');
    darkModeToggle.checked = true;
  }

  // Initialize chart with correct theme
  if (document.getElementById('loanChart')) {
    initDashboardChart(body.classList.contains('dark-mode'));
  }

  darkModeToggle.addEventListener('change', () => {
    body.classList.toggle('dark-mode');

    // Save theme preference
    if (body.classList.contains('dark-mode')) {
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
    }

    // Re-initialize chart with new theme
    if (document.getElementById('loanChart')) {
      initDashboardChart(body.classList.contains('dark-mode'));
    }
  });
}

// Initialize Dark Mode Toggle
initDarkModeToggle();
