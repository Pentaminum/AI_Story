import React, { useState, useEffect } from 'react';

const Page3 = React.forwardRef(({ number = 2, children }, ref) => {
  const [storyData, setStoryData] = useState({
    story: ''
  });


  useEffect(() => {
    const fetchStoryData = async () => {
      try {
        const response = await fetch(`http://localhost:4000/storynum/2`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setStoryData(data); // Assuming the backend response matches the expected structure
      } catch (error) {
        console.error('Failed to fetch story data:', error);
      }
    };

    fetchStoryData(); // This needs to be called inside the useEffect
  }, [number]); // Dependency array to ensure useEffect runs when `number` changes

  return (
    <div className="storyPage" ref={ref}>
       <div class="story-container">
        
      <div className='story-text'>{storyData.story}</div> {/* Display the story content */}
      </div>
      <div className="page-footer">{number}</div>
      {children}
    </div>
  );
});

export default Page3;
