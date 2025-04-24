import { useState, useRef } from "react";
import "./App.css";
import DragDrop from "../components/DragDrop";

function App() {
  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null); //to store the image that user chose
  const [isDragging, setIsDragging] = useState(false); //to present visual display when user is either dragging the image in the box

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

            {/* Drag and drop area */}
            <DragDrop
              isDragging={isDragging}
              fileInputRef={fileInputRef}
              setIsDragging={setIsDragging}
              setSelectedImage={setSelectedImage}
            />

            <img
              className="right-shoe"
              src="/src/assets/orange-blue-shoe-right.png"
              alt="right shoe image"
            />
            {/* shows the dropped image */}
            <div className="output-image ">
              <h3>Image</h3>
              {selectedImage && <img src={selectedImage} alt="uploaded img" />}
            </div>

            {/* Shows the prediction at the bottom of the shoe */}
            <div className="prediction">
              <h1>Prediction: </h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
