import { useState, useRef} from "react";
import "./App.css";
import DragDrop from "../components/DragDrop";

function App() {
  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

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
            {/* the output box */}
            <div className="output">
              <h3>Output</h3>
              {selectedImage && (
                <img src={selectedImage} width="100px" alt="uploaded img" />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
