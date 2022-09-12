let ingredientsMultiplier = 0;
const ingredientsLi = document.querySelector("#ingredients > ul").innerHTML;
const stepsLi = document.querySelector("#steps > ol").innerHTML;

function initView() {
  document.title = `Recept - ${receipt['name']}`;
  document.querySelector("#hero > h1").textContent = receipt['name'];
  document.querySelector("#hero > img").src = `../../public/images/receipts/${receipt['image']}`;
  document.getElementById("difficulty").innerText = difficultyText[receipt["difficulty"]];
  document.getElementById("money").innerText = moneyText[receipt["money"]];
  for (let i = 0; i < 3; i++) {
    document.querySelector(`#hero > table > tbody > tr:nth-child(2) > td:nth-child(${i+1})`).textContent = secsToText((i === 2) ? (receipt["times"][0] + receipt["times"][1]) : (receipt["times"][i]));
  }
  const ingredientsUl = document.querySelector("#ingredients > ul");
  ingredientsUl.innerHTML = "";
  ingredientsMultiplier = ("defServing" in receipt ? receipt["defServing"] : 1);
  document.querySelector("#serving").value = ingredientsMultiplier;
  if (ingredientsMultiplier === 1) {
    document.getElementById("minus_ing").disabled = true;
  } else if (ingredientsMultiplier === 99) {
    document.getElementById("plus_ing").disabled = true;
  }
  receipt["ingredients"].forEach((ing, i) => {
    ingredientsUl.innerHTML += ingredientsLi.replaceAll("{{ i }}", i).replaceAll("{{ count }}", ing.count * ingredientsMultiplier).replaceAll("{{ unit }}", ing.unit);
  });
  document.querySelector("#steps > ol").innerHTML = "";
  receipt["steps"].forEach((step) => {
    document.querySelector("#steps > ol").innerHTML += stepsLi.replaceAll("{{ step }}", step);
  });
  document.querySelector("body > main").classList.remove("loading");
}

function modifyIngredientsMultiplier(add, set = false) {
  if (set === false) {
    ingredientsMultiplier += add;
    document.getElementById("serving").value = ingredientsMultiplier;
  } else {
    if (set > 99 || set < 1) {
      document.getElementById("serving").value = ingredientsMultiplier;
      return;
    } else {
      ingredientsMultiplier = set;
    }
  }
  if (ingredientsMultiplier === 99) {
    document.getElementById("plus_ing").disabled = true;
  } else {
    document.getElementById("plus_ing").disabled = false;
  }
  if (ingredientsMultiplier === 1) {
    document.getElementById("minus_ing").disabled = true;
  } else {
    document.getElementById("minus_ing").disabled = false;
  }
  receipt["ingredients"].forEach((ing, i) => {
    document.getElementById(`idata-${i}`).innerText = ing.count * ingredientsMultiplier;
  });
}

function navigateToReceipt(name) {
  if (!(name in receiptData)) {toMainPage();}
  window.history.pushState({}, '', window.location.href.slice(0, window.location.href.indexOf("?name")) + `?name=${name}`);
  receipt = receiptData[name];
  document.querySelector("body > main").classList.add("loading");
  initView();
}

function selectStep(element) {
  const currSelected =document.querySelector("#steps > ol > li.selected");
  if (currSelected) {
    currSelected.classList.remove("selected");
  }
  element.classList.add("selected");
}

initView();