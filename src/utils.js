console.log("utils.js says: this seem to be working");

export const InterfaceHelpers = (() => {
  const backgroundImg = document.getElementById("backgroundImg");

  const characters = {
    bowser: { left: 1430, top: 3130, right: 1730, bottom: 3424 },
    neo: { left: 690, top: 4700, right: 900, bottom: 4900 },
    waldo: { left: 1450, top: 6550, right: 1650, bottom: 6750 },
  };

  const getCoordinates = (event) => {
    const rect = backgroundImg.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    // console.log(`X: ${x}, Y: ${y}`);

    const referenceWidth = 1920;
    const screenWidth = window.innerWidth;
    const scalingFactor = screenWidth / referenceWidth;

    const scaledX = x / scalingFactor;
    const scaledY = y / scalingFactor;

    // console.log(`Scaled X: ${scaledX}, Scaled Y: ${scaledY}`);

    return { x, y, scaledX, scaledY };
  };

  const isWithinArea = (coordinates, area) => {
    const { scaledX, scaledY } = coordinates;
    const { left, top, right, bottom } = area;

    return (
      scaledX >= left && scaledX <= right && scaledY >= top && scaledY <= bottom
    );
  };

  const captureCharacterArea = (event) => {
    const coordinates = getCoordinates(event);
    // console.log(`X: ${coordinates.x}, Y: ${coordinates.y}`);

    let characterFound = false;

    Object.keys(characters).forEach((character) => {
      if (isWithinArea(coordinates, characters[character])) {
        console.log(`Found ${character}`);
        characterFound = true;
      }
    });

    if (!characterFound) {
      console.log("No character found");
    }
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
    characters,
    getCoordinates,
    captureCharacterArea,
    formatTime,
  };
})();

export const LogicHelpers = (() => {
  // ...
})();
