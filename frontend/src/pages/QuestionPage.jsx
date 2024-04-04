import React, { useState } from 'react';
// Assuming you've already set up the necessary backend and fetch setup

const Page = React.forwardRef(({ number, imageSrc, textContent, children }, ref) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState({});
  const [answers, setAnswers] = useState({});
  const [isSaved, setIsSaved] = useState(false);
  const questionsWithOptions = [
    { question: "What will be your story's theme?", options: ['Fantasy', 'Mystery', 'Horror', 'Comedy'] },
    { question: "What is your preferred setting?", options: ['City', 'Forest', 'Space', 'Underwater'] },
    { question: "Choose your protagonist's main trait", options: ['Brave', 'Cunning', 'Compassionate', 'Mysterious'] },
    { question: "Select the primary conflict", options: ['Man vs Man', 'Man vs Nature', 'Man vs Society', 'Man vs Self'] }
  ];

  const handleOptionChange = (question, value) => {
    setAnswers({ ...answers, [question]: value });
    setIsDropdownOpen({ ...isDropdownOpen, [question]: false });
  };

  const saveAnswersToBackend = () => {
    if (Object.keys(answers).length === questionsWithOptions.length) {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(answers)
      };

      fetch('http://yourserver.com/api/saveAnswers', requestOptions)
        .then(response => response.json())
        .then(data => {
          console.log("Response from server:", data);
          setIsSaved(true); // Update state to indicate the answers are saved
        })
        .catch(error => {
          console.error('There was an error!', error);
          // setIsSaved(true);
          console.error('Answers: ', answers);
        });
    } else {
      console.log("Please answer all questions before saving.");
    }
  }; 

  return (
    <div className="pageOne" ref={ref}>
      <div className='page-intro-text'>Choose your adventure...</div>

      {questionsWithOptions.map((item, index) => (
        <div className="question" style={{ textAlign: 'center', marginTop: index > 0 ? '20px' : '0' }} key={item.question}>
          {item.question}
          <br />
          <div className="dropdown">
            <div className="dropdown-toggle" onClick={() => setIsDropdownOpen({ ...isDropdownOpen, [item.question]: !isDropdownOpen[item.question] })}>
              {answers[item.question] || 'Select an option'}
            </div>
            {isDropdownOpen[item.question] && (
              <ul className="dropdown-menu">
                {item.options.map((option, optionIndex) => (
                  <li key={optionIndex} onClick={() => handleOptionChange(item.question, option)}>
                    {option}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      ))}

      <button className='button' onClick={saveAnswersToBackend} disabled={isSaved} style={{ marginTop: '20px' }}>Save All Answers</button>

      <div className="page-footer">{number}</div>
      {children}
    </div>
  );
});

export default Page;
