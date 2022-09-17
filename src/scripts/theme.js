const themButton = document.getElementById("theme-change");
let darkMode = !window.localStorage.getItem("theme") ? window.matchMedia('(prefers-color-scheme: dark)').matches : window.localStorage.getItem("theme") === "dark";
const root = document.querySelector(':root');
if (!darkMode) {document.body.classList.add("light");}
function toggleDarkMode(_, first) {
  if (!first && getComputedStyle(root).getPropertyValue("--def-trans").endsWith("0s")) {
    root.style.setProperty("--def-trans", ".25s");
  }
  if (!first) {
    darkMode = !darkMode;
    window.localStorage.setItem("theme", darkMode ? "dark" : "light");
  }
  if (darkMode) {
    document.body.classList.add("light");
  } else {
    document.body.classList.remove("light");
  }
  document.querySelector(`#theme-change > div.${darkMode ? 'dark' : 'light'}`).style.display = "none";
  document.querySelector(`#theme-change > div.${darkMode ? 'light' : 'dark'}`).style.removeProperty("display");
}
window.addEventListener('storage', (event) => {if (event.key === "theme") {toggleDarkMode();}})

themButton.addEventListener("click", toggleDarkMode);
toggleDarkMode(null, true);
