export const InterfaceHelpers = (() => {
  const backgroundImg = document.getElementById("backgroundImg");

  const getCoordinates = (event) => {
    const rect = backgroundImg.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    console.log(`X: ${x}, Y: ${y}`);

    const referenceWidth = 1920; // Reference width of the coordinate system
    const referenceHeight = 1080; // Reference height of the coordinate system

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    const widthScalingFactor = screenWidth / referenceWidth;
    const heightScalingFactor = screenHeight / referenceHeight;

    const scaledX = x / widthScalingFactor;
    const scaledY = y / heightScalingFactor;

    console.log(`Scaled X: ${scaledX}, Scaled Y: ${scaledY}`);

    return { x, y };
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const formattedHours = String(hours).padStart(2, "0");
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds % 60).padStart(2, "0");
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  };

  return {
    getCoordinates,
    formatTime,
  };
})();

export const LogicHelpers = (() => {
  // ...
})();
