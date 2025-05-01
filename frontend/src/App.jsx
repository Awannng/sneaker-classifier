import { useState, useRef, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import "./App.css";
import DragDrop from "../components/DragDrop";
//new image imports



function App() {
  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [prediction, setPrediction] = useState("");

  const [model, setModel] = useState(null);

  const labels = [
    "Adidas", "Asics", "Converse", "New_Balance",
    "Nike", "Puma", "Reebok", "Skechers", "Vans"
  ];

  // Load model on mount
  useEffect(() => {
    const loadModel = async () => {
      const loadedModel = await tf.loadLayersModel("/model/model.json");
      setModel(loadedModel);
    };
    loadModel();
  }, []);

  // Run prediction when image changes
  useEffect(() => {
    if (selectedImage && model) {
      const image = new Image();
      image.src = selectedImage;
      image.onload = async () => {
        const tensor = tf.browser
          .fromPixels(image)
          .resizeNearestNeighbor([180, 180])
          .toFloat()
          .expandDims(); // No .div(255) since model has Rescaling layer

        const prediction = model.predict(tensor);
        const softmax = tf.softmax(prediction);
        const probs = await softmax.data();

        const bestIndex = probs.indexOf(Math.max(...probs));
        setPrediction(labels[bestIndex]);
      };
    }
  }, [selectedImage, model]);

  return (
    <>
      <div className="shoe-cap">
        <div className="small-trap"></div>
        <h1 className="title">Sneaker Classifier</h1>

        <div className="outer-shoe-container">
          <div className="inner-shoe-container">
            <img
              className="left-shoe"
              src="/assets/orange-blue-shoe-left.png"
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
              src="/assets/orange-blue-shoe-right.png"
              alt="right shoe image"
            />

            {/* Uploaded Image Preview */}
            <div className="output-image">
              <h3>Image</h3>
              {selectedImage && <img src={selectedImage} alt="uploaded img" />}
            </div>

            {/* Prediction output */}
            <div className="prediction">
              <h1>Prediction: {prediction}</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
