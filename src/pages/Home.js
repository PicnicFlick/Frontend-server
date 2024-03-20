import styled from "styled-components";

import logo from 'assets/images/Logo.png';
import menu from 'assets/images/Menu.svg';
import x from 'assets/images/X.png';
import next from 'assets/images/Next.png';

import { Link } from "react-router-dom";
import NaverMap from "components/NaverMap";
import { useEffect, useRef, useState } from "react";
import MenuBar from "components/MenuBar";

const VH = window.innerHeight;
const QRHEIGHT = 72;
const TOPBARHEIGHT = 48;

function Home() {
    const [login, setLogin] = useState(false);
    const [showPopUp, setShowPopUp] = useState(true);
    const [menuLeft, setMenuLeft] = useState('100%');

    const onClick_showPopUp = ()=>{
        setShowPopUp(prev=>!prev);
        console.log("showPopUp",showPopUp);
        console.log()
    }

    const onClick_menu = () => {
        setMenuLeft('40%');
    }

    return (
        <Wrapper>
            <WidthBlock>
                <TopBar>
                    <img style={{ width: '100px', height: '22px' }} loading="lazy" src={logo} />
                    <img src={menu} onClick={onClick_menu}/>
                </TopBar>
                <NaverMap height={VH - QRHEIGHT - TOPBARHEIGHT} />
                <QRBar>
                    <h1>대여하기</h1>
                    <h2>반납하기</h2>
                </QRBar>

                {showPopUp&&
                (login
                    ?
                    <WarningBar>
                        <X src={x} onClick={onClick_showPopUp}/>
                        현재&nbsp;
                        <span>대여중</span>인 돗자리는&nbsp;
                        <span>0개</span>입니다.
                        <Next src={next} />
                    </WarningBar>
                    : <WarningBar>
                        <X src={x} onClick={onClick_showPopUp}/>
                        서비스를 이용을 위해&nbsp;
                         <span>
                            로그인
                        </span>
                        을 해주세요
                        <Next src={next} />
                    </WarningBar>
                )
                // 중첩조건문할 때는 괄호 사용
                }
                <MenuBar left={menuLeft} setMenuLeft={setMenuLeft}/>
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
position:relative;
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
height: ${TOPBARHEIGHT}px;
flex-shrink: 0;

background-color:#00D09E;

justify-content:space-between;
align-items:center;

padding:16px;

img{
    cursor:pointer;
}
`;


export const QRBar = styled(Flex)`
position:absolute;
bottom:0%;

cursor:pointer;

h1{
width: 186px;
height: ${QRHEIGHT}px;
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
width: 186px;
height: ${QRHEIGHT}px;
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


export const WarningBar = styled(Flex)`
position:absolute;
left:50%;
transform:translateX(-50%);
bottom:100px;

width: 349px;
height: 37px;
flex-shrink: 0;

background-color: #FFF;
filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));

border-radius:12px;

color: var(--kakao-logo, #000);
text-align: center;
font-size: 14px;
font-style: normal;
font-weight: 300;
line-height: 24px; /* 171.429% */
letter-spacing: -0.333px;

span{
    color: #00D09E;
    font-size: 14px;
}
`;
export const X = styled.img`
position:absolute;
left:16px;
top:50%;
transform:translateY(-50%);

width:8px;
height:8px;

cursor:pointer;
`;
export const Next = styled.img`
position:absolute;
right:16px;
top:50%;
transform:translateY(-50%);

width:6px;
height:12px;

cursor:pointer;
`;