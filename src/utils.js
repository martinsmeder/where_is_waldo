/* eslint-disable no-param-reassign */
// eslint-disable-next-line import/no-cycle
import { Controller } from "./app";
import { Renderer } from "./render";
import { FirestoreManager } from "./app-logic";

console.log("utils.js says: this seem to be working");

export const AppHelpers = (() => {
  const timerElement = document.getElementById("timer");

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
    console.log("updateCount called");
    const countElement = document.getElementById("count");
    const foundCount = document.querySelectorAll(".grayed-out").length;
    countElement.textContent = `${foundCount}/3`;
  };

  const resetCount = () => {
    const countElement = document.getElementById("count");
    countElement.textContent = "0/3";
  };

  const grayOutCharacterIcon = (characterId) => {
    console.log(`grayOutCharacterIcon called with characterId: ${characterId}`);
    const characterElement = document.querySelector(`#${characterId}`);
    if (characterElement) {
      characterElement.classList.add("grayed-out");
    } else {
      console.log("Character element not found!");
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

  const getLeaderboard = (gameChoice) => {
    const usernameInput = document.querySelector(".endgame input");
    const submitButton = document.getElementById("submitUsername");

    const handleSubmit = async () => {
      const username = usernameInput.value.trim();
      if (username) {
        const userExists = await FirestoreManager.checkUserExists(
          username,
          gameChoice
        );

        if (userExists) {
          return;
        }

        FirestoreManager.storeUserTime(
          username,
          timerElement.textContent,
          gameChoice
        );
        const top10UserTimes = await FirestoreManager.getTop10Times(gameChoice);
        Renderer.createTable(top10UserTimes);
        showModal(document.querySelector(".modal.leaderboard"));
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
      currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
      slides[currentSlide].style.transform = "translateX(-100%)";
      slides[currentSlide].style.opacity = "0";
    } else if (direction === "right") {
      currentSlide = (currentSlide + 1) % totalSlides;
      slides[currentSlide].style.transform = "translateX(100%)";
      slides[currentSlide].style.opacity = "0";
    }

    slides[currentSlide].classList.add("active");

    setTimeout(() => {
      slides[currentSlide].style.transform = "translateX(0)";
      slides[currentSlide].style.opacity = "1";
    }, 0);
  };

  const setBackgroundImage = () => {
    const backgroundImg = document.querySelector("#backgroundImg");
    const gameChoice = Controller.getGameChoice();

    switch (gameChoice) {
      case "cyberpunk":
        backgroundImg.src = "../dist/images/cyberpunk-city.jpg";
        break;
      case "robot":
        backgroundImg.src = "../dist/images/robot-city.jpg";
        break;
      default:
        backgroundImg.src = "../dist/images/cyberpunk-city.jpg";
    }
  };

  const setCharacterIcons = () => {
    const icons = document.querySelectorAll(".character > .icon");
    const titles = document.querySelectorAll(".character > .text > h3");
    const gameChoice = Controller.getGameChoice();

    // Data structure implemented as an object
    const characterData = {
      cyberpunk: [
        { icon: "../dist/images/bowser.png", title: "Bowser" },
        { icon: "../dist/images/neo.png", title: "Neo" },
        { icon: "../dist/images/waldo.png", title: "Waldo" },
      ],
      robot: [
        { icon: "../dist/images/meg.png", title: "Meg" },
        { icon: "../dist/images/pikachu.png", title: "Pikachu" },
        { icon: "../dist/images/mike.png", title: "Mike" },
      ],
    };

    const characters = characterData[gameChoice] || characterData.default;

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
