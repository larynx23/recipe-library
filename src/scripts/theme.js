const themButton = document.getElementById("theme-change");
let darkMode = !window.localStorage.getItem("theme") ? window.matchMedia('(prefers-color-scheme: dark)').matches : window.localStorage.getItem("theme") === "dark";
if (!darkMode) {document.body.classList.add("light");}
function toggleDarkMode(_, first) {
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
themButton.addEventListener("click", toggleDarkMode);
toggleDarkMode(null, true);
