// 1. Improve / refactor code to make the last parts easier
// 2. Step 14
// 3. Step 15

// eslint-disable-next-line import/no-cycle
import { InterfaceHelpers } from "./utils";
import { FirestoreManager, LocationManager } from "./app-logic";

console.log("interface.js says: this seem to be working");

const Renderer = (() => {
  const content = document.getElementById("content");

  const circles = [];
  const popups = [];

  const createFeedbackMsg = (message, x, y, color = "red") => {
    const feedbackMsg = InterfaceHelpers.createDiv("feedback", message);
    InterfaceHelpers.setPosition(feedbackMsg, x - 150, y - 100);
    feedbackMsg.style.background = `rgba(${
      color === "green" ? "0, 255, 0" : "255, 0, 0"
    }, 0.7)`;
    content.appendChild(feedbackMsg);

    setTimeout(() => {
      feedbackMsg.remove();
    }, 5000);
  };

  const removeCircle = () => {
    if (circles.length > 0) {
      const circleToRemove = circles.pop();
      InterfaceHelpers.removeElement(circleToRemove);
    }
  };

  const createCircle = (x, y) => {
    const circle = InterfaceHelpers.createDiv("circle");
    InterfaceHelpers.setPosition(circle, x - 50, y - 50);
    content.appendChild(circle);
    circles.push(circle);
  };

  const removePopup = () => {
    if (popups.length > 0) {
      const popupToRemove = popups.pop();
      InterfaceHelpers.removeElement(popupToRemove);
    }
  };

  const createPopup = (x, y, foundCharacters) => {
    const popup = InterfaceHelpers.createDiv("choice");
    InterfaceHelpers.setPosition(popup, x + 60, y - 70);

    const options = [
      { text: "Bowser", character: "bowser" },
      { text: "Neo", character: "neo" },
      { text: "Waldo", character: "waldo" },
    ];

    options.forEach((option) => {
      const choice = InterfaceHelpers.createButton(
        option.text,
        option.character
      );

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

  return {
    createFeedbackMsg,
    removeCircle,
    createCircle,
    removePopup,
    createPopup,
  };
})();

// eslint-disable-next-line import/prefer-default-export
export const Controller = (() => {
  const content = document.getElementById("content");
  const dropdownButton = document.getElementById("dropdownButton");
  const dropdownMenu = document.getElementById("dropdownMenu");
  const startButton = document.getElementById("startButton");

  let isGameStarted = false;
  let isAddingCircle = false;
  let isAddingPopup = false;
  let selectedCharacter = null;
  const foundCharacters = [];

  const startGame = () => {
    if (!isGameStarted) {
      InterfaceHelpers.hideOverlay();
      InterfaceHelpers.startTimer();
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
      const { x, y, scaledX, scaledY } = LocationManager.getCoordinates(event);
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
    const { x, y } = LocationManager.getCoordinates(event);
    Renderer.removePopup();

    const clickedCharacter = event.target.dataset.character;

    if (selectedCharacter === clickedCharacter) {
      const formattedCharacter =
        selectedCharacter.charAt(0).toUpperCase() +
        selectedCharacter.slice(1).toLowerCase();
      Renderer.createFeedbackMsg(`Found ${formattedCharacter}!`, x, y, "green");

      InterfaceHelpers.grayOutCharacterIcon(clickedCharacter);
      InterfaceHelpers.updateCount();

      foundCharacters.push(clickedCharacter);
      Renderer.removePopup();
      Renderer.createPopup(x, y, foundCharacters);

      if (foundCharacters.length === 3) {
        InterfaceHelpers.stopTimer();
      }
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

    InterfaceHelpers.showOverlay();
  };

  return {
    init,
    handleButtonClick,
  };
})();

Controller.init();
