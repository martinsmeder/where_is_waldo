const path = require("path");
const Dotenv = require("dotenv-webpack");

module.exports = {
  entry: {
    main: ["./src/app-logic.js", "./src/app.js"], // Combine multiple entry points
  },
  devtool: "inline-source-map", // Enable multi-file debugging
  plugins: [new Dotenv()],
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
};
