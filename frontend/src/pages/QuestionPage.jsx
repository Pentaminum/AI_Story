import React, { useState } from 'react';

const Page = React.forwardRef(({ number, imageSrc, textContent, children }, ref) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState({});
  const [answers, setAnswers] = useState({});
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const questionsWithOptions = [
    { key: 'theme', question: "What will be your story's theme?", options: ['Fantasy', 'Mystery', 'Horror', 'Comedy'] },
    { key: 'place', question: "What is your preferred setting?", options: ['City', 'Forest', 'Space', 'Underwater'] },
    { key: 'main_trait', question: "Choose your protagonist's main trait", options: ['Brave', 'Cunning', 'Compassionate', 'Mysterious'] },
    { key: 'conflict', question: "Select the primary conflict", options: ['Quest', 'Villain', 'Battle', 'Betrayal', 'Curse'] }
  ];

  const handleOptionChange = (key, value) => {
    setAnswers({ ...answers, [key]: value });
    setIsDropdownOpen({ ...isDropdownOpen, [key]: false });
  };

  const saveAnswersToBackend = () => {
    if (Object.keys(answers).length === questionsWithOptions.length) {
      setIsSaving(true);
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(answers)
      };

      fetch('http://localhost:4000/upload/settings', requestOptions)
        .then(response => response.json())
        .then(data => {
          console.log("Response from server:", data);
          setIsSaving(false);
          setIsSaved(true); // Update state to indicate the answers are saved
        })
        .catch(error => {
          console.log(answers);
          setIsSaving(false);
          console.error('There was an error!', error);
        });
    } else {
      alert("Please answer all questions before saving.");
    }
  }; 

  return (
    <div className="pageOne" ref={ref}>
      <div className='page-intro-text'>Choose your adventure...</div>

      {questionsWithOptions.map((item, index) => (
        <div className="question" style={{ textAlign: 'center', marginTop: index > 0 ? '20px' : '0' }} key={item.key}>
          {item.question}
          <br />
          <div className="dropdown">
            <div className="dropdown-toggle" onClick={() => setIsDropdownOpen({ ...isDropdownOpen, [item.key]: !isDropdownOpen[item.key] })}>
              {answers[item.key] || 'Select an option'}
            </div>
            {isDropdownOpen[item.key] && (
              <ul className="dropdown-menu">
                {item.options.map((option, optionIndex) => (
                  <li key={optionIndex} onClick={() => handleOptionChange(item.key, option)}>
                    {option}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      ))}

<button className='button' onClick={saveAnswersToBackend} disabled={isSaving || isSaved} style={{ marginTop: '20px' }}>
        {isSaving ? 'Saving...' : 'Save All Answers'}
      </button>
      {isSaved && !isSaving && (
        <div className='text'>Answers Saved!</div>
      )}
      
      <div className="page-footer">{number}</div>
      {children}
    </div>
  );
});

export default Page;
