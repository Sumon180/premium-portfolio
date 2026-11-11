/* ========================================
   PREMIUM PORTFOLIO HERO INTERACTIONS
======================================== */

document.addEventListener("DOMContentLoaded", () => {
  const hero = document.querySelector(".hero-section");
  const spotlight = document.querySelector(".mouse-spotlight");
  const codeCard = document.querySelector(".hero-code-card");

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  /* ======================================
     1. SCROLL REVEAL ANIMATION
  ====================================== */

  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window && !prefersReducedMotion) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
      },
    );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach((element) => {
      element.classList.add("visible");
    });
  }

  /* ======================================
     2. TYPING TEXT ANIMATION
  ====================================== */

  const typingElement = document.querySelector(".typing-text");

  const roles = [
    "Web Developer",
    "Frontend Developer",
    "Creative Developer",
    "Full Stack Developer",
  ];

  let roleIndex = 0;
  let characterIndex = roles[0].length;
  let isDeleting = false;

  function typeEffect() {
    if (prefersReducedMotion || !typingElement) return;

    const currentRole = roles[roleIndex];

    if (isDeleting) {
      characterIndex--;
    } else {
      characterIndex++;
    }

    typingElement.textContent = currentRole.substring(0, characterIndex);

    let delay = isDeleting ? 45 : 85;

    if (!isDeleting && characterIndex === currentRole.length) {
      isDeleting = true;
      delay = 1800;
    } else if (isDeleting && characterIndex === 0) {
      isDeleting = false;

      roleIndex = (roleIndex + 1) % roles.length;

      delay = 400;
    }

    setTimeout(typeEffect, delay);
  }

  if (!prefersReducedMotion && typingElement) {
    setTimeout(typeEffect, 1500);
  }

  /* ======================================
     3. MOUSE FOLLOWING SPOTLIGHT
  ====================================== */

  if (hero && spotlight && window.matchMedia("(hover: hover)").matches) {
    hero.addEventListener("mousemove", (event) => {
      const rect = hero.getBoundingClientRect();

      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      spotlight.style.left = `${x}px`;
      spotlight.style.top = `${y}px`;
    });
  }

  /* ======================================
     4. 3D TILT CODE CARD
  ====================================== */

  if (
    codeCard &&
    !prefersReducedMotion &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches
  ) {
    codeCard.addEventListener("mousemove", (event) => {
      const rect = codeCard.getBoundingClientRect();

      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;

      codeCard.style.transform = `
        perspective(1000px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        rotateZ(3deg)
        translateY(-5px)
      `;
    });

    codeCard.addEventListener("mouseleave", () => {
      codeCard.style.transform = "rotate(3deg)";
    });
  }

  /* ======================================
     5. MAGNETIC BUTTON EFFECT
  ====================================== */

  const magneticButtons = document.querySelectorAll(".magnetic-btn");

  if (
    !prefersReducedMotion &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches
  ) {
    magneticButtons.forEach((button) => {
      button.addEventListener("mousemove", (event) => {
        const rect = button.getBoundingClientRect();

        const x = event.clientX - rect.left - rect.width / 2;
        const y = event.clientY - rect.top - rect.height / 2;

        button.style.transform = `
          translate(${x * 0.12}px, ${y * 0.18}px)
        `;
      });

      button.addEventListener("mouseleave", () => {
        button.style.transform = "translate(0, 0)";
      });
    });
  }

  /* ======================================
     6. TECH STACK STAGGERED ANIMATION
  ====================================== */

  const techItems = document.querySelectorAll(".hero-tech-stack span");

  if (!prefersReducedMotion) {
    techItems.forEach((item, index) => {
      item.style.opacity = "0";
      item.style.transform = "translateY(12px)";

      setTimeout(
        () => {
          item.style.transition = "opacity 0.5s ease, transform 0.5s ease";

          item.style.opacity = "1";
          item.style.transform = "translateY(0)";
        },
        900 + index * 100,
      );
    });
  }

  /* ======================================
     7. PROFILE IMAGE PARALLAX
  ====================================== */

  const profileImage = document.querySelector(".hero-image-container");

  if (
    profileImage &&
    !prefersReducedMotion &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches
  ) {
    hero.addEventListener("mousemove", (event) => {
      const rect = hero.getBoundingClientRect();

      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      profileImage.style.transform = `
        translate(${x * -12}px, ${y * -12}px)
      `;
    });

    hero.addEventListener("mouseleave", () => {
      profileImage.style.transform = "translate(0, 0)";
    });
  }

  /* ======================================
     8. SMOOTH SCROLL
  ====================================== */

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") {
        event.preventDefault();
        return;
      }

      const target = document.querySelector(targetId);

      if (target) {
        event.preventDefault();

        target.scrollIntoView({
          behavior: prefersReducedMotion ? "auto" : "smooth",
          block: "start",
        });
      }
    });
  });

  /* ======================================
     9. DYNAMIC COPYRIGHT / CONSOLE
  ====================================== */

  console.log(
    "%c Sumon.dev ",
    "background: #00d9ff; color: #080d18; font-size: 18px; font-weight: bold; padding: 8px;",
  );

  console.log(
    "%c Turning ideas into reality ✨",
    "color: #8b5cf6; font-size: 13px;",
  );
});

/* ======================================
     10. ABOUT SECTION COUNTER ANIMATION
  ====================================== */

const counters = document.querySelectorAll(".about-section .counter");

