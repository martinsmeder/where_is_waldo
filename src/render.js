// eslint-disable-next-line import/no-cycle
import { Controller } from "./app";

console.log("render.js says: this seem to be working");

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
  const content = document.getElementById("content");

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

    if (popupX > maxX) {
      RendererHelpers.setPosition(popup, x - 160, y - 70);
    } else {
      RendererHelpers.setPosition(popup, x + 60, y - 70);
    }

    const options = [
      { text: "Bowser", character: "bowser" },
      { text: "Neo", character: "neo" },
      { text: "Waldo", character: "waldo" },
    ];

    options.forEach((option) => {
      const choice = RendererHelpers.createButton(
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
