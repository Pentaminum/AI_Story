import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Page = React.forwardRef(({ number, onStoryReady }, ref) => {
  const [isStoryReady, setIsStoryReady] = useState(false);
  const navigate = useNavigate(); // Use useNavigate hook

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsStoryReady(true); // Simulate storybook being ready
      if (onStoryReady) onStoryReady();
    }, 3000); // Example delay

    return () => clearTimeout(timer);
  }, [onStoryReady]);

  const handleNavigate = () => {
    navigate('/storybook'); // Use navigate function
  };

  return (
    <div className="pageOne" ref={ref}>
      <div className='page-intro-text'>Shape your story...</div>
      {!isStoryReady ? (
        <div className="page-text">Wait while your storybook is being created!</div>
      ) : (
        <button onClick={handleNavigate}>Click here to see your storybook</button>
      )}
      <div className="page-footer">{number}</div>
    </div>
  );
});

export default Page;
