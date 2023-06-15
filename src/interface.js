// TO DO:
// Additional cleanup if necessary
// Continue with 10.

import { InterfaceHelpers } from "./utils";

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

  const createFeedbackMsg = (message, x, y) => {
    const feedbackMsg = createDiv("feedback", message);
    setPosition(feedbackMsg, x - 150, y - 100);
    feedbackMsg.style.background = "rgba(255, 0, 0, 0.7)";
    content.appendChild(feedbackMsg);

    setTimeout(() => {
      feedbackMsg.remove();
    }, 5000);
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
      // eslint-disable-next-line no-use-before-define
      const choice = Renderer.createLink(option, Controller.handleLinkClick);
      popup.appendChild(choice);
    });

    content.appendChild(popup);
    popups.push(popup);
  };

  return {
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
  const startButton = document.getElementById("startButton");
  const timerElement = document.getElementById("timer");

  let isGameStarted = false;
  let isAddingCircle = false;
  let isAddingPopup = false;

  const startTimer = () => {
    let seconds = 0;

    const updateTimer = () => {
      seconds += 1;
      const formattedTime = InterfaceHelpers.formatTime(seconds);
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
      const { x, y } = InterfaceHelpers.getCoordinates(event);
      Renderer.createCircle(x, y);
      Renderer.createPopup(x, y);
    } else {
      Renderer.removeCircle();
      Renderer.removePopup();
    }

    isAddingCircle = !isAddingCircle;
    isAddingPopup = !isAddingPopup;
  };

  const handleLinkClick = (event) => {
    // Prevent the default behavior of the link, so that the user doesn't
    // get thrown up to the top of the page for each link click
    event.preventDefault();

    console.log("handelLinkClick() triggered");
    const { x, y } = InterfaceHelpers.getCoordinates(event);
    Renderer.removePopup();
    Renderer.createFeedbackMsg("Keep looking!", x, y);
  };

  const init = () => {
    content.addEventListener("click", handleContentClick);

    const links = document.querySelectorAll(".choice a");
    links.forEach((link) => {
      link.addEventListener("click", handleLinkClick);
    });

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
    handleLinkClick,
  };
})();

Controller.init();
