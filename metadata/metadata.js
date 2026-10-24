const STORAGE_KEY = "population-map-language";
const languages = new Set(["uk", "en"]);

function setLanguage(language, save = true) {
  if (!languages.has(language)) return;

  document.documentElement.lang = language;
  document.title = language === "uk"
    ? "Метадані · Зміна чисельності населення України, 2021–2026"
    : "Metadata · Population change in Ukraine, 2021–2026";

  document.querySelectorAll("[data-language-panel]").forEach(panel => {
    panel.hidden = panel.dataset.languagePanel !== language;
  });

  document.querySelectorAll("[data-lang-text]").forEach(element => {
    element.hidden = element.dataset.langText !== language;
  });

  document.querySelectorAll("[data-language]").forEach(button => {
    const active = button.dataset.language === language;
    button.classList.toggle("btn-light", active);
    button.classList.toggle("btn-outline-light", !active);
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });

  const mapLink = document.querySelector(".map-link");
  if (mapLink) mapLink.setAttribute("aria-label", language === "uk" ? mapLink.dataset.ukLabel : mapLink.dataset.enLabel);

  document.querySelector(".language-switch")?.setAttribute(
    "aria-label",
    language === "uk" ? "Мова метаданих" : "Metadata language"
  );

  if (save) {
    try {
      window.localStorage.setItem(STORAGE_KEY, language);
    } catch {
      // The page remains functional when storage is unavailable.
    }
  }
}

document.querySelectorAll("[data-language]").forEach(button => {
  button.addEventListener("click", () => setLanguage(button.dataset.language));
});

let preferredLanguage = "uk";
try {
  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (languages.has(saved)) preferredLanguage = saved;
  else if (navigator.language.toLowerCase().startsWith("en")) preferredLanguage = "en";
} catch {
  if (navigator.language.toLowerCase().startsWith("en")) preferredLanguage = "en";
}

setLanguage(preferredLanguage, false);
