import * as maplibregl from "https://unpkg.com/maplibre-gl@6.15.0/dist/maplibre-gl.mjs";

const YEARS = [2021, 2022, 2023, 2024, 2025, 2026];
const POP_BREAKS = [5000, 10000, 25000, 50000, 100000, 250000, 500000];
const VIRIDIS_COLORS = ["#440154", "#46307e", "#355e8d", "#27808e", "#1fa188", "#46c06f", "#a2da37", "#fde725"];
const POP_COLORS = VIRIDIS_COLORS;
const CHANGE_BREAKS = [-25, -20, -15, -10, -5, 0, 5];
const CHANGE_COLORS = VIRIDIS_COLORS;
const TRANSLATIONS = {
  uk: {
    pageTitle: "Зміна чисельності населення України · 2021–2026",
    pageDescription: "Інтерактивна карта зміни чисельності населення територій України у 2021–2026 роках.",
    eyebrow: "Україна · Дослідження",
    title: "Динаміка населення",
    subtitle: "Зміни чисельності населення у 2021–2026 роках. За даними worldpop.org",
    languageLabel: "Мова інтерфейсу",
    mapControls: "Керування картою",
    findArea: "Знайти територію",
    searchPlaceholder: "Назва, область або код",
    mapDisplay: "Відображення карти",
    population: "Населення",
    changeSince: "Зміна з 2021 р.",
    year: "Рік",
    totalPopulation: "Загальна чисельність",
    loadingShort: "Завантаження…",
    annualChange: "Річна зміна",
    areaDetail: "Відомості про громаду",
    selectHelp: "Натисніть полігон або знайдіть назву, щоб переглянути динаміку чисельності.",
    populationTimeline: "Часова шкала населення",
    mapYear: "Рік карти",
    mapLegend: "Легенда карти",
    aboutData: "Про дані",
    closeInformation: "Закрити інформацію",
    dataNote: "Примітка про дані",
    prototypeShows: "Що це за дані?",
    sourceDescription: "Геодані містять 1 780 полігонів адміністративних меж громад, та інформацію про зміни чисельності — від <code>p2021</code> до <code>p2026</code>. Система координат - WGS 84. Полігони меж громад спрощено для ефективнішого відображення у вебі.",
    scopeDescription: "Кількість мешканців для кожного окремого полігону громади розрахована за формулою:",
    formulaLabel: "P з індексом j дорівнює сумі за i: V з індексом i, помноженому на відношення площі перетину C з індексом i та H з індексом j до площі C з індексом i",
    populationTrend: "Динаміка чисельності населення у 2021–2026 роках",
    creatorCredit: "Набір даних для цієї карти створив <a href=\"https://oleksaboyko.com\" target=\"_blank\" rel=\"noopener noreferrer\">Олексій Бойко</a>, аспірант кафедри регіоналістики і туризму Київського національного економічного університету імені Вадима Гетьмана (КНЕУ). Репозиторій і сайт на GitHub Pages створено за допомогою OpenAI GPT-5.6 Sol.",
    projectLicense: "Оригінальні матеріали цього проєкту поширюються за ліцензією <a href=\"https://creativecommons.org/licenses/by-sa/4.0/\" target=\"_blank\" rel=\"license noopener noreferrer\">Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)</a>. Матеріали третіх сторін зберігають власні ліцензії.",
    worldPopCredit: "Вихідні дані про населення: <a href=\"https://hub.worldpop.org/geodata/summary?id=75852\" target=\"_blank\" rel=\"noopener noreferrer\">WorldPop — Individual countries 2015–2030 (100 m), R2025A v1</a>. Пов’язана сторінка метаданих описує оцінку кількості населення України за 2022 рік у комірках сітки розміром 3 кутові секунди (приблизно 100 м). Дані WorldPop поширюються за ліцензією <a href=\"https://creativecommons.org/licenses/by/4.0/\" target=\"_blank\" rel=\"license noopener noreferrer\">Creative Commons Attribution 4.0 International (CC BY 4.0)</a>.",
    preparing: "Підготовка 1 780 територій…",
    play: "Відтворити анімацію",
    pause: "Призупинити анімацію",
    baseline: "Базовий рік",
    noData: "Немає даних",
    populationIn: year => `Населення у ${year} році`,
    changeFrom: year => `Зміна з 2021 до ${year} року`,
    noMatch: "Територій не знайдено",
    unnamedArea: "Територія без назви",
    administrativeArea: "Адміністративна територія",
    since2021: "з 2021 року",
    dataLoadErrorTitle: "Не вдалося завантажити дані карти",
    dataLoadErrorHelp: "Запустіть теку через <code>./serve-local.sh</code> або GitHub Pages і спробуйте ще раз."
  },
  en: {
    pageTitle: "Population change in Ukraine · 2021–2026",
    pageDescription: "Explore population change across Ukraine's local administrative areas from 2021 to 2026.",
    eyebrow: "Ukraine · Research",
    title: "Population through time",
    subtitle: "Population change in 2021–2026. Based on data from worldpop.org",
    languageLabel: "Interface language",
    mapControls: "Map controls",
    findArea: "Find an area",
    searchPlaceholder: "Name, oblast or code",
    mapDisplay: "Map display",
    population: "Population",
    changeSince: "Change since 2021",
    year: "Year",
    totalPopulation: "Total population",
    loadingShort: "Loading…",
    annualChange: "Annual change",
    areaDetail: "Community information",
    selectHelp: "Click a polygon or search by name to view population change.",
    populationTimeline: "Population timeline",
    mapYear: "Map year",
    mapLegend: "Map legend",
    aboutData: "About the data",
    closeInformation: "Close information",
    dataNote: "Data note",
    prototypeShows: "What are these data?",
    sourceDescription: "The geodata contain 1,780 polygons representing community administrative boundaries and information on population change, from <code>p2021</code> to <code>p2026</code>. The coordinate reference system is WGS 84. Community boundary polygons were simplified for more efficient web display.",
    scopeDescription: "The number of residents in each community polygon was calculated using the formula:",
    formulaLabel: "P sub j equals the sum over i of V sub i multiplied by the area of the intersection of C sub i and H sub j divided by the area of C sub i",
    populationTrend: "Population trend from 2021 to 2026",
    creatorCredit: "The mapped dataset was created by <a href=\"https://oleksaboyko.com\" target=\"_blank\" rel=\"noopener noreferrer\">Oleksii Boiko</a>, a PhD student at the Department of Regional Studies and Tourism, Kyiv National Economic University named after Vadym Hetman (KNEU). This repository and its GitHub Pages site were created with assistance from OpenAI GPT-5.6 Sol.",
    projectLicense: "The original material in this project is licensed under the <a href=\"https://creativecommons.org/licenses/by-sa/4.0/\" target=\"_blank\" rel=\"license noopener noreferrer\">Creative Commons Attribution-ShareAlike 4.0 International licence (CC BY-SA 4.0)</a>. Third-party material retains its original licence.",
    worldPopCredit: "Source population data: <a href=\"https://hub.worldpop.org/geodata/summary?id=75852\" target=\"_blank\" rel=\"noopener noreferrer\">WorldPop — Individual countries 2015–2030 (100 m), R2025A v1</a>. The linked metadata record describes the 2022 Ukraine population-count estimate in 3-arc-second grid cells (approximately 100 m). WorldPop data are licensed under the <a href=\"https://creativecommons.org/licenses/by/4.0/\" target=\"_blank\" rel=\"license noopener noreferrer\">Creative Commons Attribution 4.0 International licence (CC BY 4.0)</a>.",
    preparing: "Preparing 1,780 areas…",
    play: "Play animation",
    pause: "Pause animation",
    baseline: "Baseline",
    noData: "No data",
    populationIn: year => `Population in ${year}`,
    changeFrom: year => `Change from 2021 to ${year}`,
    noMatch: "No matching area",
    unnamedArea: "Unnamed area",
    administrativeArea: "Administrative area",
    since2021: "since 2021",
    dataLoadErrorTitle: "The map data could not be loaded",
    dataLoadErrorHelp: "Serve this folder through <code>./serve-local.sh</code> or GitHub Pages, then try again."
  }
};