const animateCounter = (counter) => {
  const target = Number(counter.dataset.target);
  const duration = 1800;
  const startTime = performance.now();

  function updateCounter(currentTime) {
    const progress = Math.min((currentTime - startTime) / duration, 1);

    // Smooth ease-out animation
    const easedProgress = 1 - Math.pow(1 - progress, 4);

    const currentValue = Math.floor(easedProgress * target);

    counter.textContent = currentValue;

    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    } else {
      counter.textContent = target;
    }
  }

  requestAnimationFrame(updateCounter);
};

if (prefersReducedMotion) {
  counters.forEach((counter) => {
    counter.textContent = counter.dataset.target;
  });
} else if ("IntersectionObserver" in window) {
  const counterObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);

          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.5,
    },
  );

  counters.forEach((counter) => {
    counterObserver.observe(counter);
  });
} else {
  counters.forEach((counter) => {
    counter.textContent = counter.dataset.target;
  });
}

/* ================================
   SKILLS SECTION ANIMATION
================================ */

const skillSection = document.querySelector(".skills-section");

if (skillSection) {
  const skillBars = skillSection.querySelectorAll(".skill-progress");
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  const animateSkills = () => {
    skillBars.forEach((bar) => {
      const progress = Number(bar.dataset.progress);

      if (Number.isFinite(progress)) {
        const safeProgress = Math.min(100, Math.max(0, progress));

        if (reducedMotion) {
          bar.style.width = `${safeProgress}%`;
        } else {
          bar.style.setProperty("--progress", `${safeProgress}%`);
          bar.classList.add("animate");
        }
      }
    });
  };

  if (reducedMotion) {
    animateSkills();
  } else {
    const skillObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateSkills();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.25 },
    );

    skillObserver.observe(skillSection);
  }
}

/* ================================
   SERVICES CARD INTERACTIONS
================================ */

const serviceCards = document.querySelectorAll(".service-card");

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

const supportsHover = window.matchMedia(
  "(hover: hover) and (pointer: fine)",
).matches;

if (!prefersReducedMotion && supportsHover) {
  serviceCards.forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();

      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateY = ((x - centerX) / centerX) * 3;
      const rotateX = ((centerY - y) / centerY) * 3;

      card.style.setProperty("--rotate-x", `${rotateX}deg`);
      card.style.setProperty("--rotate-y", `${rotateY}deg`);
    });

    card.addEventListener("pointerleave", () => {
      card.style.setProperty("--rotate-x", "0deg");
      card.style.setProperty("--rotate-y", "0deg");
    });
  });
}

// Featured Projects: 3D card tilt
const projectCards = document.querySelectorAll(".project-card");
const projectMotionReduced = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

if (!projectMotionReduced && window.matchMedia("(hover: hover)").matches) {
  projectCards.forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();

      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const rotateY = (x / rect.width - 0.5) * 5;
      const rotateX = (0.5 - y / rect.height) * 5;

      card.style.setProperty("--rotate-x", `${rotateX}deg`);
      card.style.setProperty("--rotate-y", `${rotateY}deg`);
    });

    card.addEventListener("pointerleave", () => {
      card.style.setProperty("--rotate-x", "0deg");
      card.style.setProperty("--rotate-y", "0deg");
    });
  });
}

// Testimonials: Interactive pointer glow
const testimonialCards = document.querySelectorAll(".testimonial-card");

const testimonialReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

if (!testimonialReducedMotion && window.matchMedia("(hover: hover)").matches) {
  testimonialCards.forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();

      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      card.style.background = `
        radial-gradient(
          circle at ${x}px ${y}px,
          rgba(0, 217, 255, 0.09),
          rgba(16, 24, 42, 0.85) 65%
        )
      `;
    });

    card.addEventListener("pointerleave", () => {
      card.style.background = "rgba(16, 24, 42, 0.72)";
    });
  });
}

// ================================
// CONTACT FORM INTERACTION
// ================================

const contactForm = document.querySelector("#contactForm");
const contactFormStatus = document.querySelector("#contactFormStatus");

// Replace with your actual email address
const recipientEmail = "your-email@example.com";

if (contactForm && contactFormStatus) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    // Validate form
    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }

    const formData = new FormData(contactForm);

    const name = formData.get("name").trim();
    const email = formData.get("email").trim();
    const subject = formData.get("subject").trim();
    const service = formData.get("service");
    const message = formData.get("message").trim();

    // Prepare email content
    const emailSubject = encodeURIComponent(`Portfolio Inquiry: ${subject}`);

    const emailBody = encodeURIComponent(
      `Hello Sumon,

You have received a new message from your portfolio website.

Name: ${name}
Email: ${email}
Project Type: ${service}

Message:
${message}

Regards,
${name}`,
    );

    const mailtoLink = `mailto:${recipientEmail}?subject=${emailSubject}&body=${emailBody}`;

    contactFormStatus.className = "contact-form-status success";
    contactFormStatus.textContent =
      "Your email application should open with your message. Please review and send it there.";

    // Open visitor's default email application
    window.location.href = mailtoLink;
  });
}

// ================================
// FOOTER FUNCTIONALITY
// ================================

// Automatically update copyright year
const footerYear = document.querySelector("#footerYear");

if (footerYear) {
  footerYear.textContent = new Date().getFullYear();
}

// Back to top button
const backToTop = document.querySelector("#backToTop");

if (backToTop) {
  backToTop.addEventListener("click", (event) => {
    event.preventDefault();

    window.scrollTo({
      top: 0,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  });
}
