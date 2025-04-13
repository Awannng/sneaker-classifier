import { useState } from "react";
import "./App.css";

function App() {
  return (
    <>
      <h1>Sneaker Classifier</h1>

      {/* the container for the shoe */}
      <div className="image-container">
        <img
          className="left-shoe"
          src="/src/assets/orange-blue-shoe-left.png"
          alt="left shoe image"
        />
        <img
          className="right-shoe"
          src="/src/assets/orange-blue-shoe-right.png"
          alt="right shoe image"
        />
      </div>
    </>
  );
}

export default App;
