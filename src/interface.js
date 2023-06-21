// TO DO:
// 1. Reorganize code
// 2. Update header icons based on currentImage
// 3. Update coordinates/locations  based on currentImage
// 4. Display correct leaderboard based on currentImage

// eslint-disable-next-line import/no-cycle
import { InterfaceHelpers } from "./utils";
import { FirestoreManager, LocationManager } from "./app-logic";

console.log("interface.js says: this seem to be working");

export const Renderer = (() => {
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

    const maxX = window.innerWidth - 150;
    const popupX = x + 60;

    if (popupX > maxX) {
      InterfaceHelpers.setPosition(popup, x - 160, y - 70);
    } else {
      InterfaceHelpers.setPosition(popup, x + 60, y - 70);
    }

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
        choice.removeEventListener(
          "click",
          // eslint-disable-next-line no-use-before-define
          Controller.handleCharacterButtonClick
        );
      }

      popup.appendChild(choice);
    });

    content.appendChild(popup);
    popups.push(popup);
  };

  const createTable = (userTimes) => {
    const scoreboardTableBody = document.getElementById("tableBody");
    scoreboardTableBody.textContent = "";

    userTimes.forEach((userTime) => {
      const row = document.createElement("tr");
      const usernameCell = document.createElement("td");
      usernameCell.textContent = userTime.username;
      const timeCell = document.createElement("td");
      timeCell.textContent = userTime.time;

      row.appendChild(usernameCell);
      row.appendChild(timeCell);
      scoreboardTableBody.appendChild(row);
    });
  };

  return {
    createFeedbackMsg,
    removeCircle,
    createCircle,
    removePopup,
    createPopup,
    createTable,
  };
})();

// eslint-disable-next-line import/prefer-default-export
export const Controller = (() => {
  const content = document.getElementById("content");
  const dropdownButton = document.getElementById("dropdownButton");
  const dropdownMenu = document.getElementById("dropdownMenu");
  const startButtons = document.querySelectorAll(".startButton");
  const playAgainButton = document.getElementById("playAgainButton");
  const initialModal = document.querySelector(".modal.initial");
  const endgameModal = document.querySelector(".modal.endgame");
  const leaderboardModal = document.querySelector(".modal.leaderboard");
  const leftArrow = document.querySelector(".arrow.left");
  const rightArrow = document.querySelector(".arrow.right");

  let isGameStarted = false;
  let isAddingCircle = false;
  let isAddingPopup = false;
  let selectedCharacter = null;
  let gameChoice = null;
  const foundCharacters = [];

  const startGame = (event) => {
    const clickedButton = event.target;
    gameChoice = clickedButton.dataset.choice;

    if (!isGameStarted) {
      InterfaceHelpers.hideModal(initialModal);
      InterfaceHelpers.startTimer();
      isGameStarted = true;
      isAddingCircle = true;
      isAddingPopup = true;
    }

    return gameChoice;
  };

  // Getter function used to return gameChoice from Controller module
  const getGameChoice = () => gameChoice;

  const resetGame = () => {
    isGameStarted = false;
    isAddingCircle = false;
    isAddingPopup = false;
    selectedCharacter = null;
    foundCharacters.length = 0;

    InterfaceHelpers.resetCount();
    InterfaceHelpers.resetTimer();
    InterfaceHelpers.clearCharacterIcons();
    InterfaceHelpers.hideModal(leaderboardModal);
    InterfaceHelpers.hideModal(endgameModal);
    InterfaceHelpers.showModal(initialModal);
  };

  const handleContentClick = async (event) => {
    if (
      !isGameStarted ||
      event.target.closest("header") ||
      event.target.closest("footer") ||
      event.target.closest(".overlay")
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

  const handleCharacterButtonClick = (event) => {
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
        InterfaceHelpers.getLeaderboard();
        InterfaceHelpers.showModal(endgameModal);
      }
    } else {
      Renderer.createFeedbackMsg("Keep looking!", x, y);
    }

    return false;
  };

  const init = () => {
    leftArrow.addEventListener("click", () => {
      InterfaceHelpers.updateActiveSlide("left");
      InterfaceHelpers.updateActiveDot();
    });

    rightArrow.addEventListener("click", () => {
      InterfaceHelpers.updateActiveSlide("right");
      InterfaceHelpers.updateActiveDot();
    });

    content.addEventListener("click", handleContentClick);

    const buttons = document.querySelectorAll(".choice button");
    buttons.forEach((button) => {
      button.addEventListener("click", handleCharacterButtonClick);
    });

    dropdownButton.addEventListener("click", () => {
      dropdownMenu.classList.toggle("show");
      dropdownButton.textContent = dropdownMenu.classList.contains("show")
        ? "▲ Hide Characters ▲"
        : "▼ Show Characters ▼";
    });

    startButtons.forEach((button) => {
      button.addEventListener("click", startGame);
    });

    const submitButton = document.getElementById("submitUsername");
    submitButton.addEventListener("click", () => {
      InterfaceHelpers.hideModal(endgameModal);
    });

    playAgainButton.addEventListener("click", resetGame);

    InterfaceHelpers.hideModal(leaderboardModal);
    InterfaceHelpers.hideModal(endgameModal);
    InterfaceHelpers.showModal(initialModal);
  };

  return {
    init,
    handleCharacterButtonClick,
    getGameChoice,
  };
})();

Controller.init();