const elements = {
  loading: document.querySelector("#loading"),
  slider: document.querySelector("#year-slider"),
  yearDisplay: document.querySelector("#year-display"),
  timelineLabel: document.querySelector("#timeline-label"),
  play: document.querySelector("#play-button"),
  summaryYear: document.querySelector("#summary-year"),
  summaryTotal: document.querySelector("#summary-total"),
  summaryChange: document.querySelector("#summary-change"),
  legend: document.querySelector("#legend"),
  selection: document.querySelector("#selection"),
  search: document.querySelector("#area-search"),
  searchResults: document.querySelector("#search-results"),
  infoButton: document.querySelector("#info-button"),
  infoDialog: document.querySelector("#info-dialog"),
  closeInfo: document.querySelector("#close-info")
};

const state = {
  year: 2021,
  mode: "population",
  data: null,
  totals: new Map(),
  selectedId: null,
  selectedFeature: null,
  hoveredId: null,
  timer: null,
  language: "uk"
};

function t(key, ...parameters) {
  const value = TRANSLATIONS[state.language][key];
  return typeof value === "function" ? value(...parameters) : value;
}

function numberFormatter() {
  return new Intl.NumberFormat(state.language === "uk" ? "uk-UA" : "en-US", { maximumFractionDigits: 0 });
}

