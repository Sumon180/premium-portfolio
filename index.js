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
