/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import { db, collection, doc, getDoc, getDocs, setDoc } from "./firebase";

export const LocationManager = (() => {
  const backgroundImg = document.getElementById("backgroundImg");

  const characters = {
    // Character array based on values from getCoordinates() and getCoordinateArea()
    bowser: { left: 1430, top: 3130, right: 1730, bottom: 3424 },
    neo: { left: 690, top: 4700, right: 900, bottom: 4900 },
    waldo: { left: 1450, top: 6550, right: 1650, bottom: 6750 },
    meg: { left: 256, top: 484, right: 456, bottom: 684 },
    pikachu: { left: 982, top: 1437, right: 1182, bottom: 1637 },
    mike: { left: 1121, top: 1538, right: 1321, bottom: 1738 },
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

  const getCoordinateArea = (event) => {
    const { scaledX, scaledY } = getCoordinates(event);

    const area = {
      left: scaledX - 100,
      top: scaledY - 100,
      right: scaledX + 100,
      bottom: scaledY + 100,
    };

    console.log(`Area: ${JSON.stringify(area)}`);
  };

  return {
    characters,
    getCoordinates,
    getCoordinateArea,
  };
})();

export const FirestoreManager = (() => {
  // eslint-disable-next-line prefer-destructuring
  const characters = LocationManager.characters;

  const storeCharacterLocations = () => {
    try {
      Object.entries(characters).forEach(
        ([character, { left, top, right, bottom }]) => {
          setDoc(doc(db, "characterLocations", character), {
            left,
            top,
            right,
            bottom,
          })
            .then(() => {
              console.log(`${character} location stored successfully.`);
            })
            .catch((error) => {
              console.error(`Error storing ${character} location:`, error);
            });
        }
      );
    } catch (error) {
      console.error("Error storing character locations:", error);
    }
  };

  const getCharacterLocations = async () => {
    try {
      const snapshot = await getDocs(collection(db, "characterLocations"));

      snapshot.forEach((doc) => {
        const character = doc.id;
        const { left, top, right, bottom } = doc.data();
        console.log(`${character}: (${left}, ${top}, ${right}, ${bottom})`);
      });
    } catch (error) {
      console.error("Error retrieving character locations:", error);
    }
  };

  const verifyClickedPosition = async (x, y, gameChoice) => {
    try {
      // Retrieve the character locations collection from Firestore
      const snapshot = await getDocs(collection(db, "characterLocations"));
      let foundCharacter = null;

      // Iterate over each document in the collection
      snapshot.forEach((doc) => {
        const character = doc.id;
        const { left, top, right, bottom } = doc.data();

        // Check if gameChoice and character match the current document
        if (
          (gameChoice === "cyberpunk" &&
            (character === "bowser" ||
              character === "neo" ||
              character === "waldo")) ||
          (gameChoice === "robot" &&
            (character === "meg" ||
              character === "pikachu" ||
              character === "mike"))
        ) {
          // Check if the clicked position (x, y) is within the character area
          if (x >= left && x <= right && y >= top && y <= bottom) {
            // Set the foundCharacter variable to the matching character
            foundCharacter = character;
          }
        }
      });

      // Return the found character (or null if not found)
      return foundCharacter;
    } catch (error) {
      console.error("Error verifying clicked position:", error);
      return null;
    }
  };

  const checkUserExists = async (username, gameChoice) => {
    try {
      const userDocRef = doc(db, `userTimes-${gameChoice}`, username);
      const userDocSnapshot = await getDoc(userDocRef);
      return userDocSnapshot.exists();
    } catch (error) {
      console.error(`Error checking if user ${username} exists:`, error);
      return false;
    }
  };

  const storeUserTime = async (username, time, gameChoice) => {
    try {
      await setDoc(doc(db, `userTimes-${gameChoice}`, username), { time });
    } catch (error) {
      console.error(`Error storing user time for ${username}:`, error);
    }
  };

  // eslint-disable-next-line consistent-return
  const getTop10Times = async (gameChoice) => {
    try {
      // Retrieve the user times collection for the specified gameChoice from Firestore
      const snapshot = await getDocs(collection(db, `userTimes-${gameChoice}`));

      const userTimes = [];
      // Iterate over each document in the collection
      snapshot.forEach((doc) => {
        const username = doc.id;
        const { time } = doc.data();
        // Extract the username and time data from each document and add it to the userTimes array
        userTimes.push({ username, time });
      });

      // Sort the userTimes array based on the time in ascending order
      userTimes.sort((a, b) => a.time.localeCompare(b.time));

      // Get the top 10 user times from the sorted array
      const top10UserTimes = userTimes.slice(0, 10);

      return top10UserTimes;
    } catch (error) {
      console.error("Error retrieving user times:", error);
    }
  };

  return {
    storeCharacterLocations,
    getCharacterLocations,
    verifyClickedPosition,
    checkUserExists,
    storeUserTime,
    getTop10Times,
  };
})();
