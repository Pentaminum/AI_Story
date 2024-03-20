import Header from '../components/header';
import styled from 'styled-components';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

function MainPage(){

    return (
        <Wrapper>
            <Header></Header>
            <h1>MAIN PAGE</h1>
        </Wrapper>
    );
}

export default MainPage;