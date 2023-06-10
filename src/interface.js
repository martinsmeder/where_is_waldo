console.log("interface.js says: this seem to be working");

const Controller = (() => {
  const content = document.getElementById("content");
  const dropdownButton = document.getElementById("dropdownButton");
  const dropdownMenu = document.getElementById("dropdownMenu");
  const backgroundImg = document.getElementById("backgroundImg");

  let isAddingCircle = true;
  const circles = [];

  const createCircle = (x, y) => {
    const circle = document.createElement("div");
    circle.className = "circle";
    circle.style.left = `${x - 50}px`;
    circle.style.top = `${y - 50}px`;
    content.appendChild(circle);
    circles.push(circle);
  };

  const removeCircle = () => {
    if (circles.length > 0) {
      const circleToRemove = circles.pop();
      content.removeChild(circleToRemove);
    }
  };

  const handleContentClick = (event) => {
    if (event.target.closest("header") || event.target.closest("footer")) {
      return;
    }

    if (isAddingCircle) {
      const rect = backgroundImg.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      createCircle(x, y);
    } else {
      removeCircle();
    }

    isAddingCircle = !isAddingCircle;
  };

  const init = () => {
    content.addEventListener("click", handleContentClick);

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
