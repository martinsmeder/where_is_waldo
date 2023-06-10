console.log("interface.js says: this seem to be working");

const Controller = (() => {
  const content = document.getElementById("content");
  const dropdownButton = document.getElementById("dropdownButton");
  const dropdownMenu = document.getElementById("dropdownMenu");
  const backgroundImg = document.getElementById("backgroundImg");
  const header = document.querySelector("header");
  const circles = [];

  const createCircle = (x, y) => {
    console.log("Clicked position: ", x, y);
    console.log("Header height: ", header.offsetHeight);

    // Check if the click event occurred within the header
    if (y < header.offsetHeight) {
      console.log("Clicked within the header. Circle not added.");
      return;
    }

    const circle = document.createElement("div");
    circle.className = "circle";
    circle.style.left = `${x - 25}px`; // Adjusted x position
    circle.style.top = `${y - 25}px`; // Adjusted y position
    content.appendChild(circle);
    circles.push(circle);
  };
  const removeCircle = () => {
    if (circles.length > 0) {
      const circleToRemove = circles.pop();
      content.removeChild(circleToRemove);
    }
  };

  const init = () => {
    let isAddingCircle = true;

    content.addEventListener("click", (event) => {
      if (isAddingCircle) {
        const rect = backgroundImg.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        createCircle(x, y);
      } else {
        removeCircle();
      }

      isAddingCircle = !isAddingCircle;
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
