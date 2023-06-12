// TO DO:
// Finish 7.
// Create Utils module and move things there
// Additional cleanup if necessary
// Continue with 10.

console.log("interface.js says: this seem to be working");

const Renderer = (() => {
  const content = document.getElementById("content");

  const createDiv = (className, text) => {
    const div = document.createElement("div");
    div.className = className;
    if (text) {
      div.textContent = text;
    }
    return div;
  };

  const setPosition = (element, x, y) => {
    const positioned = element;
    positioned.style.left = `${x}px`;
    positioned.style.top = `${y}px`;
  };

  const createFeedbackMsg = (message) => {
    const feedbackMsg = createDiv("feedback", message);
    feedbackMsg.style.background = "rgba(255, 0, 0, 0.7)";
    content.appendChild(feedbackMsg);
  };

  const createLink = (text) => {
    const link = document.createElement("a");
    link.textContent = text;
    link.href = "#";
    return link;
  };

  const createPopup = (x, y) => {
    const popup = createDiv("choice");
    setPosition(popup, x + 60, y - 70);

    const options = ["Bowser", "Neo", "Waldo"];
    options.forEach((option) => {
      const choice = createLink(option);
      choice.addEventListener("click", () => {
        popup.remove();
        createFeedbackMsg("Keep looking!");
      });
      popup.appendChild(choice);
    });

    content.appendChild(popup);
  };

  const showOverlay = () => {
    const overlay = document.getElementById("overlay");
    overlay.style.display = "flex";
  };

  const hideOverlay = () => {
    const overlay = document.getElementById("overlay");
    overlay.style.display = "none";
  };

  return {
    setPosition,
    createDiv,
    createPopup,
    createFeedbackMsg,
    showOverlay,
    hideOverlay,
  };
})();

const Controller = (() => {
  const content = document.getElementById("content");
  const dropdownButton = document.getElementById("dropdownButton");
  const dropdownMenu = document.getElementById("dropdownMenu");
  const backgroundImg = document.getElementById("backgroundImg");
  const startButton = document.getElementById("startButton");

  let isGameStarted = false;
  let isAddingCircle = true;
  const circles = [];

  const createCircle = (x, y) => {
    const circle = Renderer.createDiv("circle");
    Renderer.setPosition(circle, x - 50, y - 50);
    content.appendChild(circle);
    circles.push(circle);
  };

  const removeCircle = () => {
    if (circles.length > 0) {
      const circleToRemove = circles.pop();
      content.removeChild(circleToRemove);
    }
  };

  const getCoordinates = (event) => {
    const rect = backgroundImg.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    return { x, y };
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const formattedHours = String(hours).padStart(2, "0");
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds % 60).padStart(2, "0");
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  };

  const startTimer = () => {
    const timerElement = document.getElementById("timer");
    let seconds = 0;

    const updateTimer = () => {
      seconds++;
      const formattedTime = formatTime(seconds);
      timerElement.textContent = formattedTime;
    };

    setInterval(updateTimer, 1000);
  };

  const startGame = () => {
    if (!isGameStarted) {
      Renderer.hideOverlay();
      startTimer();
      isGameStarted = true;
    }
  };

  const handleContentClick = (event) => {
    if (event.target.closest("header") || event.target.closest("footer")) {
      return;
    }

    if (isAddingCircle) {
      const { x, y } = getCoordinates(event);
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

    startButton.addEventListener("click", startGame);

    Renderer.showOverlay();
  };

  return {
    init,
  };
})();

Controller.init();
