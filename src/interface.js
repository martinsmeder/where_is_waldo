// TO DO:
// Fix bug that scrolls user up when feedback message is shown, should be displayed where it is
// Create Utils module and move things there
// Additional cleanup if necessary
// Continue with 10.

console.log("interface.js says: this seem to be working");

const Renderer = (() => {
  const content = document.getElementById("content");
  const overlay = document.getElementById("overlay");

  const circles = [];
  const popups = [];

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

  const createLink = (text, clickHandler) => {
    const link = document.createElement("a");
    link.textContent = text;
    link.href = "#";
    link.addEventListener("click", clickHandler);
    return link;
  };

  const showOverlay = () => {
    overlay.style.display = "flex";
  };

  const hideOverlay = () => {
    overlay.style.display = "none";
  };

  const removeElement = (element) => {
    if (element.parentNode) {
      element.parentNode.removeChild(element);
    }
  };

  const removeCircle = () => {
    if (circles.length > 0) {
      const circleToRemove = circles.pop();
      removeElement(circleToRemove);
    }
  };

  const createCircle = (x, y) => {
    const circle = createDiv("circle");
    setPosition(circle, x - 50, y - 50);
    content.appendChild(circle);
    circles.push(circle);
  };

  const removePopup = () => {
    if (popups.length > 0) {
      const popupToRemove = popups.pop();
      removeElement(popupToRemove);
    }
  };

  const createPopup = (x, y) => {
    const popup = createDiv("choice");
    setPosition(popup, x + 60, y - 70);

    const options = ["Bowser", "Neo", "Waldo"];
    options.forEach((option) => {
      const choice = Renderer.createLink(option, () => {
        removePopup();
        console.log(`Clicked on: ${option}`);
        createFeedbackMsg("Keep looking!");
      });
      popup.appendChild(choice);
    });

    content.appendChild(popup);
    popups.push(popup);
  };

  return {
    circles,
    popups,
    createDiv,
    setPosition,
    createFeedbackMsg,
    createLink,
    showOverlay,
    hideOverlay,
    removeElement,
    removeCircle,
    createCircle,
    removePopup,
    createPopup,
  };
})();

const Controller = (() => {
  const content = document.getElementById("content");
  const dropdownButton = document.getElementById("dropdownButton");
  const dropdownMenu = document.getElementById("dropdownMenu");
  const backgroundImg = document.getElementById("backgroundImg");
  const startButton = document.getElementById("startButton");
  const timerElement = document.getElementById("timer");

  let isGameStarted = false;
  let isAddingCircle = false;
  let isAddingPopup = false;

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
    let seconds = 0;

    const updateTimer = () => {
      seconds += 1;
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
      isAddingCircle = true;
      isAddingPopup = true;
    }
  };

  const handleContentClick = (event) => {
    if (
      !isGameStarted ||
      event.target.closest("header") ||
      event.target.closest("footer") ||
      event.target === startButton
    ) {
      return;
    }

    if (isAddingCircle) {
      const { x, y } = getCoordinates(event);
      Renderer.createCircle(x, y);
      Renderer.createPopup(x, y);
    } else {
      Renderer.removeCircle();
      Renderer.removePopup();
    }

    isAddingCircle = !isAddingCircle;
    isAddingPopup = !isAddingPopup;
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
