/* eslint-disable no-param-reassign */
// eslint-disable-next-line import/no-cycle
import { Controller } from "./app";
import { Renderer } from "./render";
import { FirestoreManager } from "./app-logic";

export const AppHelpers = (() => {
  const timerElement = document.querySelector("#timer");

  let timerInterval;
  let currentSlide = 0;

  const formatTime = (milliseconds) => {
    const hours = Math.floor(milliseconds / 3600000);
    const minutes = Math.floor((milliseconds % 3600000) / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    const formattedHours = String(hours).padStart(2, "0");
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");
    const formattedMilliseconds = String(milliseconds % 1000).padStart(3, "0");
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}.${formattedMilliseconds}`;
  };

  const startTimer = () => {
    const startTime = new Date().getTime();

    const updateTimer = () => {
      const currentTime = new Date().getTime();
      const elapsedMilliseconds = currentTime - startTime;
      const formattedTime = formatTime(elapsedMilliseconds);
      timerElement.textContent = formattedTime;
    };

    timerInterval = setInterval(updateTimer, 1);
  };

  const stopTimer = () => {
    clearInterval(timerInterval);
  };

  const resetTimer = () => {
    stopTimer();
    timerElement.textContent = "00:00:00";
  };

  const updateCount = () => {
    const countElement = document.querySelector("#count");
    const foundCount = document.querySelectorAll(".grayed-out").length;
    countElement.textContent = `${foundCount}/3`;
  };

  const resetCount = () => {
    const countElement = document.querySelector("#count");
    countElement.textContent = "0/3";
  };

  const grayOutCharacterIcon = (characterId) => {
    const characterElement = document.querySelector(`#${characterId}`);
    if (characterElement) {
      characterElement.classList.add("grayed-out");
    }
  };

  const clearCharacterIcons = () => {
    const characterIds = [
      "bowser",
      "neo",
      "waldo",
      "meg",
      "pikachu",
      "mike",
      "bravo",
      "sonic",
      "clarke",
    ];
    characterIds.forEach((characterId) => {
      const characterElement = document.querySelector(`#${characterId}`);
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

  const getLeaderboard = (gameChoice, submitButton) => {
    const usernameInput = document.querySelector(".endgame input");
    const usernameError = document.querySelector("#usernameError");

    const handleSubmit = async (event) => {
      event.preventDefault(); // Prevent the default form submission behavior

      const username = usernameInput.value.trim();
      if (username) {
        // Check if the user already exists in the leaderboard for the given gameChoice
        const userExists = await FirestoreManager.checkUserExists(
          username,
          gameChoice
        );

        if (userExists) {
          // If the user already exists, display an error message and return without further action
          usernameError.textContent = `Username "${username}" is already taken!`;
          return;
        }

        // Otherwise, do the following things...
        FirestoreManager.storeUserTime(
          username,
          timerElement.textContent,
          gameChoice
        );
        const top10UserTimes = await FirestoreManager.getTop10Times(gameChoice);
        Renderer.createTable(top10UserTimes);
        showModal(document.querySelector(".modal.leaderboard"));
        hideModal(document.querySelector(".modal.endgame"));
      }
    };

    submitButton.addEventListener("click", handleSubmit);
  };

  const updateActiveDot = () => {
    const dots = document.querySelectorAll(".dot");
    dots.forEach((dot, index) => {
      if (index === currentSlide) {
        dot.classList.add("active");
      } else {
        dot.classList.remove("active");
      }
    });
  };

  const updateActiveSlide = (direction) => {
    const slides = document.querySelectorAll(".slide");
    const totalSlides = slides.length;

    slides[currentSlide].classList.remove("active");

    if (direction === "left") {
      // Calculate the index of the slide
      currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
      // Slide in from the left
      slides[currentSlide].style.transform = "translateX(-100%)";
      slides[currentSlide].style.opacity = "0";
    } else if (direction === "right") {
      // Calculate the index of the slide
      currentSlide = (currentSlide + 1) % totalSlides;
      // Slide in from the right
      slides[currentSlide].style.transform = "translateX(100%)";
      slides[currentSlide].style.opacity = "0";
    }

    // Add the "active" class to the new current slide
    slides[currentSlide].classList.add("active");

    setTimeout(() => {
      // Activate transition and move the current slide to the center
      slides[currentSlide].style.transform = "translateX(0)";
      slides[currentSlide].style.opacity = "1";
    }, 0);
  };

  const setBackgroundImage = () => {
    const backgroundImg = document.querySelector("#backgroundImg");
    const gameChoice = Controller.getGameChoice();

    switch (gameChoice) {
      case "cyberpunk":
        backgroundImg.src = "images/cyberpunk-city.jpg";
        break;
      case "robot":
        backgroundImg.src = "images/robot-city.jpg";
        break;
      case "universe":
        backgroundImg.src = "images/universe-113.jpg";
        break;
      default:
        backgroundImg.src = "images/cyberpunk-city.jpg";
    }
  };

  const setCharacterIcons = () => {
    const icons = document.querySelectorAll(".character > .icon");
    const titles = document.querySelectorAll(".character > .text > h3");
    const gameChoice = Controller.getGameChoice();

    const characterData = {
      // Define the character data for each gameChoice
      cyberpunk: [
        { icon: "images/bowser.png", title: "Bowser" },
        { icon: "images/neo.png", title: "Neo" },
        { icon: "images/waldo.png", title: "Waldo" },
      ],
      robot: [
        { icon: "images/meg.png", title: "Meg" },
        { icon: "images/pikachu.png", title: "Pikachu" },
        { icon: "images/mike.png", title: "Mike" },
      ],
      universe: [
        { icon: "images/bravo.png", title: "Johnny Bravo" },
        { icon: "images/sonic.png", title: "Sonic" },
        { icon: "images/clarke.png", title: "Isaac Clarke" },
      ],
    };

    // Retrieve the character data based on the game choice
    const characters = characterData[gameChoice] || characterData.default;

    // Update the icons and titles of the characters
    characters.forEach((character, index) => {
      icons[index].src = character.icon;
      titles[index].textContent = character.title;
    });
  };

  const setCharacterId = () => {
    const characterElements = document.querySelectorAll(".character");
    characterElements.forEach((characterElement) => {
      const imageElement = characterElement.querySelector("img");
      if (imageElement) {
        const imageName = imageElement.src.split("/").pop().split(".")[0];
        characterElement.id = imageName;
      }
    });
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
    getLeaderboard,
    updateActiveDot,
    updateActiveSlide,
    setBackgroundImage,
    setCharacterIcons,
    setCharacterId,
  };
})();

export const LogicHelpers = (() => {
  // ...
})();
