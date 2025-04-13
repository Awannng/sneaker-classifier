import React from "react";
import { useCallback } from "react";

const DragDrop = ({
  isDragging,
  fileInputRef,
  setIsDragging,
  setSelectedImage,
}) => {
  // Handles uploading of image files
  const handleImageUpload = (file) => {
    // Check if file exists and is an image
    if (file && file.type.match("image.*")) {
      const reader = new FileReader();

      // When file reading is complete
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };

      // Read the file as data URL (base64 encoded)
      reader.readAsDataURL(file);
    }
  };

  // Handles drag enter event (when item enters drop zone)
  const handleDragEnter = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true); // Show visual feedback
  }, []);

  // Handles drag leave event (when item leaves drop zone)
  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false); // Remove visual feedback
  }, []);

  // Handles drag over event (while item is over drop zone)
  const handleDragOver = useCallback((e) => {
    e.preventDefault(); // Necessary to allow drop
    e.stopPropagation();
  }, []);

  // Handles drop event (when item is dropped). Checks both from locally and website
  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      // Check if files are being dropped
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        // Local file is being dropped
        handleImageUpload(e.dataTransfer.files[0]);
      } else if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
        // Check for dragged HTML content (like images from websites)
        for (let i = 0; i < e.dataTransfer.items.length; i++) {
          if (e.dataTransfer.items[i].kind === "file") {
            // This is a file (might be needed for some cases)
            const file = e.dataTransfer.items[i].getAsFile();
            handleImageUpload(file);
          } else if (e.dataTransfer.items[i].type === "text/html") {
            // This is HTML content (like an image from a website)
            e.dataTransfer.items[i].getAsString((html) => {
              // Extract image URL from HTML
              const doc = new DOMParser().parseFromString(html, "text/html");
              const images = doc.querySelectorAll("img");
              if (images.length > 0) {
                setSelectedImage(images[0].src);
              }
            });
          } else if (e.dataTransfer.items[i].type.startsWith("text/uri-list")) {
            // This is a direct URL drop
            e.dataTransfer.items[i].getAsString((url) => {
              if (url.match(/\.(jpeg|jpg|gif|png|webp)$/)) {
                setSelectedImage(url);
              }
            });
          }
        }
      }
    },
    [setSelectedImage]
  );

  // Handles file selection via input element
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  // Triggers the hidden file input click
  const triggerFileInput = (e) => {
    e.stopPropagation(); // Prevent event bubbling, stop duplication of uploading image
    fileInputRef.current.click();
  };
  
  return (
    <>
      {/* Drag and drop the img or upload download img */}
      <div
        className="drag-drop"
        onClick={triggerFileInput}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {/* visual display */}
        <span>
          {isDragging ? "Drop your image here" : "Click or drag & drop"}
        </span>

        <input
          ref={fileInputRef}
          type="file"
          className="img-input"
          accept="image/*"
          onChange={handleFileInputChange}
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    </>
  );
};

export default DragDrop;
