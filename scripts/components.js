const NAV_ITEMS = [
  { key: "home", label: "Home", href: "index.html" },
  { key: "thesis", label: "Thesis", href: "thesis/index.html" },
  { key: "rsa", label: "RSA", href: "rsa/index.html" },
  { key: "alma", label: "ALMA", href: "alma/index.html" },
  { key: "architecture", label: "Architecture", href: "architecture/index.html" },
  { key: "use-cases", label: "Use Cases", href: "use-cases/index.html" },
  { key: "blog", label: "Blog", href: "blog/index.html" },
  { key: "verify", label: "Verify", href: "verify/index.html" }
];

function normalizeRoot(rootValue) {
  const raw = (rootValue || "./").trim();
  if (!raw) {
    return "./";
  }
  return raw.endsWith("/") ? raw : `${raw}/`;
}

function renderNav(current, root) {
  return NAV_ITEMS.map((item) => {
    const currentAttr = item.key === current ? ' aria-current="page"' : "";
    return `<li><a href="${root}${item.href}"${currentAttr}>${item.label}</a></li>`;
  }).join("");
}

class SiteHeader extends HTMLElement {
  connectedCallback() {
    if (this.dataset.ready === "true") {
      return;
    }
    this.dataset.ready = "true";

    const current = this.getAttribute("current") || "";
    const root = normalizeRoot(this.getAttribute("root"));

    this.innerHTML = `
      <a class="skip-link" href="#main-content">Skip to content</a>
      <header class="site-header" role="banner">
        <div class="inner">
          <div class="brand-row">
            <a class="brand" href="${root}index.html">
              Registry of Shielded Artworks
              <small>Designing against cultural entropy</small>
            </a>
            <nav class="main-nav" aria-label="Primary">
              <ul>
                ${renderNav(current, root)}
              </ul>
            </nav>
          </div>
        </div>
      </header>
    `;
  }
}

class SiteFooter extends HTMLElement {
  connectedCallback() {
    if (this.dataset.ready === "true") {
      return;
    }
    this.dataset.ready = "true";

    const root = normalizeRoot(this.getAttribute("root"));

    this.innerHTML = `
      <footer class="site-footer" role="contentinfo">
        <div class="inner">
          <nav aria-label="Footer">
            <a href="${root}thesis/index.html#about-this-rendering">About</a>
            <a href="mailto:contact@sras.io">Contact</a>
            <a href="#privacy-note">Privacy note</a>
            <a href="https://github.com/aphelionz/sras.io">GitHub</a>
          </nav>
          <p class="meta" id="privacy-note">
            Privacy note: this static site runs without analytics, trackers, or external network scripts.
          </p>
        </div>
      </footer>
    `;
  }
}

class CalloutCard extends HTMLElement {
  connectedCallback() {
    if (this.dataset.ready === "true") {
      return;
    }
    this.dataset.ready = "true";

    const title = this.getAttribute("title") || "Callout";
    const tone = this.getAttribute("tone") || "neutral";
    const content = this.innerHTML;

    this.innerHTML = `
      <article class="card tone-${tone}">
        <h3>${title}</h3>
        <div>${content}</div>
      </article>
    `;
  }
}

if (!customElements.get("site-header")) {
  customElements.define("site-header", SiteHeader);
}

if (!customElements.get("site-footer")) {
  customElements.define("site-footer", SiteFooter);
}

if (!customElements.get("callout-card")) {
  customElements.define("callout-card", CalloutCard);
}
