async function cssCheck() {
  const csselements = document.querySelectorAll(".language-css");
  for (let i = 0; i < csselements.length; i++) {
    const csselement = csselements[i];
    header.textContent = "CSS";
    csselement.appendChild(header);
    csselement.classList.remove("language-css");
  }
}
async function htmlCheck() {
  const htmlelements = document.querySelectorAll(".language-html");
  for (let i = 0; i < htmlelements.length; i++) {
    const htmlelement = htmlelements[i];
    header.textContent = "HTML";
    htmlelement.appendChild(header);
    htmlelement.classList.remove("language-html");
  }
}
async function jsCheck() {
  const jselements = document.querySelectorAll(".language-js");
  for (let i = 0; i < jselements.length; i++) {
    const jselement = jselements[i];
    header.textContent = "JavaScript";
    jselement.appendChild(header);
    jselement.classList.remove("language-js");
  }
}
const code = document.querySelector("code");
const header = document.createElement("h1");
async function langCheck() {
  cssCheck();
  htmlCheck();
  jsCheck();
}
// setInterval(langCheck, 1000);
