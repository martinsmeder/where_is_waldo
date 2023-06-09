// 4. Footer

console.log("interface.js says: this seem to be working");

const dropdownButton = document.getElementById("dropdownButton");
const dropdownMenu = document.getElementById("dropdownMenu");

dropdownButton.addEventListener("click", () => {
  dropdownMenu.classList.toggle("show");
  dropdownButton.textContent = dropdownMenu.classList.contains("show")
    ? "▲ Hide Characters ▲"
    : "▼ Show Characters ▼";
});
