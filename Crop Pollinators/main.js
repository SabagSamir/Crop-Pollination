    // Dynamic year in footer
    (function () {
      const yearEl = document.getElementById("year");
      if (yearEl) {
        yearEl.textContent = new Date().getFullYear().toString();
      }
    })();

    // Smooth scroll helpers
    function scrollToContact() {
      const el = document.getElementById("contact");
      if (!el) return;
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    function scrollToScience() {
      const el = document.getElementById("science");
      if (!el) return;
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    // Scroll reveal animations
    (function () {
      const revealElements = document.querySelectorAll(".reveal-on-scroll");
      if (!("IntersectionObserver" in window) || !revealElements.length) {
        revealElements.forEach(function (el) {
          el.classList.add("visible");
        });
        return;
      }

      const observer = new IntersectionObserver(
        function (entries, obs) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
              obs.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.12
        }
      );

      revealElements.forEach(function (el) {
        observer.observe(el);
      });
    })();

    // Ensure all hex cards match the height of the tallest content
    (function () {
      function adjustHexHeights() {
        const cards = Array.from(document.querySelectorAll('.hex-card'));
        if (!cards.length) return;
        // reset previously-set minHeights so measurement is accurate
        cards.forEach(c => (c.style.minHeight = ''));

        let maxInner = 0;
        cards.forEach(c => {
          const inner = c.querySelector('.hex-card-inner') || c;
          const h = inner.scrollHeight;
          if (h > maxInner) maxInner = h;
        });

        // Add a small buffer for paddings/borders so text never touches edges
        const buffer = 36;
        const target = maxInner + buffer;
        cards.forEach(c => (c.style.minHeight = target + 'px'));
      }

      // debounce helper
      function debounce(fn, wait) {
        let t;
        return function () {
          clearTimeout(t);
          t = setTimeout(() => fn.apply(this, arguments), wait);
        };
      }

      window.addEventListener('load', adjustHexHeights);
      window.addEventListener('DOMContentLoaded', adjustHexHeights);
      window.addEventListener('resize', debounce(adjustHexHeights, 120));
    })();
  