// Elements
let elementsWithLabels = Array.from(document.querySelectorAll("[data-label]"));
let pageUpperDecor = document.querySelector(".page-upper-decor");
let handles = Array.from(document.querySelectorAll(".main-card-handle"));

// Set page language
const languages = new Set(["en", "hu"]);
let browserLanguage = (navigator.language || navigator.userLanguage).slice(0,2);
let urlParamLang = new URLSearchParams(location.search).get("lang");

let pageLanguage = "en";

if(urlParamLang && languages.has(urlParamLang)) {
  pageLanguage = urlParamLang;
} else if (languages.has(browserLanguage)) {
  pageLanguage = browserLanguage;
}

fetch(`labels-${pageLanguage}.json`)
  .then(function labelsFetched(result) {
    return result.json();
  })
  .then(function labelsJsonCreated(labels) {
    elementsWithLabels.forEach(function elementsWithLabelsForEach(element) {
      element.innerText = labels[element.dataset.label];
    });
  });

// Toggle language
function onLanguageToggleClick() {
  languages.forEach(function languagesForEach(language) {
    if(language !== pageLanguage) {
      location.href = `${location.origin}?lang=${language}`;
    }
  });
}

// Open PDF
function onPdfOpen() {
  open(`resources/cv-${pageLanguage}.pdf`, '_blank');
}

// Add push animation to page decor
window.addEventListener("scroll", function bodyScroll() {
  let endPosition = 500;
  let bodyScrollTop = document.body.scrollTop;
  let documentElementScrollTop = document.documentElement.scrollTop;

  if(bodyScrollTop < endPosition && documentElementScrollTop < endPosition) {
    let position = documentElementScrollTop || document.body.scrollTop;
    let percent = position / endPosition;
    pageUpperDecor.style.transform = `scaleY(${1 - percent})`;
  } else {
    pageUpperDecor.style.transform = `scaleY(0)`;
  }
});

// Add animations and chick event to card handles
handles.forEach(function handlesForEach(handle) {
  handle.addEventListener("mouseover", function handleMouseEnter(event) {
    event.target.parentElement.parentElement.classList.add("shaking");
  });
  handle.addEventListener("mouseleave", function handleMouseLeave(event) {
    event.target.parentElement.parentElement.classList.remove("shaking");
  });
  handle.addEventListener("click", function handleClick(event) {
    let down = event.target.parentElement.parentElement.querySelector(".down");
    down.classList.remove("down")
    down.classList.add("up")

    event.target.parentElement.classList.remove("up");
    event.target.parentElement.classList.add("down");
  });
});