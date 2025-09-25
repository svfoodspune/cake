document.addEventListener("DOMContentLoaded", () => {
  console.log("[v0] DOM loaded, initializing components")
  initializeLoadingAnimation()
  initializeNavigation()
  initializeScrollAnimations()
  initializeFormHandling()
  initializeSmoothScrolling()
})

function initializeLoadingAnimation() {
  const loadingOverlay = document.getElementById("loadingOverlay")
  const progressFill = document.getElementById("progressFill")
  const loadingPercentage = document.getElementById("loadingPercentage")
  console.log("[v0] Loading overlay element:", loadingOverlay)

  if (loadingOverlay && progressFill && loadingPercentage) {
    console.log("[v0] Starting enhanced loading animation sequence")

    // Ensure the overlay is visible initially
    loadingOverlay.style.opacity = "1"
    loadingOverlay.style.visibility = "visible"

    // Extended loading time - simulate progressive loading with slower progress
    let progress = 0
    const progressInterval = setInterval(() => {
      // Slower progress increment for extended loading time
      progress += Math.random() * 8 + 2 // Random increment between 2-10 (reduced from 5-20)
      
      if (progress >= 100) {
        progress = 100
        clearInterval(progressInterval)
        
        // Complete the loading process with extended delay
        setTimeout(() => {
          console.log("[v0] Starting fade out animation")
          loadingOverlay.classList.add("fade-out")

          // Remove from DOM after fade out completes
          setTimeout(() => {
            console.log("[v0] Removing loading overlay from DOM")
            if (loadingOverlay.parentNode) {
              loadingOverlay.parentNode.removeChild(loadingOverlay)
            }
          }, 1000)
        }, 1000) // Extended pause at 100% (increased from 500ms to 1000ms)
      }
      
      // Update progress bar and percentage
      progressFill.style.width = `${progress}%`
      loadingPercentage.textContent = `${Math.round(progress)}%`
      
    }, 150) // Slower update interval (increased from 100ms to 150ms)

  } else {
    console.log("[v0] Loading overlay elements not found")
  }
}

// Navigation functionality
function initializeNavigation() {
  const navbar = document.getElementById("navbar")
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
  const mobileMenu = document.querySelector(".mobile-menu")

  // Navbar scroll effect
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.style.background = "rgba(255, 255, 255, 0.98)"
      navbar.style.boxShadow = "0 1px 3px rgba(212, 175, 55, 0.1)"
    } else {
      navbar.style.background = "rgba(255, 255, 255, 0.95)"
      navbar.style.boxShadow = "none"
    }
  })

  // Mobile menu toggle
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("active")
      mobileMenuBtn.classList.toggle("active")
    })
  }

  // Close mobile menu when clicking on links
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-link")
  mobileNavLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("active")
      mobileMenuBtn.classList.remove("active")
    })
  })
}

// Smooth scrolling for navigation links
function initializeSmoothScrolling() {
  const navLinks = document.querySelectorAll('a[href^="#"]')

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault()
      const targetId = link.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        })
      }
    })
  })
}

// Scroll animations
function initializeScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate")
      }
    })
  }, observerOptions)

  // Observe elements for scroll animations
  const animateElements = document.querySelectorAll(`
    .section-title, .section-subtitle, .product-card, 
    .hygiene-card, .about-item, .partner-logo, .stat-item,
    .partner-circle-logo, .partners-header
  `)

  animateElements.forEach((el) => {
    el.classList.add("scroll-animate")
    observer.observe(el)
  })
}

function initializeFormHandling() {
  const contactForm = document.querySelector(".contact-form")

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      const submitBtn = contactForm.querySelector(".send-inquiry-btn")
      const originalText = submitBtn.textContent

      // Show loading state
      submitBtn.textContent = "Sending..."
      submitBtn.disabled = true

      // Simulate form submission
      setTimeout(() => {
        contactForm.reset()
        submitBtn.textContent = originalText
        submitBtn.disabled = false
      }, 2000)
    })
  }
}

// Utility function for notifications
function showNotification(message, type = "info") {
  const notification = document.createElement("div")
  notification.className = "notification"

  const styles = {
    info: { background: "#d4af37", color: "white" },
    success: { background: "#f4e4a6", color: "#8b6914" },
    error: { background: "#ff6b6b", color: "white" },
  }

  const style = styles[type] || styles.info

  Object.assign(notification.style, {
    position: "fixed",
    top: "24px",
    right: "24px",
    zIndex: "9999",
    padding: "16px 20px",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "500",
    maxWidth: "300px",
    transform: "translateX(100%)",
    transition: "transform 0.3s ease",
    ...style,
  })

  notification.textContent = message
  document.body.appendChild(notification)

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)"
  }, 100)

  // Animate out and remove
  setTimeout(() => {
    notification.style.transform = "translateX(100%)"
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification)
      }
    }, 300)
  }, 4000)
}

document.addEventListener("mouseover", (e) => {
  if (e.target.matches(".cta-button, .submit-btn, .send-inquiry-btn")) {
    e.target.style.transform = "translateY(-1px)"
  }
})

document.addEventListener("mouseout", (e) => {
  if (e.target.matches(".cta-button, .submit-btn, .send-inquiry-btn")) {
    e.target.style.transform = "translateY(0)"
  }
})

// Smooth page load
window.addEventListener("load", () => {
  document.body.style.opacity = "1"
})