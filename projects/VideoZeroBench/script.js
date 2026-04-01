const SITE_CONFIG = {
  links: {
    paper: "https://marinero4972.github.io/projects/VideoZeroBench",
    dataset: "https://marinero4972.github.io/projects/VideoZeroBench",
    code: "https://marinero4972.github.io/projects/VideoZeroBench",
  },
  authorDefaultLink: "https://marinero4972.github.io/projects/VideoZeroBench",
  authors: [
    { name: "Jiahao Meng", affiliations: [1], link: "https://marinero4972.github.io/" },
    { name: "Yue Tan", affiliations: [1], link: "https://tangent0308.github.io/" },
    { name: "Qi Xu", affiliations: [2], link: "https://marinero4972.github.io/projects/VideoZeroBench" },
    { name: "Haochen Wang", affiliations: [3], link: "https://haochen-wang409.github.io/" },
    { name: "Zhongwei Ren", affiliations: [4], link: "https://marinero4972.github.io/projects/VideoZeroBench" },
    { name: "Weisong Liu", affiliations: [3], link: "https://marinero4972.github.io/projects/VideoZeroBench" },
    { name: "Yuhao Wang", affiliations: [1], link: "https://marinero4972.github.io/projects/VideoZeroBench" },
    { name: "Renrui Zhang", affiliations: [5], link: "https://zrrskywalker.github.io/" },
    { name: "Haodong Duan", affiliations: [5], link: "https://kennymckormick.github.io/" },
    { name: "Yunhai Tong", affiliations: [1], suffix: "†", link: "https://scholar.google.com/citations?user=T4gqdPkAAAAJ" },
  ],
  affiliations: [
    "1. PKU",
    "2. WHU",
    "3. CASIA",
    "4. BJTU",
    "5. CUHK",
  ],
  examples: [
    { label: "Instructional", src: "images/course.png" },
    { label: "Gaming", src: "images/game.png" },
    { label: "Sports", src: "images/sports.png" },
    { label: "Film&TV", src: "images/film.png" },
    { label: "Music", src: "images/music.png" },
    { label: "Daily Vlogs", src: "images/vlog.png" },
    { label: "Driving", src: "images/car.png" },
    { label: "News&Entertainment", src: "images/news.png" },
    { label: "Travel", src: "images/travel.png" },
    { label: "Animals", src: "images/animal.png" },
    { label: "Humor", src: "images/humor.png" },
    { label: "Fashion&Beauty", src: "images/fashion.png" },
    { label: "Animation", src: "images/animation.png" },
  ],
  citation: `@article{meng2026videozero,
  title={VideoZeroBench: Probing the Limits of Video MLLMs with Spatio-Temporal Evidence Verification},
  author={Meng, Jiahao and Tan, Yue and Xu, Qi and Wang, Haochen and Ren, Zhongwei and Liu, Weisong and Wang, Yuhao and Zhang, Renrui and Duan, Haodong and Tong, Yunhai},
  journal={arXiv preprint arXiv:2604.XXXXX},
  year={2026}
}`,
};

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

