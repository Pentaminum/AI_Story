import React, { useState } from 'react';
import axios from 'axios'; // Import axios for HTTP requests
import styled from 'styled-components';

const UploadImage = React.forwardRef(({ number, textContent, children }, ref) => {
  const [images, setImages] = useState([]);
  const [files, setFiles] = useState([]); // State to store the file objects
  const [isSaved, setIsSaved] = useState(false);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (images.length <= 3 ) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageData = reader.result;
        localStorage.setItem(`uploadedImage_${number}`, imageData);
        setImages([...images, imageData]);
        setFiles([...files, file]); // Add the file object to the files state
      };
      reader.readAsDataURL(file);
    } else {
      alert('You can only upload up to 3 images.');
    }
  };

  const uploadImages = async () => {
    if (images.length == 3){
    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append('images', file); // 'images' is the field name expected by the backend
    });

    try {
      const response = await axios.post('http://localhost:4000/upload/images', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Upload successful:', response.data);
      // Clear images and files state after successful upload, or handle as needed
      // set choose file to disabled
      setIsSaved(true);
      // setImages([]);
      // setFiles([]);
    } catch (error) {
      //setIsSaved(true);
      console.error('Error uploading images:', error);
      // Handle error as needed
    }
  }
  else {
    alert("You must uplaod 3 images!");
  }
  };


  return (
    <div className="pageOne" ref={ref}>
        <div className='page-intro-text'>Visualize your story</div>
        <div className="page-text">Upload 3 of your chosen images!</div>
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
          {!isSaved &&(<label className='button' >
            Choose File
            <input type="file" accept="image/*"  onChange={handleImageUpload} style={{ display: 'none' }} />
            
          </label>)}
        <div className='uploadbutton-container'>
          {files.length > 0 && !isSaved &&(
          <button onClick={uploadImages} className="upload-button">
            Submit Images
          </button>
        )}
       </div>
        </div>
        {isSaved &&(
          <div className='text'>
            Uploaded!
          </div>
        )}
        <div className="page-text">{textContent}</div>
        <div className="page-footer">{number}</div>
        {children}
      
    </div>
  );
});

export default UploadImage;
