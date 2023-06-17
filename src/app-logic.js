/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { app, db } from "./firebase";

console.log("app-logic.js says: this seem to be working");

export const LocationManager = (() => {
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

  return {
    characters,
    getCoordinates,
    captureCharacterArea,
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

  const verifyClickedPosition = async (x, y) => {
    try {
      const snapshot = await getDocs(collection(db, "characterLocations"));
      let foundCharacter = null;

      snapshot.forEach((doc) => {
        const character = doc.id;
        const { left, top, right, bottom } = doc.data();

        if (x >= left && x <= right && y >= top && y <= bottom) {
          console.log(`Clicked within ${character}'s area.`);
          foundCharacter = character;
        }
      });

      return foundCharacter;
    } catch (error) {
      console.error("Error verifying clicked position:", error);
      return null;
    }
  };

  const storeUserTime = async (username, time) => {
    try {
      await setDoc(doc(db, "userTimes", username), { time });
      console.log(`User time stored successfully for ${username}`);
    } catch (error) {
      console.error(`Error storing user time for ${username}:`, error);
    }
  };

  // eslint-disable-next-line consistent-return
  const getAllUserTimes = async () => {
    try {
      const snapshot = await getDocs(collection(db, "userTimes"));

      const userTimes = [];
      snapshot.forEach((doc) => {
        const username = doc.id;
        const { time } = doc.data();
        userTimes.push({ username, time });
      });

      userTimes.sort((a, b) => a.time.localeCompare(b.time));

      userTimes.forEach((userTime) => {
        console.log(`Username: ${userTime.username}, Time: ${userTime.time}`);
      });

      return userTimes;
    } catch (error) {
      console.error("Error retrieving user times:", error);
    }
  };

  return {
    storeCharacterLocations,
    getCharacterLocations,
    verifyClickedPosition,
    storeUserTime,
    getAllUserTimes,
  };
})();
