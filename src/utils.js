/* eslint-disable no-param-reassign */
// eslint-disable-next-line import/no-cycle
import { Controller, Renderer } from "./interface";
import { FirestoreManager } from "./app-logic";

console.log("utils.js says: this seem to be working");

export const InterfaceHelpers = (() => {
  const timerElement = document.getElementById("timer");

  let timerInterval;

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

    timerInterval = setInterval(updateTimer, 1000);
  };

  const stopTimer = () => {
    clearInterval(timerInterval);
  };

  const resetTimer = () => {
    stopTimer();
    timerElement.textContent = "00:00:00";
  };

  const updateCount = () => {
    const countElement = document.getElementById("count");
    const foundCount = document.querySelectorAll(".grayed-out").length;
    countElement.textContent = `${foundCount}/3`;
  };

  const resetCount = () => {
    const countElement = document.getElementById("count");
    countElement.textContent = "0/3";
  };

  const grayOutCharacterIcon = (characterId) => {
    const characterElement = document.getElementById(characterId);
    if (characterElement) {
      characterElement.classList.add("grayed-out");
    }
  };

  const clearCharacterIcons = () => {
    const characterIds = ["bowser", "neo", "waldo"];
    characterIds.forEach((characterId) => {
      const characterElement = document.getElementById(characterId);
      if (characterElement) {
        characterElement.classList.remove("grayed-out");
      }
    });
  };

  const showModal = (modal) => {
    const overlay = modal.closest(".overlay");
    overlay.style.display = "flex";
    modal.style.display = "flex";
  };

  const hideModal = (modal) => {
    const overlay = modal.closest(".overlay");
    overlay.style.display = "none";
    modal.style.display = "none";
  };

  const setPosition = (element, x, y) => {
    const positioned = element;
    positioned.style.left = `${x}px`;
    positioned.style.top = `${y}px`;
  };

  const createDiv = (className, text) => {
    const div = document.createElement("div");
    div.className = className;
    if (text) {
      div.textContent = text;
    }
    return div;
  };

  const createButton = (text, character) => {
    const button = document.createElement("button");
    button.textContent = text;
    button.type = "button";
    button.dataset.character = character;
    button.addEventListener("click", Controller.handleButtonClick);
    return button;
  };

  const removeElement = (element) => {
    if (element.parentNode) {
      element.parentNode.removeChild(element);
    }
  };

  const getLeaderboard = () => {
    const usernameInput = document.querySelector(".endgame input");
    const submitButton = document.getElementById("submitUsername");

    const handleSubmit = async () => {
      const username = usernameInput.value.trim();
      if (username) {
        FirestoreManager.storeUserTime(username, timerElement.textContent);
        const userTimes = await FirestoreManager.getAllUserTimes();
        Renderer.createTable(userTimes);
        InterfaceHelpers.showModal(
          document.querySelector(".modal.leaderboard")
        );
      }
    };

    submitButton.addEventListener("click", handleSubmit);
  };

  return {
    startTimer,
    stopTimer,
    resetTimer,
    resetCount,
    updateCount,
    grayOutCharacterIcon,
    clearCharacterIcons,
    showModal,
    hideModal,
    setPosition,
    createDiv,
    createButton,
    removeElement,
    getLeaderboard,
  };
})();

export const LogicHelpers = (() => {
  // ...
})();
