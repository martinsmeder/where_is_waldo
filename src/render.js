// eslint-disable-next-line import/no-cycle
import { Controller } from "./app";

export const RendererHelpers = (() => {
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
    button.addEventListener("click", Controller.handleCharacterButtonClick);
    return button;
  };

  const removeElement = (element) => {
    if (element.parentNode) {
      element.parentNode.removeChild(element);
    }
  };

  return {
    setPosition,
    createDiv,
    createButton,
    removeElement,
  };
})();

export const Renderer = (() => {
  const content = document.querySelector("#content");

  const circles = [];
  const popups = [];

  const createFeedbackMsg = (message, x, y, color = "red") => {
    const feedbackMsg = RendererHelpers.createDiv("feedback", message);
    RendererHelpers.setPosition(feedbackMsg, x - 150, y - 100);
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
      RendererHelpers.removeElement(circleToRemove);
    }
  };

  const createCircle = (x, y) => {
    const circle = RendererHelpers.createDiv("circle");
    RendererHelpers.setPosition(circle, x - 50, y - 50);
    content.appendChild(circle);
    circles.push(circle);
  };

  const removePopup = () => {
    if (popups.length > 0) {
      const popupToRemove = popups.pop();
      RendererHelpers.removeElement(popupToRemove);
    }
  };

  const createPopup = (x, y, foundCharacters) => {
    const popup = RendererHelpers.createDiv("choice");

    const maxX = window.innerWidth - 150;
    const popupX = x + 60;

    // Set the position of the popup based on the coordinates (x, y) of the click event
    if (popupX > maxX) {
      // Position the popup to the left if clicked position exceeds the maximum x-coordinate
      RendererHelpers.setPosition(popup, x - 160, y - 70);
    } else {
      // Otherwise position the popup to the right
      RendererHelpers.setPosition(popup, x + 60, y - 70);
    }

    const gameChoice = Controller.getGameChoice();

    let options;

    if (gameChoice === "cyberpunk") {
      options = [
        { text: "Bowser", character: "bowser" },
        { text: "Neo", character: "neo" },
        { text: "Waldo", character: "waldo" },
      ];
    } else if (gameChoice === "robot") {
      options = [
        { text: "Meg", character: "meg" },
        { text: "Pikachu", character: "pikachu" },
        { text: "Mike", character: "mike" },
      ];
    } else if (gameChoice === "universe") {
      options = [
        { text: "Bravo", character: "bravo" },
        { text: "Sonic", character: "sonic" },
        { text: "Clarke", character: "clarke" },
      ];
    }

    options.forEach((option) => {
      const choice = RendererHelpers.createButton(
        option.text,
        option.character
      );

      if (foundCharacters.includes(option.character)) {
        choice.classList.add("found");
        choice.removeEventListener(
          "click",
          Controller.handleCharacterButtonClick
        );
      }

      popup.appendChild(choice);
    });

    content.appendChild(popup);
    popups.push(popup);
  };

  const createTable = (top10UserTimes) => {
    const gameChoice = Controller.getGameChoice();

    const leaderboardHeading = document.querySelector("#leaderboardHeading");
    const formattedGameChoice =
      gameChoice.charAt(0).toUpperCase() + gameChoice.slice(1).toLowerCase();
    leaderboardHeading.textContent = `Top 10 For ${formattedGameChoice}:`;

    const timerElement = document.querySelector("#timer");
    const currentUserTime = document.querySelector("#currentUserTime");
    currentUserTime.textContent = `Your time: ${timerElement.textContent}.`;

    const scoreboardTableBody = document.querySelector("#tableBody");
    scoreboardTableBody.textContent = "";

    top10UserTimes.forEach((userTime) => {
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