function percentFormatter() {
  return new Intl.NumberFormat(state.language === "uk" ? "uk-UA" : "en", { maximumFractionDigits: 1, signDisplay: "always" });
}

const map = new maplibregl.Map({
  container: "map",
  style: {
    version: 8,
    sources: {
      openstreetmap: {
        type: "raster",
        tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
        tileSize: 256,
        maxzoom: 19,
        attribution: "© OpenStreetMap contributors"
      }
    },
    layers: [
      { id: "background", type: "background", paint: { "background-color": "#dce8e8" } },
      { id: "openstreetmap", type: "raster", source: "openstreetmap", paint: { "raster-opacity": 0.82, "raster-saturation": -0.35 } }
    ]
  },
  center: [31.2, 48.5],
  zoom: 4.8,
  minZoom: 3,
  maxZoom: 11,
  attributionControl: false
});

map.on("error", event => console.error("MAPLIBRE_ERROR", event.error?.message || event));
map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right");
map.addControl(new maplibregl.AttributionControl({ compact: true, customAttribution: "Population data · simplified for web display" }));

function fieldForYear(year = state.year) {
  return `p${year}`;
}

function populationExpression() {
  const expression = ["step", ["coalesce", ["get", fieldForYear()], 0], POP_COLORS[0]];
  POP_BREAKS.forEach((value, index) => expression.push(value, POP_COLORS[index + 1]));
  return expression;
}

function changeExpression() {
  const change = [
    "*", 100,
    ["/", ["-", ["get", fieldForYear()], ["get", "p2021"]], ["max", ["get", "p2021"], 1]]
  ];
  const expression = ["step", change, CHANGE_COLORS[0]];
  CHANGE_BREAKS.forEach((value, index) => expression.push(value, CHANGE_COLORS[index + 1]));
  return expression;
}

function updateMapStyle() {
  if (!map.getLayer("areas-fill")) return;
  map.setPaintProperty("areas-fill", "fill-color", state.mode === "population" ? populationExpression() : changeExpression());
  renderLegend();
}

function formatPopulation(value) {
  return Number.isFinite(value) ? numberFormatter().format(Math.round(value)) : t("noData");
}

function formatChange(current, baseline) {
  if (!Number.isFinite(current) || !Number.isFinite(baseline) || baseline === 0) return "—";
  return `${percentFormatter().format(((current - baseline) / baseline) * 100)}%`;
}

