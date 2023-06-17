import { InterfaceHelpers } from "./utils";
import { FirestoreManager } from "./app-logic";

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

  const createFeedbackMsg = (message, x, y, color = "red") => {
    const feedbackMsg = createDiv("feedback", message);
    setPosition(feedbackMsg, x - 150, y - 100);
    feedbackMsg.style.background = `rgba(${
      color === "green" ? "0, 255, 0" : "255, 0, 0"
    }, 0.7)`;
    content.appendChild(feedbackMsg);

    setTimeout(() => {
      feedbackMsg.remove();
    }, 5000);
  };

  const createButton = (text, character) => {
    const button = document.createElement("button");
    button.textContent = text;
    button.type = "button";
    button.dataset.character = character;
    // eslint-disable-next-line no-use-before-define
    button.addEventListener("click", Controller.handleButtonClick);
    return button;
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

  const createPopup = (x, y, foundCharacters) => {
    const popup = createDiv("choice");
    setPosition(popup, x + 60, y - 70);

    const options = [
      { text: "Bowser", character: "bowser" },
      { text: "Neo", character: "neo" },
      { text: "Waldo", character: "waldo" },
    ];

    options.forEach((option) => {
      const choice = createButton(option.text, option.character);

      if (foundCharacters.includes(option.character)) {
        choice.classList.add("found");
        // eslint-disable-next-line no-use-before-define
        choice.removeEventListener("click", Controller.handleButtonClick);
      }

      popup.appendChild(choice);
    });

    content.appendChild(popup);
    popups.push(popup);
  };

  const grayOutCharacterIcon = (characterId) => {
    const characterElement = document.getElementById(characterId);
    if (characterElement) {
      characterElement.classList.add("grayed-out");
    }
  };

  const updateCount = () => {
    const countElement = document.getElementById("count");
    const foundCount = document.querySelectorAll(".grayed-out").length;
    countElement.textContent = `${foundCount}/3`;
  };

  return {
    createDiv,
    setPosition,
    createFeedbackMsg,
    createButton,
    showOverlay,
    hideOverlay,
    removeElement,
    removeCircle,
    createCircle,
    removePopup,
    createPopup,
    grayOutCharacterIcon,
    updateCount,
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
  let selectedCharacter = null;
  const foundCharacters = [];

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

  const handleContentClick = async (event) => {
    if (
      !isGameStarted ||
      event.target.closest("header") ||
      event.target.closest("footer") ||
      event.target === startButton
    ) {
      return;
    }

    if (isAddingCircle) {
      const { x, y, scaledX, scaledY } = InterfaceHelpers.getCoordinates(event);
      Renderer.createCircle(x, y);
      Renderer.createPopup(x, y, foundCharacters);

      try {
        selectedCharacter = await FirestoreManager.verifyClickedPosition(
          scaledX,
          scaledY
        );
      } catch (error) {
        console.error("Error verifying clicked position:", error);
      }
    } else {
      Renderer.removeCircle();
      Renderer.removePopup();
    }

    isAddingCircle = !isAddingCircle;
    isAddingPopup = !isAddingPopup;
  };

  const handleButtonClick = (event) => {
    const { x, y } = InterfaceHelpers.getCoordinates(event);
    Renderer.removePopup();

    const clickedCharacter = event.target.dataset.character;

    if (selectedCharacter === clickedCharacter) {
      const formattedCharacter =
        selectedCharacter.charAt(0).toUpperCase() +
        selectedCharacter.slice(1).toLowerCase();
      Renderer.createFeedbackMsg(`Found ${formattedCharacter}!`, x, y, "green");

      Renderer.grayOutCharacterIcon(clickedCharacter);
      Renderer.updateCount();

      foundCharacters.push(clickedCharacter);
      Renderer.removePopup();
      Renderer.createPopup(x, y, foundCharacters);
    } else {
      Renderer.createFeedbackMsg("Keep looking!", x, y);
    }

    return false;
  };

  const init = () => {
    content.addEventListener("click", handleContentClick);

    const buttons = document.querySelectorAll(".choice button");
    buttons.forEach((button) => {
      button.addEventListener("click", handleButtonClick);
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
    handleButtonClick,
  };
})();

Controller.init();
