import { useState } from "react";
import "./App.css";

function App() {
  return (
    <>
      {/* the top for the shoe box: brown trapezoid*/}
      <div className="shoe-cap">
        {/* the small black rectangle */}
        <div className="small-trap"></div>

        <h1 className="title">Sneaker Classifier</h1>

        {/* outter box of the shoe */}
        <div className="outer-shoe-container">
          {/* inner box of the shoe */}
          <div className="inner-shoe-container">
            <img
              className="left-shoe"
              src="/src/assets/orange-blue-shoe-left.png"
              alt="left shoe image"
            />

            {/* The input box for image */}
            <input type="file" className="img-input" accept="image/*" />

            <img
              className="right-shoe"
              src="/src/assets/orange-blue-shoe-right.png"
              alt="right shoe image"
            />
            <div className="output">
              <h3>Output</h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