function setChangeClass(element, value) {
  element.classList.toggle("positive", value > 0);
  element.classList.toggle("negative", value < 0);
}

function renderSummary() {
  const total = state.totals.get(state.year);
  const previous = state.totals.get(state.year - 1);
  const delta = state.year === YEARS[0] ? null : ((total - previous) / previous) * 100;
  elements.summaryYear.textContent = state.year;
  elements.summaryTotal.textContent = formatPopulation(total);
  elements.summaryChange.textContent = delta === null ? t("baseline") : `${percentFormatter().format(delta)}%`;
  setChangeClass(elements.summaryChange, delta ?? 0);
}

function renderLegend() {
  const breaks = state.mode === "population" ? POP_BREAKS : CHANGE_BREAKS;
  const colors = state.mode === "population" ? POP_COLORS : CHANGE_COLORS;
  const labels = [];

  if (state.mode === "population") {
    labels.push(`<span class="legend-item"><i class="legend-swatch" style="background:${colors[0]}"></i>&lt; ${numberFormatter().format(breaks[0])}</span>`);
    breaks.slice(0, -1).forEach((value, index) => {
      labels.push(`<span class="legend-item"><i class="legend-swatch" style="background:${colors[index + 1]}"></i>${numberFormatter().format(value)}–${numberFormatter().format(breaks[index + 1])}</span>`);
    });
    labels.push(`<span class="legend-item"><i class="legend-swatch" style="background:${colors.at(-1)}"></i>≥ ${numberFormatter().format(breaks.at(-1))}</span>`);
  } else {
    labels.push(`<span class="legend-item"><i class="legend-swatch" style="background:${colors[0]}"></i>&lt; ${breaks[0]}%</span>`);
    breaks.slice(0, -1).forEach((value, index) => {
      labels.push(`<span class="legend-item"><i class="legend-swatch" style="background:${colors[index + 1]}"></i>${value}% to ${breaks[index + 1]}%</span>`);
    });
    labels.push(`<span class="legend-item"><i class="legend-swatch" style="background:${colors.at(-1)}"></i>≥ ${breaks.at(-1)}%</span>`);
  }

  elements.legend.innerHTML = labels.join("");
}

function createSparkline(properties) {
  const values = YEARS.map(year => Number(properties[fieldForYear(year)]));
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = Math.max(max - min, 1);
  const points = values.map((value, index) => {
    const x = 8 + index * (264 / (YEARS.length - 1));
    const y = 47 - ((value - min) / range) * 36;
    return [x, y];
  });
  const line = points.map(point => point.join(",")).join(" ");
  const area = `8,51 ${line} 272,51`;
  const dots = points.map(([x, y], index) => {
    const current = YEARS[index] === state.year;
    return `<circle class="sparkline-dot${current ? " is-current" : ""}" cx="${x}" cy="${y}" r="${current ? 4 : 2.5}"></circle>`;
  }).join("");
  const series = YEARS.map((year, index) => `${year}: ${formatPopulation(values[index])}`).join(", ");
  const startLabel = `${YEARS[0]} · ${formatPopulation(values[0])}`;
  const endLabel = `${YEARS.at(-1)} · ${formatPopulation(values.at(-1))}`;
  return `<svg class="sparkline" viewBox="0 0 280 74" role="img" aria-label="${t("populationTrend")}: ${series}"><title>${t("populationTrend")}: ${series}</title><polygon class="sparkline-area" points="${area}"></polygon><polyline class="sparkline-path" pathLength="1" points="${line}"></polyline>${dots}<g class="sparkline-values" aria-hidden="true"><text x="8" y="69">${startLabel}</text><text x="272" y="69" text-anchor="end">${endLabel}</text></g></svg>`;
}

