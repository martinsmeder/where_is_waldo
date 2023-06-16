/* eslint-disable no-unused-vars */
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { app, db } from "./firebase";
import { InterfaceHelpers } from "./utils";

console.log("app-logic.js says: this seem to be working");

export const FirestoreManager = (() => {
  // eslint-disable-next-line prefer-destructuring
  const characters = InterfaceHelpers.characters;

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

      // eslint-disable-next-line no-shadow
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

      let characterFound = false;

      // eslint-disable-next-line no-shadow
      snapshot.forEach((doc) => {
        const character = doc.id;
        const { left, top, right, bottom } = doc.data();

        if (x >= left && x <= right && y >= top && y <= bottom) {
          console.log(`Clicked within ${character}'s area.`);
          characterFound = true;
        }
      });

      if (!characterFound) {
        console.log("No character found.");
      }
    } catch (error) {
      console.error("Error verifying clicked position:", error);
    }
  };
  return {
    storeCharacterLocations,
    getCharacterLocations,
    verifyClickedPosition,
  };
})();

export const OtherLogic = (() => {
  // ...
})();

// FirestoreManager.storeCharacterLocations(); // Works ...
// FirestoreManager.getCharacterLocations(); // Works...
