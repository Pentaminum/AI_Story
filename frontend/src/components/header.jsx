import React from 'react';
import styled from 'styled-components';

const HeaderWrapper = styled.header`
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid black;
`;


const Header = () => {
    return (
        <HeaderWrapper>
            AI Story
        </HeaderWrapper>
    );
};

export default Header;