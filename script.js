document.addEventListener("DOMContentLoaded", function () {
  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        // Offset for the fixed navigation bar
        const navHeight = document.querySelector(".navigation").offsetHeight;
        const targetPosition =
          targetElement.getBoundingClientRect().top +
          window.pageYOffset -
          navHeight -
          20;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // Mobile menu toggle
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinksMenu = document.getElementById("nav-links");

  menuToggle.addEventListener("click", function () {
    menuToggle.classList.toggle("active");
    navLinksMenu.classList.toggle("active");
  });

  // Close menu when clicking a nav link
  const links = document.querySelectorAll("#nav-links a");
  links.forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.classList.remove("active");
      navLinksMenu.classList.remove("active");
    });
  });

  // Navigation highlight on scroll
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll("#nav-links a");

  function highlightNavOnScroll() {
    const scrollPosition = window.scrollY + 100;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  // Navigation links style
  const style = document.createElement("style");
  style.textContent = `
        #nav-links a.active {
            color: var(--accent-color);
        }
        #nav-links a.active::after {
            width: 100%;
        }
    `;
  document.head.appendChild(style);

  window.addEventListener("scroll", highlightNavOnScroll);

  // Timeline animation
  const timelineItems = document.querySelectorAll(".timeline-item");

  const timelineObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          const index = Array.from(timelineItems).indexOf(entry.target);
          entry.target.style.transitionDelay = `${index * 0.2}s`;
          timelineObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2,
      rootMargin: "0px 0px -100px 0px",
    }
  );

  timelineItems.forEach((item) => {
    item.style.opacity = "0";
    item.style.transform = "translateY(30px)";
    item.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    timelineObserver.observe(item);
  });

  // Skills transfer animation
  const skillTransfers = document.querySelectorAll(".skill-transfer");

  const skillTransferObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in");
          const index = Array.from(skillTransfers).indexOf(entry.target);
          entry.target.style.transitionDelay = `${index * 0.15}s`;
          skillTransferObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  skillTransfers.forEach((skill) => {
    skill.style.opacity = "0";
    skill.style.transform = "translateY(20px)";
    skill.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    skillTransferObserver.observe(skill);
  });

  // Planet animation enhancements
  const planetContainer = document.querySelector(".planet-container");

  if (planetContainer) {
    // Add stars
    for (let i = 0; i < 20; i++) {
      const star = document.createElement("div");
      star.classList.add("planet-star");
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      const size = Math.random() * 2 + 1;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.animationDelay = `${Math.random() * 3}s`;
      planetContainer.appendChild(star);
    }

    // Meteor
    setInterval(() => {
      const meteor = document.createElement("div");
      meteor.classList.add("meteor");
      meteor.style.top = `${Math.random() * 50}%`;
      meteor.style.left = "0";
      planetContainer.appendChild(meteor);
      setTimeout(() => {
        planetContainer.removeChild(meteor);
      }, 1000);
    }, 4000);
  }
});

// Adding planet styles through JS
const planetStyles = document.createElement("style");
planetStyles.textContent = `
  .planet-star {
    position: absolute;
    background-color: white;
    border-radius: 50%;
    animation: twinkleStar 4s ease-in-out infinite alternate;
  }
  
  .meteor {
    position: absolute;
    width: 100px;
    height: 1px;
    background: linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,0.8), rgba(255,255,255,0));
    transform: rotate(45deg);
    animation: shootingStar 1s linear forwards;
  }
  
  @keyframes twinkleStar {
    0%, 100% { opacity: 0.2; }
    50% { opacity: 1; }
  }
  
  @keyframes shootingStar {
    from { transform: translateX(0) translateY(0) rotate(45deg); opacity: 1; }
    to { transform: translateX(200px) translateY(200px) rotate(45deg); opacity: 0; }
  }
  
  .skills-transfer-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    margin-top: 2rem;
  }
  
  .skill-transfer {
    background: var(--card-bg);
    padding: 1.5rem;
    border-radius: 15px;
    border: 1px solid var(--border-color);
  }
  
  .skill-transfer h4 {
    color: var(--accent-color);
    margin-bottom: 0.5rem;
    font-weight: 600;
  }
  
  .fade-in {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }
  
  @media only screen and (max-width: 768px) {
    .skills-transfer-container {
      grid-template-columns: 1fr;
    }

    .planet-star {
      display: none;
    }
  }

    @media only screen and (max-width: 960px) {
    .planet-star {
      display: none;
    }
  }
`;
document.head.appendChild(planetStyles);