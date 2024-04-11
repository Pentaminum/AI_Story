import Header from '../components/header';
import styled from 'styled-components';
import HTMLFlipBook from "react-pageflip";
import PageCover from './storypages/StoryCover';
import Page1 from './storypages/Page1';
import Page2 from './storypages/Page2';
import Page3 from './storypages/Page3';
import Page4 from './storypages/Page4';
import Page5 from './storypages/Page5';
import Page6 from './storypages/Page6';
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
    const [title, setTitle] = useState(""); // State to store fetched title
    const totalPages = 8; 

    useEffect(() => {
        // Fetch the title when component mounts
        const fetchTitle = async () => {
            try {
                const response = await fetch('http://localhost:4000/title');
                const data = await response.json();
                setTitle(data.title); // Update the title state with fetched data
            } catch (error) {
                console.error('Error fetching title:', error);
            }
        };

        fetchTitle();
    }, []); // Empty dependency array means this effect runs once on component mount

    // Handlers for next and previous buttons
    const handleNextButtonClick = () => {
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
                width={900} 
                height={900}
                minWidth={315}
                maxWidth={1000} 
                minHeight={400}
                maxHeight={1533}
                size="stretch"
                disableFlipByClick
                showCover={true}
                mobileScrollSupport={true}
                onFlip={(e) => setCurrentPage(e.data)}
                ref={flipBookRef}
                className="demo-book">
                    <PageCover number={0}>{title || "Loading title..."}</PageCover>
                    <Page1 number={1}/>
                    <Page2 number={2}/>
                    <Page3 number={3}/>
                    <Page4 number={4}/>
                    <Page5 number={5}/>
                    <Page6 number={6}/>
                    <PageCover number={7}>The End</PageCover>
            </HTMLFlipBook>
        </Wrapper>
    );
}

export default StoryBook;