function escapeHtml(text) {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function setupLinks() {
  const anchors = document.querySelectorAll("[data-link-key]");
  anchors.forEach((anchor) => {
    const key = anchor.getAttribute("data-link-key");
    const href = SITE_CONFIG.links[key];
    if (href) {
      anchor.href = href;
    }
  });
}

function renderAuthors() {
  const authorRoot = document.getElementById("author-list");
  const affRoot = document.getElementById("affiliation-list");
  if (!authorRoot || !affRoot) {
    return;
  }

  authorRoot.innerHTML = SITE_CONFIG.authors
    .map((author) => {
      const marker = author.affiliations?.length
        ? `<sup>${author.affiliations.join(",")}</sup>`
        : "";
      const suffix = author.suffix ? `<sup>${escapeHtml(author.suffix)}</sup>` : "";
      const authorHref = author.link || SITE_CONFIG.authorDefaultLink;
      return `<span class="author-chip"><a class="author-link" href="${escapeHtml(authorHref)}" target="_blank" rel="noreferrer noopener">${escapeHtml(author.name)}</a>${marker}${suffix}</span>`;
    })
    .join("");

  const affiliationsLine = SITE_CONFIG.affiliations
    .map((line) => {
      const [idx, text] = line.split(". ");
      if (!idx || !text) {
        return escapeHtml(line);
      }
      return `<sup>${escapeHtml(idx)}</sup> ${escapeHtml(text)}`;
    })
    .join(", ");
  affRoot.innerHTML = `<p class="affiliation-item">${affiliationsLine}</p>`;
}

function renderExamples() {
  const grid = document.getElementById("examples-grid");
  if (!grid) {
    return;
  }

  grid.innerHTML = SITE_CONFIG.examples
    .map(
      (item, index) => `
      <article class="example-card spotlight-card reveal" style="--reveal-delay:${Math.min(index, 6) * 80}ms">
        <img src="${escapeHtml(item.src)}" alt="${escapeHtml(item.label)} example from VideoZeroBench" loading="lazy" />
        <div class="example-meta">
          <p class="example-category">${escapeHtml(item.label)}</p>
        </div>
      </article>
    `,
    )
    .join("");
}

function setupCitation() {
  const citationBlock = document.getElementById("citation-block");
  const copyButton = document.getElementById("copy-citation");
  const feedback = document.getElementById("copy-feedback");

  if (!citationBlock || !copyButton || !feedback) {
    return;
  }

  citationBlock.textContent = SITE_CONFIG.citation;

  copyButton.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(SITE_CONFIG.citation);
      feedback.textContent = "Citation copied to clipboard.";
    } catch {
      const temp = document.createElement("textarea");
      temp.value = SITE_CONFIG.citation;
      document.body.appendChild(temp);
      temp.select();
      document.execCommand("copy");
      document.body.removeChild(temp);
      feedback.textContent = "Citation copied to clipboard.";
    }

    window.setTimeout(() => {
      feedback.textContent = "";
    }, 1600);
  });
}

function setupReveal() {
  const revealItems = document.querySelectorAll(".reveal");
  revealItems.forEach((item, idx) => {
    if (!item.style.getPropertyValue("--reveal-delay")) {
      item.style.setProperty("--reveal-delay", `${(idx % 6) * 70}ms`);
    }
  });

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
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
    { threshold: 0.15 },
  );

  revealItems.forEach((item) => observer.observe(item));
}

function setupSpotlightCards() {
  const cards = document.querySelectorAll(".spotlight-card");
  cards.forEach((card) => {
    card.addEventListener("mousemove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty("--spot-x", `${x}%`);
      card.style.setProperty("--spot-y", `${y}%`);
    });
  });
}

function setupParallaxHero() {
  if (prefersReducedMotion) {
    return;
  }

  const hero = document.querySelector(".hero-transform");
  if (!hero) {
    return;
  }

  const onScroll = () => {
    const viewportWindow = Math.max(window.innerHeight * 0.5, 360);
    const progress = Math.min(window.scrollY / viewportWindow, 1);
    hero.style.setProperty("--hero-opacity", `${1 - progress}`);
    hero.style.setProperty("--hero-scale", `${1 - progress * 0.05}`);
    hero.style.setProperty("--hero-shift", `${progress * 100}px`);
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

function setupMobileMenu() {
  const header = document.querySelector(".site-header");
  const toggle = document.getElementById("mobile-menu-toggle");
  const nav = document.getElementById("primary-nav");
  if (!header || !toggle || !nav) {
    return;
  }

  const closeMenu = () => {
    header.classList.remove("menu-open");
    toggle.setAttribute("aria-expanded", "false");
  };

  toggle.addEventListener("click", () => {
    const isOpen = header.classList.toggle("menu-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 768) {
      closeMenu();
    }
  });
}

function setupFooterYear() {
  const yearRoot = document.getElementById("copyright-year");
  if (yearRoot) {
    yearRoot.textContent = String(new Date().getFullYear());
  }
}

function init() {
  setupLinks();
  renderAuthors();
  renderExamples();
  setupCitation();
  setupMobileMenu();
  setupSpotlightCards();
  setupParallaxHero();
  setupReveal();
  setupFooterYear();
}

document.addEventListener("DOMContentLoaded", init);