function renderSelection() {
  if (!state.selectedFeature) {
    elements.selection.innerHTML = `
      <p class="selection-kicker">${t("areaDetail")}</p>
      <p>${t("selectHelp")}</p>
    `;
    return;
  }
  const properties = state.selectedFeature.properties;
  const current = Number(properties[fieldForYear()]);
  const baseline = Number(properties.p2021);
  const change = ((current - baseline) / baseline) * 100;
  const place = [properties.ADMIN_2, properties.ADMIN_1].filter(Boolean).join(" · ");
  const trend = formatChange(current, baseline);

  elements.selection.innerHTML = `
    <p class="selection-kicker">${properties.TYPE || t("administrativeArea")}</p>
    <h2>${properties.ADMIN_3 || t("unnamedArea")}</h2>
    <p class="selection-meta">${place || properties.unit_id}</p>
    <div class="selection-value-row">
      <strong>${formatPopulation(current)}</strong>
      <span class="${change > 0 ? "positive" : change < 0 ? "negative" : ""}">${state.year === 2021 ? t("baseline") : `${trend} ${t("since2021")}`}</span>
    </div>
    ${createSparkline(properties)}
  `;
}

function setYear(year) {
  state.year = Number(year);
  elements.slider.value = state.year;
  elements.yearDisplay.textContent = state.year;
  elements.timelineLabel.textContent = state.mode === "population" ? t("populationIn", state.year) : t("changeFrom", state.year);
  updateMapStyle();
  renderSummary();
  renderSelection();
}

function stopAnimation() {
  window.clearInterval(state.timer);
  state.timer = null;
  elements.play.classList.remove("playing");
  elements.play.setAttribute("aria-pressed", "false");
  elements.play.setAttribute("aria-label", t("play"));
}

function startAnimation() {
  if (state.timer) return stopAnimation();
  if (state.year === YEARS.at(-1)) setYear(YEARS[0]);
  elements.play.classList.add("playing");
  elements.play.setAttribute("aria-pressed", "true");
  elements.play.setAttribute("aria-label", t("pause"));
  state.timer = window.setInterval(() => {
    const index = YEARS.indexOf(state.year);
    if (index === YEARS.length - 1) {
      stopAnimation();
      return;
    }
    setYear(YEARS[index + 1]);
  }, 1350);
}

function coordinatesBounds(geometry) {
  const bounds = new maplibregl.LngLatBounds();
  const visitCoordinates = coordinates => {
    if (!coordinates) return;
    if (typeof coordinates[0] === "number") bounds.extend(coordinates);
    else coordinates.forEach(visitCoordinates);
  };
  const visitGeometry = item => {
    if (!item) return;
    if (item.type === "GeometryCollection") item.geometries.forEach(visitGeometry);
    else visitCoordinates(item.coordinates);
  };
  visitGeometry(geometry);
  return bounds;
}

function selectFeature(feature, zoom = true) {
  if (!feature) return;
  if (state.selectedId !== null) map.setFeatureState({ source: "areas", id: state.selectedId }, { selected: false });
  state.selectedId = feature.id;
  state.selectedFeature = feature;
  map.setFeatureState({ source: "areas", id: state.selectedId }, { selected: true });
  renderSelection();

  const panel = elements.selection.closest(".control-card");
  window.requestAnimationFrame(() => {
    if (panel.scrollHeight <= panel.clientHeight) return;
    panel.scrollTo({
      top: panel.scrollHeight,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"
    });
  });

  if (zoom) map.fitBounds(coordinatesBounds(feature.geometry), { padding: 90, maxZoom: 8.2, duration: 900 });
}

function searchableText(feature) {
  const p = feature.properties;
  return [p.ADMIN_3, p.ADMIN_2, p.ADMIN_1, p.TYPE, p.unit_id].filter(Boolean).join(" ").toLocaleLowerCase("uk");
}

