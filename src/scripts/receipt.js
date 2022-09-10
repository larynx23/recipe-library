

function selectStep(element) {
  const currSelected =document.querySelector("#steps > ol > li.selected");
  if (currSelected) {
    currSelected.classList.remove("selected");
  }
  element.classList.add("selected");
}