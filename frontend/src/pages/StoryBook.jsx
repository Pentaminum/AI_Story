import Header from '../components/header';
import styled from 'styled-components';
import HTMLFlipBook from "react-pageflip";
import PageCover from './storypages/StoryCover';
import Page1 from './storypages/Page1';
import Page2 from './storypages/Page2';
import Page3 from './storypages/Page3';
import Page4 from './storypages/Page4';
import React, { useRef, useState, useEffect } from 'react';

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

function StoryBook(props) {
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
    const handlePrevButtonClick = () => {
      if (currentPage > 0) {
        setCurrentPage(currentPage - 1);
        flipBookRef.current.pageFlip().flipPrev();
      }
    };
    return (
        <Wrapper>
            
            <NavigationWrapper>
            <div className='button-container'>
            <button className='button' onClick={handlePrevButtonClick}>Previous</button>
                Page {currentPage + 1} of {totalPages}
                
                <button className='button' onClick={handleNextButtonClick}>Next</button>
                </div>
            </NavigationWrapper>
                <HTMLFlipBook 
                    width={500} // Set to a fixed width that works for your layout
                    height={600}
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
                        <Page1 number={1}/>
                        <Page2 number={2}/>
                        <Page3 number={3}/>
                        <Page4 number={4}/>
                        {/* Assuming PageCover for the end as well, adjust as necessary */}
                        <PageCover number={5} title="The End"/>
                </HTMLFlipBook>
               
            </Wrapper>
        );
}

export default StoryBook;