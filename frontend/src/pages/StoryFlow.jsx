import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Page = React.forwardRef(({ number, onStoryReady }, ref) => {
  const [isStoryReady, setIsStoryReady] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const navigate = useNavigate(); // Use useNavigate hook

  useEffect(() => {
    // Only start checking if isCreating is true
    if (isCreating) {
      const checkDirectory = async () => {
        try {
          const response = await fetch('http://localhost:4000/story/ready');
          const textResponse = await response.text(); // Get the response as text
          
          // Check the text response directly
          if (textResponse === 'Success') {
            setIsStoryReady(true); // The story is ready
            setIsCreating(false); // Stop showing the creating message
            if (onStoryReady) onStoryReady();
          } else {
            // If not successful, try checking again after a delay
            setTimeout(checkDirectory, 10000);
          }
        } catch (error) {
          console.error('Failed to check directory:', error);
          setIsCreating(false); // Ensure we handle failed attempts properly
        }
      };
  
      checkDirectory(); // Start the check
    }
  }, [isCreating, onStoryReady]);
  

  const handleCreateStory = () => {
    setIsCreating(true); // Indicate that creation process is starting
    // Call API to trigger story generation
    fetch('http://localhost:4000/generate/images')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        console.log('Image generation started.');
        // No need to set isCreating here as it's set to true already
      })
      .catch(error => {
        console.error('Error starting image generation:', error);
        setIsCreating(false); // Stop the creation process if there's an error
      });
  };

  const handleNavigate = () => {
    navigate('/storybook'); // Navigate to the storybook page
  };

  return (
    <div className="pageOne" ref={ref}>
      <div className='page-intro-text'>Creating your story...</div>
      {isCreating && !isStoryReady && (
        <div className="page-text">Please wait while your storybook is being created!</div>
      )}
      {!isCreating && !isStoryReady && (
        <button className="button" onClick={handleCreateStory}>Create Story</button>
      )}
      {isStoryReady && (
        <button className="button" onClick={handleNavigate}>Click here to see your storybook</button>
      )}
      <div className="page-footer">{number}</div>
    </div>
  );
});

export default Page;
