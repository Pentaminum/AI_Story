// Page1.jsx
import React, { useState } from 'react';

const UploadImage = React.forwardRef(({ number, textContent, children }, ref) => {
  // State to store uploaded images
  const [images, setImages] = useState([]);

  // Function to handle image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0]; // Get the first file from the uploaded files
    const reader = new FileReader(); // Create a FileReader object
    reader.onload = () => {
      const imageData = reader.result; // Get the image data as base64
      // Save the image data into the state
      setImages([...images, imageData]);
    };
    // Read the uploaded file as data URL
    reader.readAsDataURL(file);
  };

  return (
    <div className="pageOne" ref={ref}>
      <h2 className="page-header">Page {number}</h2>
      <div className="page-text">Upload your 3 chosen images!</div>
      {/* Display uploaded images */}
      {images.map((image, index) => (
        <img key={`image${index}`} src={image} alt={`Image ${index + 1}`} />
      ))}
<div className="page-text">
      {/* Image upload input */}
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      </div>
      <div className="page-text">{textContent}</div>
      <div className="page-footer">{number}</div>
      {children}
    </div>
  );
});

export default UploadImage;
