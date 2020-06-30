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