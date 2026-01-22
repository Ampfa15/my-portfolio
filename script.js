const STORAGE_KEY = "portfolio_theme";

const projects = [
  {
    title: "Customer Insights Dashboard",
    description:
      "Built a Python + SQL pipeline to clean and aggregate sales data, powering an interactive dashboard for revenue insights.",
    tags: ["Python", "SQL", "ETL", "Dashboards"],
    links: { code: "https://github.com/" },
  },
  {
    title: "Data Pipeline & API",
    description:
      "Designed a FastAPI service on top of a PostgreSQL warehouse to serve curated datasets with caching and auth.",
    tags: ["FastAPI", "PostgreSQL", "Docker", "APIs"],
    links: { code: "https://github.com/" },
  },
  {
    title: "Churn Prediction Model",
    description:
      "Trained and evaluated a scikit‑learn model to predict churn, shipping metrics and explanations for stakeholders.",
    tags: ["Python", "scikit-learn", "Pandas", "Metrics"],
    links: { code: "https://github.com/" },
  },
];

const skills = [
  "Python",
  "Data Analysis",
  "SQL",
  "Data Engineering",
  "Full‑Stack Development",
  "Backend Development",
  "Frontend Development",
  "Cloud & Deployment",
];

function setTheme(theme) {
  const root = document.documentElement;
  if (theme === "light") root.setAttribute("data-theme", "light");
  else root.removeAttribute("data-theme");

  localStorage.setItem(STORAGE_KEY, theme);

  const btn = document.getElementById("themeToggle");
  if (btn) btn.setAttribute("aria-pressed", String(theme === "light"));
}

function getInitialTheme() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === "light" || saved === "dark") return saved;
  return window.matchMedia?.("(prefers-color-scheme: light)")?.matches
    ? "light"
    : "dark";
}

function createTag(text) {
  const el = document.createElement("span");
  el.className = "tag";
  el.textContent = text;
  return el;
}

function renderProjects() {
  const grid = document.getElementById("projectsGrid");
  if (!grid) return;

  grid.innerHTML = "";
  projects.forEach((p) => {
    const card = document.createElement("article");
    card.className = "project";

    const h = document.createElement("h3");
    const title = document.createElement("span");
    title.textContent = p.title;

    const badge = document.createElement("span");
    badge.className = "tag";
    badge.textContent = "Featured";
    badge.style.opacity = "0.85";

    h.appendChild(title);
    h.appendChild(badge);

    const desc = document.createElement("p");
    desc.textContent = p.description;

    const tags = document.createElement("div");
    tags.className = "tag-row";
    p.tags.forEach((t) => tags.appendChild(createTag(t)));

    const links = document.createElement("div");
    links.className = "project-links";

    if (p.links?.demo) {
      const a = document.createElement("a");
      a.href = p.links.demo;
      a.target = "_blank";
      a.rel = "noreferrer";
      a.textContent = "Live";
      links.appendChild(a);
    }

    if (p.links?.code) {
      const a = document.createElement("a");
      a.href = p.links.code;
      a.target = "_blank";
      a.rel = "noreferrer";
      a.textContent = "Code";
      links.appendChild(a);
    }

    card.appendChild(h);
    card.appendChild(desc);
    card.appendChild(tags);
    card.appendChild(links);
    grid.appendChild(card);
  });

  const projectsCount = document.getElementById("projectsCount");
  if (projectsCount) projectsCount.textContent = `${projects.length}+`;
}

function renderSkills() {
  const wrap = document.getElementById("skillsChips");
  if (!wrap) return;

  wrap.innerHTML = "";
  skills.forEach((s) => {
    const chip = document.createElement("span");
    chip.className = "chip";
    chip.textContent = s;
    wrap.appendChild(chip);
  });
}

function setupContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  const hint = document.getElementById("formHint");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);

    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();

    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\nFrom: ${name} (${email})`);

    // TODO: replace with your actual email
    const to = "yourname@example.com";
    const mailto = `mailto:${to}?subject=${subject}&body=${body}`;

    if (hint) hint.textContent = "Opening your email client…";
    window.location.href = mailto;
  });
}

function setupThemeToggle() {
  const btn = document.getElementById("themeToggle");
  if (!btn) return;

  btn.addEventListener("click", () => {
    const isLight = document.documentElement.getAttribute("data-theme") === "light";
    setTheme(isLight ? "dark" : "light");
  });
}

function hydrateMeta() {
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  const resumeLink = document.getElementById("resumeLink");
  if (resumeLink) {
    resumeLink.addEventListener("click", (e) => {
      e.preventDefault();
      alert("Add your resume file and update this link.");
    });
  }

  const yearsExp = document.getElementById("yearsExp");
  if (yearsExp) yearsExp.textContent = "1+";
}

setTheme(getInitialTheme());
renderProjects();
renderSkills();
setupThemeToggle();
setupContactForm();
hydrateMeta();