function renderSearchResults(query) {
  const normalized = query.trim().toLocaleLowerCase("uk");
  if (normalized.length < 2) {
    elements.searchResults.hidden = true;
    elements.searchResults.innerHTML = "";
    return;
  }
  const matches = state.data.features
    .map(feature => {
      const name = String(feature.properties.ADMIN_3 || "").toLocaleLowerCase("uk");
      const score = name === normalized ? 0 : name.startsWith(normalized) ? 1 : name.includes(normalized) ? 2 : searchableText(feature).includes(normalized) ? 3 : 99;
      return { feature, score };
    })
    .filter(item => item.score < 99)
    .sort((a, b) => a.score - b.score)
    .slice(0, 8)
    .map(item => item.feature);
  if (!matches.length) {
    elements.searchResults.innerHTML = `<li><button type="button" disabled>${t("noMatch")}</button></li>`;
  } else {
    elements.searchResults.innerHTML = matches.map(feature => {
      const p = feature.properties;
      const meta = [p.ADMIN_2, p.ADMIN_1].filter(Boolean).join(" · ");
      return `<li><button type="button" data-unit="${p.unit_id}"><strong>${p.ADMIN_3 || t("unnamedArea")}</strong><span>${meta || p.TYPE || p.unit_id}</span></button></li>`;
    }).join("");
  }
  elements.searchResults.hidden = false;
}

async function initialize() {
  try {
    const [data] = await Promise.all([
      fetch("data/admin3-population.geojson").then(response => {
        if (!response.ok) throw new Error(`Data request failed: ${response.status}`);
        return response.json();
      }),
      new Promise(resolve => map.once("load", resolve))
    ]);

    state.data = data;
    data.features.forEach((feature, index) => {
      feature.id = index;
      YEARS.forEach(year => state.totals.set(year, (state.totals.get(year) || 0) + Number(feature.properties[fieldForYear(year)] || 0)));
    });

    map.addSource("areas", { type: "geojson", data });
    map.addLayer({
      id: "areas-fill",
      type: "fill",
      source: "areas",
      paint: {
        "fill-color": populationExpression(),
        "fill-opacity": ["case", ["boolean", ["feature-state", "selected"], false], 0.92, ["boolean", ["feature-state", "hover"], false], 0.82, 0.68]
      }
    });
    map.addLayer({
      id: "areas-outline",
      type: "line",
      source: "areas",
      paint: {
        "line-color": ["case", ["boolean", ["feature-state", "selected"], false], "#101820", ["boolean", ["feature-state", "hover"], false], "#ffffff", "rgba(26,39,48,0.34)"],
        "line-width": ["case", ["boolean", ["feature-state", "selected"], false], 2.2, ["boolean", ["feature-state", "hover"], false], 1.4, 0.45]
      }
    });

    map.jumpTo({ center: [31.2, 48.5], zoom: 4.4 });

    const popup = new maplibregl.Popup({ closeButton: false, closeOnClick: false, offset: 10 });
    map.on("mousemove", "areas-fill", event => {
      const feature = event.features?.[0];
      if (!feature) return;
      map.getCanvas().style.cursor = "pointer";
      if (state.hoveredId !== null && state.hoveredId !== feature.id) map.setFeatureState({ source: "areas", id: state.hoveredId }, { hover: false });
      state.hoveredId = feature.id;
      map.setFeatureState({ source: "areas", id: state.hoveredId }, { hover: true });
      const current = Number(feature.properties[fieldForYear()]);
      const metric = state.mode === "population" ? formatPopulation(current) : `${formatChange(current, Number(feature.properties.p2021))} ${t("since2021")}`;
      popup.setLngLat(event.lngLat).setHTML(`<div class="map-tooltip"><strong>${feature.properties.ADMIN_3 || t("unnamedArea")}</strong><span>${state.year}: ${metric}</span></div>`).addTo(map);
    });
    map.on("mouseleave", "areas-fill", () => {
      map.getCanvas().style.cursor = "grab";
      if (state.hoveredId !== null) map.setFeatureState({ source: "areas", id: state.hoveredId }, { hover: false });
      state.hoveredId = null;
      popup.remove();
    });
    map.on("click", "areas-fill", event => selectFeature(event.features?.[0], false));

    renderLegend();
    renderSummary();
    window.clearTimeout(window.mapStartupTimeout);
    elements.loading.classList.add("hidden");
  } catch (error) {
    console.error(error);
    window.clearTimeout(window.mapStartupTimeout);
    elements.loading.classList.add("error");
    elements.loading.innerHTML = `
      <div class="loading-message">
        <strong>${t("dataLoadErrorTitle")}</strong>
        <span>${t("dataLoadErrorHelp")}</span>
      </div>
    `;
  }
}

