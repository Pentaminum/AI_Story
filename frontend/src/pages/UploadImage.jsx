import React, { useState } from 'react';
import styled from 'styled-components';

const UploadImage = React.forwardRef(({ number, textContent, children }, ref) => {
  const [images, setImages] = useState([]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (images.length < 3) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageData = reader.result;
        localStorage.setItem(`uploadedImage_${number}`, imageData);
        setImages([...images, imageData]);
      };
      reader.readAsDataURL(file);
    } else {
      alert('You can only upload up to 3 images.');
    }
  };

  return (
    <div className="pageOne" ref={ref}>
        <div className='page-intro-text'>Visualize your story</div>
        <div className="page-text">Upload your chosen images!</div>
         {/* Display number of images uploaded */}
         {images.length > 0 && <div className="page-text">{images.length} image{images.length === 1 ? '' : 's'} uploaded!</div>}
        {/* Display uploaded images */}
        <div className="image-container">
        {images.map((image, index) => (
            <img key={`image${index}`} src={image} alt={`Image ${index + 1}`} className="uploaded-image" />
          ))}
        </div>
        <div className="page-text">
          {/* Styled file input button */}
          <label className='button'>
            Choose File
            <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
          </label>
        </div>
        
        <div className="page-text">{textContent}</div>
        <div className="page-footer">{number}</div>
        {children}
      
    </div>
  );
});

export default UploadImage;
