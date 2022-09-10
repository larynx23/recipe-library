const stepsList = Array.from(document.querySelector("#steps > ol").children);
function selectStep(e) {
  const currSelected =document.querySelector("#steps > ol > li.selected");
  if (currSelected) {
    currSelected.classList.remove("selected");
  }
  e.classList.add("selected");
}