function applyTranslations() {
  document.documentElement.lang = state.language;
  document.title = t("pageTitle");
  document.querySelector('meta[name="description"]').setAttribute("content", t("pageDescription"));
  document.querySelectorAll("[data-i18n]").forEach(element => {
    element.textContent = t(element.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-html]").forEach(element => {
    element.innerHTML = t(element.dataset.i18nHtml);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach(element => {
    element.setAttribute("placeholder", t(element.dataset.i18nPlaceholder));
  });
  document.querySelectorAll("[data-i18n-aria]").forEach(element => {
    element.setAttribute("aria-label", t(element.dataset.i18nAria));
  });
  document.querySelectorAll("[data-language]").forEach(button => {
    const active = button.dataset.language === state.language;
    button.classList.toggle("active", active);
    button.classList.toggle("btn-primary", active);
    button.classList.toggle("btn-outline-primary", !active);
    button.setAttribute("aria-pressed", String(active));
  });
  document.querySelectorAll(".mode-button").forEach(button => {
    const active = button.dataset.mode === state.mode;
    button.classList.toggle("btn-primary", active);
    button.classList.toggle("btn-outline-primary", !active);
  });
  elements.play.setAttribute("aria-label", state.timer ? t("pause") : t("play"));
  setYear(state.year);
  renderSearchResults(elements.search.value);
}

function setLanguage(language) {
  if (!TRANSLATIONS[language]) return;
  state.language = language;
  try {
    window.localStorage.setItem("population-map-language", language);
  } catch {
    // Language persistence is optional.
  }
  applyTranslations();
}

elements.slider.addEventListener("input", event => {
  stopAnimation();
  setYear(event.target.value);
});
elements.play.addEventListener("click", startAnimation);
elements.search.addEventListener("input", event => renderSearchResults(event.target.value));
elements.searchResults.addEventListener("click", event => {
  const button = event.target.closest("button[data-unit]");
  if (!button) return;
  const feature = state.data.features.find(item => item.properties.unit_id === button.dataset.unit);
  selectFeature(feature);
  elements.search.value = feature.properties.ADMIN_3 || feature.properties.unit_id;
  elements.searchResults.hidden = true;
});
document.addEventListener("click", event => {
  if (!event.target.closest(".search-wrap") && !event.target.closest(".search-results")) elements.searchResults.hidden = true;
});
document.querySelectorAll(".mode-button").forEach(button => button.addEventListener("click", () => {
  state.mode = button.dataset.mode;
  document.querySelectorAll(".mode-button").forEach(item => {
    const active = item === button;
    item.classList.toggle("active", active);
    item.classList.toggle("btn-primary", active);
    item.classList.toggle("btn-outline-primary", !active);
    item.setAttribute("aria-pressed", String(active));
  });
  setYear(state.year);
}));
document.querySelectorAll("[data-language]").forEach(button => button.addEventListener("click", () => setLanguage(button.dataset.language)));
elements.infoButton.addEventListener("click", () => elements.infoDialog.showModal());
elements.closeInfo.addEventListener("click", () => elements.infoDialog.close());
elements.infoDialog.addEventListener("click", event => {
  if (event.target === elements.infoDialog) elements.infoDialog.close();
});

try {
  const savedLanguage = window.localStorage.getItem("population-map-language");
  if (TRANSLATIONS[savedLanguage]) state.language = savedLanguage;
} catch {
  // Local storage may be unavailable in privacy-restricted contexts.
}
applyTranslations();
initialize();
