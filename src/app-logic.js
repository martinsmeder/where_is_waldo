// /* eslint-disable no-unused-vars */
// import { app, db } from "./firebase";

// console.log("app-logic.js says: this seem to be working");

// const FirestoreManager = (() => {

//   const storeCharacterLocations = (locations) => {
//     const collectionRef = db.collection("characterLocations");

//     locations.forEach((location) => {
//       const { characterId, x, y } = location;

//       collectionRef
//         .doc(characterId)
//         .set({ x, y })
//         .then(() => {
//           console.log(`Location stored for character ${characterId}`);
//         })
//         .catch((error) => {
//           console.error(
//             `Error storing location for character ${characterId}:`,
//             error
//           );
//         });
//     });
//   };

//   const verifyClickedPosition = (x, y) => {
//     // ...
//   };

//   return {
//     storeCharacterLocations,
//     verifyClickedPosition,
//   };
// })();

// export default FirestoreManager;
