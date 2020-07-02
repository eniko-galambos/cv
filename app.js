const languages = new Set(["en", "hu"]);

window.addEventListener("load", function pageLoad() {
  let elementsWithLabels = Array.from(document.querySelectorAll("[data-label]"));

  let browserLanguage = (navigator.language || navigator.userLanguage).slice(0,2);
  let language = languages.has(browserLanguage) ? browserLanguage : "en";

  fetch(`labels-${language}.json`)
    .then(function labelsFetched(result) {
      return result.json();
    })
    .then(function labelsJsonCreated(labels) {
      elementsWithLabels.forEach(function elementsWithLabelsForEach(element) {
        element.innerText = labels[element.dataset.label];
      });
    });
});

let pageUpperDecor = document.querySelector(".page-upper-decor");
window.addEventListener("scroll", function bodyScroll() {
  let endPosition = 350;

  if(document.body.scrollTop < endPosition && document.documentElement.scrollTop < endPosition) {
    let position = document.documentElement.scrollTop || document.body.scrollTop;
    let percent = position / endPosition;
    pageUpperDecor.style.transform = `scaleY(${1 - percent})`;
  } else {
    pageUpperDecor.style.transform = `scaleY(0)`;
  }
});

let handles = Array.from(document.querySelectorAll(".main-card-handle"));
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