import Header from '../components/header';
import styled from 'styled-components';
import HTMLFlipBook from "react-pageflip";
import PageCover from './PageCover';
import UploadImage from './UploadImage';
import Intro from './Intro';
import StoryFlow from './StoryFlow';
import QuestionPage from './QuestionPage';
import React, { useRef, useState, useEffect } from 'react';
import pageImage from '../utils/page.jpg';
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
`;
const NavigationWrapper = styled.div`
    position: absolute;
    z-index: 10; // Ensure the navigation is above the flipbook pages
    top: 95%; // Adjust this value to position the buttons vertically
    left: 50%; // Center horizontally
    transform: translateX(-50%); // Adjust based on the exact positioning you need
    display: flex;
    gap: 20px; // Add some space between buttons
`;

function MainPage(props) {
    const flipBookRef = useRef(null);
    const [currentPage, setCurrentPage] = useState(0);
    const totalPages = 6; 

      // Handlers for next and previous buttons
      const handleNextButtonClick = () => {
        // Checks if it's not the last page before flipping
        if (currentPage < totalPages - 1) {
            setCurrentPage(currentPage + 1);
            flipBookRef.current.pageFlip().flipNext();
        }
    };
    const handleResetButtonClick = () => {
        setCurrentPage(0); // Resets the current page state to 0
        flipBookRef.current.pageFlip().flip(0); // Directly flip to the first page (0 index)
    };
    return (
        <Wrapper>
            
            <NavigationWrapper>
                <button onClick={handleResetButtonClick}>Reset to Start</button>
                <span>Page {currentPage + 1} of {totalPages}</span>
                <button onClick={handleNextButtonClick}>Next</button>
            </NavigationWrapper>
                <HTMLFlipBook 
                    width={550} // Set to a fixed width that works for your layout
                    height={670}
                    minWidth={315}
                    maxWidth={1000} // You can adjust maxWidth to ensure single-page mode if supported
                    minHeight={400}
                    maxHeight={1533}
                    size="stretch"
                    disableFlipByClick

                    showCover={true}
                    mobileScrollSupport={true}
                    onFlip={(e) => setCurrentPage(e.data)}
                    ref={flipBookRef}
                    
                    className="demo-book">
                        <PageCover number={0}>Choose your Own Adventure!</PageCover>
                        <Intro number={1}/>
                        <UploadImage  number={2} />
                        <QuestionPage  number={3} />
                        <StoryFlow  number={4} />
                        <PageCover>The End</PageCover>
                </HTMLFlipBook>
               
            </Wrapper>
        );
}

export default MainPage;