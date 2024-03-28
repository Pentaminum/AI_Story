import React, { useState, useRef } from 'react';
//import { saveAs } from 'file-saver';

const Page = React.forwardRef(({ number, imageSrc, textContent, children }, ref) => {
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const answersRef = useRef({});

  // Handle change in the radio button selection
  const handleOptionChange = (e) => {
    setSelectedAnswer(e.target.value);
    answersRef.current[number] = e.target.value; // Store the answer with the page number as the key
  };

  // Save the answers to a text file
  const handleSaveAnswers = () => {
    // const blob = new Blob([JSON.stringify(answersRef.current, null, 2)], {type : 'application/json'});
    // saveAs(blob, 'answers.txt');
  };

  return (
    <div className="pageOne" ref={ref}>
      <h2 className="page-header">Page {number}</h2>
     
      {/* Question and options */}
      <div className="question">
      What will you do on your first adventure?...
      <br></br>
        <form>
          <label>
            <input
              type="radio"
              name="option"
              value="Explore the forest"
              checked={selectedAnswer === 'Explore the forest'}
              onChange={handleOptionChange}
            />
            Explore the forest
          </label>
          <label>
            <input
              type="radio"
              name="option"
              value="Sail the seas"
              checked={selectedAnswer === 'Sail the seas'}
              onChange={handleOptionChange}
            />
            Sail the seas
          </label>
          {/* Add more options as needed */}
        </form>
      </div>

      {/* Button to save answers */}
      <button onClick={handleSaveAnswers}>Save My Adventure</button>
      
      <div className="page-footer">{number}</div>
      {children}
    </div>
  );
});

export default Page;
