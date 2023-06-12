// TO DO:
// Finish 9.
// Do 7.
// Move logic to app-logic.js if needed
// Continue with 10.

console.log("interface.js says: this seem to be working");

const Renderer = (() => {
  const content = document.getElementById("content");

  const createFeedbackMsg = (message) => {
    const feedbackMsg = document.createElement("div");
    feedbackMsg.className = "feedback-msg";
    feedbackMsg.textContent = message;

    content.appendChild(feedbackMsg);

    setTimeout(() => {
      feedbackMsg.style.opacity = "0";
      setTimeout(() => {
        feedbackMsg.remove();
      }, 1000);
    }, 5000);
  };

  const createPopup = (x, y) => {
    const popup = document.createElement("div");
    popup.className = "popup";

    popup.style.left = `${x + 60}px`;
    popup.style.top = `${y - 70}px`;

    const options = ["Bowser", "Neo", "Waldo"];
    options.forEach((option) => {
      const choice = document.createElement("a");
      choice.textContent = option;
      choice.href = "#";
      choice.addEventListener("click", () => {
        popup.remove();
        createFeedbackMsg("Keep looking!");
      });
      popup.appendChild(choice);
    });

    content.appendChild(popup);
  };

  return {
    createPopup,
    createFeedbackMsg,
  };
})();

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
      Renderer.createPopup(x, y);
    } else {
      removeCircle();
      const popup = document.querySelector(".popup");
      if (popup) {
        popup.remove();
      }
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
