/* eslint-disable import/no-cycle */

// TO DO:
// 1. ---
// 2. ---
// 3. ---
// 4. ---
// 5. ---
// 6. ---
// 7. Add comments and shrink images
// 8. Merge and push to gh-pages in a way that works

import { Renderer } from "./render";
import { AppHelpers } from "./utils";
import { FirestoreManager, LocationManager } from "./app-logic";

// eslint-disable-next-line import/prefer-default-export
export const Controller = (() => {
  const content = document.querySelector("#content");
  const dropdownButton = document.querySelector("#dropdownButton");
  const dropdownMenu = document.querySelector("#dropdownMenu");
  const startButtons = document.querySelectorAll(".startButton");
  const playAgainButton = document.querySelector("#playAgainButton");
  const submitButton = document.querySelector("#submitUsername");
  const initialModal = document.querySelector(".modal.initial");
  const endgameModal = document.querySelector(".modal.endgame");
  const leaderboardModal = document.querySelector(".modal.leaderboard");
  const leftArrow = document.querySelector(".arrow.left");
  const rightArrow = document.querySelector(".arrow.right");
  const usernameInput = document.querySelector(".endgame input");
  const usernameError = document.querySelector("#usernameError");

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
      AppHelpers.hideModal(initialModal);
      AppHelpers.startTimer();
      isGameStarted = true;
      isAddingCircle = true;
      isAddingPopup = true;
      AppHelpers.setBackgroundImage();
      AppHelpers.setCharacterIcons();
      AppHelpers.setCharacterId();
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
    usernameInput.value = "";
    usernameError.textContent = "";

    AppHelpers.resetCount();
    AppHelpers.resetTimer();
    AppHelpers.clearCharacterIcons();
    AppHelpers.hideModal(leaderboardModal);
    AppHelpers.hideModal(endgameModal);
    AppHelpers.showModal(initialModal);
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
          scaledY,
          gameChoice
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

      AppHelpers.grayOutCharacterIcon(clickedCharacter);
      AppHelpers.updateCount();

      foundCharacters.push(clickedCharacter);
      Renderer.removePopup();
      Renderer.createPopup(x, y, foundCharacters);

      if (foundCharacters.length === 3) {
        AppHelpers.stopTimer();
        AppHelpers.getLeaderboard(gameChoice, submitButton);
        AppHelpers.showModal(endgameModal);
      }
    } else {
      Renderer.createFeedbackMsg("Keep looking!", x, y);
    }

    return false;
  };

  const init = () => {
    leftArrow.addEventListener("click", () => {
      AppHelpers.updateActiveSlide("left");
      AppHelpers.updateActiveDot();
    });

    rightArrow.addEventListener("click", () => {
      AppHelpers.updateActiveSlide("right");
      AppHelpers.updateActiveDot();
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

    playAgainButton.addEventListener("click", resetGame);

    AppHelpers.hideModal(leaderboardModal);
    AppHelpers.hideModal(endgameModal);
    AppHelpers.showModal(initialModal);
  };

  return {
    init,
    handleCharacterButtonClick,
    getGameChoice,
  };
})();

Controller.init();
