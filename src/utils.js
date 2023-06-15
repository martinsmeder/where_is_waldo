export const InterfaceHelpers = (() => {
  const backgroundImg = document.getElementById("backgroundImg");

  const getCoordinates = (event) => {
    // Get the position and dimensions of the backgroundImg element
    const rect = backgroundImg.getBoundingClientRect();

    // Calculate the x and y coordinates of the click relative to the top-left corner of the
    // backgroundImg element
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    console.log(`X: ${x}, Y: ${y}`);

    const referenceWidth = 1920; // Reference width of the coordinate system

    const screenWidth = window.innerWidth;

    // Calculate the scaling factor for the width and height
    const widthScalingFactor = screenWidth / referenceWidth;
    const heightScalingFactor = screenWidth / referenceWidth;

    // Scale the x and y coordinates based on the scaling factors
    const scaledX = x / widthScalingFactor;
    const scaledY = y / heightScalingFactor;

    // Define the boundaries of the character area
    const areaLeft = scaledX - 100; // 150 pixels to the left of the clicked point
    const areaTop = scaledY - 100; // 150 pixels above the clicked point
    const areaRight = scaledX + 100; // 150 pixels to the right of the clicked point
    const areaBottom = scaledY + 100; // 150 pixels below the clicked point

    // Bowser (works)
    const bowserLeft = 1430;
    const bowserTop = 3130;
    const bowserRight = 1730;
    const bowserBottom = 3424;

    // Neo (works)
    const neoLeft = 690;
    const neoTop = 4700;
    const neoRight = 900;
    const neoBottom = 4900;

    // Waldo (works)
    const waldoLeft = 1450;
    const waldoTop = 6550;
    const waldoRight = 1650;
    const waldoBottom = 6750;

    console.log(`Scaled X: ${scaledX}, Scaled Y: ${scaledY}`);
    console.log(
      `Area: (${areaLeft}, ${areaTop}) to (${areaRight}, ${areaBottom})`
    );

    // Check if the click is within the specified area
    if (
      scaledX >= waldoLeft &&
      scaledX <= waldoRight &&
      scaledY >= waldoTop &&
      scaledY <= waldoBottom
    ) {
      console.log("Found Waldo");
    } else {
      console.log("Not Found");
    }

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
