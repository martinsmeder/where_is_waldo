console.log("interface.js says: this seem to be working");

const Controller = (() => {
  const content = document.getElementById("content");
  const dropdownButton = document.getElementById("dropdownButton");
  const dropdownMenu = document.getElementById("dropdownMenu");

  const createCircle = (x, y) => {
    const circle = document.createElement("div");
    circle.className = "circle";
    circle.style.left = `${x}px`;
    circle.style.top = `${y}px`;
    content.appendChild(circle);
  };

  const init = () => {
    content.addEventListener("click", (event) => {
      const x = event.clientX - content.offsetLeft;
      const y = event.clientY - content.offsetTop;
      console.log("Click registered");
      createCircle(x, y);
    });

    dropdownButton.addEventListener("click", () => {
      dropdownMenu.classList.toggle("show");
      dropdownButton.textContent = dropdownMenu.classList.contains("show")
        ? "▲ Hide Characters ▲"
        : "▼ Show Characters ▼";
    });
  };

  return {
    init,
  };
})();

Controller.init();
