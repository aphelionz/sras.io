function shouldReduceMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function initReveal() {
  const targets = document.querySelectorAll("[data-reveal]");
  if (!targets.length) {
    return;
  }

  if (shouldReduceMotion() || !("IntersectionObserver" in window)) {
    targets.forEach((target) => target.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, io) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );

  targets.forEach((target) => observer.observe(target));
}

export function initCoordinationTaxSlider() {
  const slider = document.getElementById("coordination-tax-slider");
  if (!slider) {
    return;
  }

  const meterValue = document.getElementById("coordination-tax-value");
  const meterState = document.getElementById("coordination-tax-state");
  const breakpoints = document.querySelectorAll("[data-threshold]");

  const stageForValue = (value) => {
    if (value <= 25) {
      return { label: "Low friction", active: 1 };
    }
    if (value <= 50) {
      return { label: "Rising strain", active: 2 };
    }
    if (value <= 75) {
      return { label: "Verification drag", active: 3 };
    }
    return { label: "System drift", active: 4 };
  };

  const update = () => {
    const value = Number(slider.value);
    const stage = stageForValue(value);

    if (meterValue) {
      meterValue.textContent = String(value);
    }

    if (meterState) {
      meterState.textContent = stage.label;
    }

    breakpoints.forEach((item) => {
      const threshold = Number(item.getAttribute("data-threshold"));
      item.classList.toggle("active", stage.active >= threshold);
    });
  };

  slider.addEventListener("input", update);
  update();
}

function safeShorten(value) {
  const text = value.trim();
  if (text.length <= 14) {
    return text;
  }
  return `${text.slice(0, 6)}…${text.slice(-6)}`;
}

export function initVerifyPlaceholder() {
  const form = document.getElementById("verify-form");
  if (!form) {
    return;
  }

  const addressInput = document.getElementById("zcash-address");
  const keyInput = document.getElementById("viewing-key");
  const addressError = document.getElementById("address-error");
  const keyError = document.getElementById("key-error");
  const resultPanel = document.getElementById("verify-result");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const address = addressInput.value.trim();
    const viewingKey = keyInput.value.trim();

    let valid = true;

    if (!(address.startsWith("u") || address.startsWith("zs")) || address.length < 24) {
      addressError.textContent = "Use a longer demo address starting with u or zs.";
      valid = false;
    } else {
      addressError.textContent = "";
    }

    if (viewingKey.length < 24) {
      keyError.textContent = "Use a longer demo viewing key for this placeholder flow.";
      valid = false;
    } else {
      keyError.textContent = "";
    }

    if (!valid) {
      resultPanel.hidden = true;
      return;
    }

    const shortAddress = safeShorten(address);
    const shortKey = safeShorten(viewingKey);

    resultPanel.hidden = false;
    resultPanel.innerHTML = `
      <h3>Not implemented</h3>
      <p>This demo performs no cryptography and sends nothing anywhere.</p>
      <p><strong>Address:</strong> <code></code></p>
      <p><strong>Viewing key:</strong> <code></code></p>
    `;

    const codeEls = resultPanel.querySelectorAll("code");
    if (codeEls[0]) {
      codeEls[0].textContent = shortAddress;
    }
    if (codeEls[1]) {
      codeEls[1].textContent = shortKey;
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initReveal();
  initCoordinationTaxSlider();
  initVerifyPlaceholder();
});
