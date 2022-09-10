let ingredientsMultiplier = 0;
const ingredientsLi = document.querySelector("#ingredients > ul").innerHTML;
const stepsLi = document.querySelector("#steps > ol").innerHTML;

function initView() {
  document.title = `Recept - ${receipt['name']}`;
  document.querySelector("#hero > h1").textContent = receipt['name'];
  document.querySelector("#hero > img").src = `../../public/receipts/${receipt['image']}`;
  for (let i = 0; i < 3; i++) {
    document.querySelector(`#hero > table > tbody > tr:nth-child(2) > td:nth-child(${i+1})`).textContent = secsToText((i === 2) ? (receipt["times"][0] + receipt["times"][1]) : (receipt["times"][i]));
  }
  document.querySelector("body > main").classList.remove("loading");
  const ingredientsUl = document.querySelector("#ingredients > ul");
  ingredientsUl.innerHTML = "";
  ingredientsMultiplier = 1;
  receipt["ingredients"].forEach((ing, i) => {
    ingredientsUl.innerHTML += ingredientsLi.replaceAll("{{ i }}", i).replaceAll("{{ count }}", ing.count).replaceAll("{{ unit }}", ing.unit);
  });
  document.querySelector("#steps > ol").innerHTML = "";
  receipt["steps"].forEach((step) => {
    document.querySelector("#steps > ol").innerHTML += stepsLi.replaceAll("{{ step }}", step);
  });
}

function secsToText(seconds) {
  console.log(seconds);
  const timesMark = ["ó", "p", "mp"];
  let times = [Math.floor(Math.floor(seconds / 60) / 60)];
  seconds -= times[0] * 60 * 60;
  times.push(Math.floor(seconds / 60), seconds % 60);
  let toReturn = [];
  times.forEach((t, i) => {
    if (t > 0) {
      toReturn.push(`${t}${timesMark[i]}`);
    }
  })
  return toReturn.join(" ");
}

function selectStep(element) {
  const currSelected =document.querySelector("#steps > ol > li.selected");
  if (currSelected) {
    currSelected.classList.remove("selected");
  }
  element.classList.add("selected");
}

initView();