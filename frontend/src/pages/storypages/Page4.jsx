import React, { useState, useEffect } from 'react';

const Page4 = React.forwardRef(({ number = 2, children }, ref) => {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const fetchImageData = async () => {
      try {
        const response = await fetch(`http://localhost:4000/imagenum/2`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setImageUrl(url);
      } catch (error) {
        console.error('Failed to fetch image:', error);
      }
    };

    fetchImageData();
  }, [number]); // Dependency array includes number to refetch if it changes 

  return (
    <div className="storyPage" ref={ref}>
      <div class='story-container'>
      {imageUrl && <img src={imageUrl} alt={`Story image for page ${number}`} style={{ width: '100%' }} className='story-image'/>}
      </div>
      <div className="page-footer">{number}</div>
      {children}
    </div>
  );
});

export default Page4;
