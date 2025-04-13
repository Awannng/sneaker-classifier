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

        {/* Container of the shoe */}
        <div className="outer-shoe-container">
          <div className="inner-shoe-container">
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
        </div>
      </div>
    </>
  );
}

export default App;
