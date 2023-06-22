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

  const getLeaderboard = () => {
    const usernameInput = document.querySelector(".endgame input");
    const submitButton = document.getElementById("submitUsername");

    const handleSubmit = async () => {
      const username = usernameInput.value.trim();
      if (username) {
        FirestoreManager.storeUserTime(username, timerElement.textContent);
        const userTimes = await FirestoreManager.getAllUserTimes();
        Renderer.createTable(userTimes);
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
  };
})();

export const LogicHelpers = (() => {
  // ...
})();
