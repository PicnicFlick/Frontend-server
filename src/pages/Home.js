import styled from "styled-components";

import logo from 'assets/images/Logo.png';
import menu from 'assets/images/Menu.svg';
import { Link } from "react-router-dom";

function Home() {
    console.log(logo, menu);
    return (
        <Wrapper>
            <WidthBlock>
                <TopBar>
                    <img src={logo} />
                    <Link to="my_page">
                        <img src={menu} />
                    </Link>
                </TopBar>

                <QRBar>
                    <h1>대여하기</h1>
                    <h2>반납하기</h2>
                </QRBar>
            </WidthBlock>
        </Wrapper>
    )
}

export default Home;

export const Flex = styled.div`
display:flex;
justify-content:center;
align-items:center;
`;

export const Wrapper = styled(Flex)`
width:100vw;
height:100vh;
`;

export const WidthBlock = styled(Flex)`
width:100%;
min-height:100vh;
@media screen and (min-width:450px){
    width:375px;
}

border-left:2px solid #E6EAED;
border-right:2px solid #E6EAED;

flex-direction:column;
justify-content:flex-start;
`;

export const TopBar = styled(Flex)`
position:relative;

width: 100%;
height: 48px;
flex-shrink: 0;

background-color:#00D09E;

justify-content:space-between;
align-items:center;

padding:16px;
`;


export const QRBar = styled(Flex)`
position:absolute;
bottom:0%;

cursor:pointer;

h1{
    width: 188px;
height: 73px;
flex-shrink: 0;

background: #00D09E;

color: #FFF;
text-align: center;
font-size: 24px;
font-style: normal;
font-weight: 700;
line-height: 24px; /* 100% */
letter-spacing: -0.333px;

display:flex;
justify-content:center;
align-items:center;
}

h2{
    width: 188px;
height: 73px;
flex-shrink: 0;

background: #7A7A7A;

color: #FFF;
text-align: center;
font-size: 24px;
font-style: normal;
font-weight: 700;
line-height: 24px; /* 100% */
letter-spacing: -0.333px;

display:flex;
justify-content:center;
align-items:center;
}
`;