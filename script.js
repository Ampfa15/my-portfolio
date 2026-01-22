const STORAGE_KEY = "portfolio_theme";

const projects = [
  {
    title: "Real-time Stock Price Analysis Pipeline",
    description:
      "Developed a real-time data pipeline using Kafka and Spark Streaming to process and analyze stock market data. The project involved creating a scalable system to handle high-velocity data, perform complex event processing, and visualize the results in a live dashboard.",
    tags: ["Kafka", "Spark Streaming", "Python", "Data Engineering"],
    links: { code: "https://github.com/" },
  },
  {
    title: "E-commerce Recommendation Engine",
    description:
      "Designed and implemented a recommendation engine for an e-commerce platform using collaborative filtering techniques. The system, built with Python and scikit-learn, resulted in a 15% increase in user engagement and a 10% uplift in sales.",
    tags: ["Python", "scikit-learn", "Pandas", "Machine Learning"],
    links: { code: "https://github.com/" },
  },
  {
    title: "Cloud-based Data Warehouse for Sales Analytics",
    description:
      "Architected and deployed a data warehouse on AWS using Redshift and S3. This project involved designing ETL pipelines with Apache Airflow to aggregate data from multiple sources, enabling advanced sales analytics and reporting.",
    tags: ["AWS", "Redshift", "S3", "Airflow", "ETL"],
    links: { code: "https://github.com/" },
  },
  {
    title: "Full-Stack Web Application for Data Visualization",
    description:
      "Built a full-stack web application using React and FastAPI to visualize complex datasets. The application allows users to upload their data, select different chart types, and interact with the visualizations to gain insights.",
    tags: ["React", "FastAPI", "Python", "Full-Stack"],
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
