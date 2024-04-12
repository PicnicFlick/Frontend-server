import styled, { keyframes } from "styled-components";

import place from "assets/images/Place1.png";
import x from "assets/images/X.png";
import { QRHEIGHT, VH, WidthBlock } from "pages/Home";
import { useRef } from "react";

function MarkerInfo({placeInfo, setShowInfo}){
    return(
        <MarkerInfoBoard>
            <div 
            style={{height:`${VH-QRHEIGHT-145}px`}}
            onClick={()=>setShowInfo(false)}/>
            <UnderBar>
                <CloseBtn onClick={()=>setShowInfo(false)} src={x}/>
                <UnderBarBoard onClick={()=>setShowInfo(true)}>
                    <UnderBar_Div disabled={true}>
                    <h1>
                        {placeInfo.name}
                    </h1>
                    <h2>
                        대여 가능 수량
                    </h2>
                    <h3>
                        {placeInfo.cnt}개
                    </h3>
                    </UnderBar_Div>
                    <PlaceImg src = {place}/>
                </UnderBarBoard>
            </UnderBar>
        </MarkerInfoBoard>
    )
}

export default MarkerInfo;

const slideUp = keyframes`
from{
    height:0px;
}
to{
    height:145px;
}
`;
const MarkerInfoBoard = styled.div`
position:absolute;
width:100%;
min-height: 100vh;

@media screen and (max-width:450px){
    min-height: -webkit-fill-available; 
}
`;

const UnderBar = styled.div`
animation: ${slideUp} 0.2s;
  -moz-animation: ${slideUp} 0.2; /* Firefox */
  -webkit-animation: ${slideUp} 0.2s; /* Safari and Chrome */
  -o-animation: ${slideUp} 0.2s; /* Opera */


position:absolute;
bottom:73px;

width: 100%;
height: 145px;
flex-shrink: 0;

border-radius: 16px 16px 0px 0px;
background: #FFF;
box-shadow: 0px -4px 4px 0px rgba(0, 0, 0, 0.25);


display:flex;
align-items:center;
`;

const UnderBarBoard = styled.div`
width:100%;
height:145px;
display:flex;
justify-content:space-between;
align-items:center;
`;

const CloseBtn = styled.img`
position:absolute;
left:16px;
top:16px;

width:10px;
height:10px;

cursor:pointer;
`;

const PlaceImg = styled.img`
width:100px;
height:100px;
border-radius:4px;

margin-right:24px;
`;

const UnderBar_Div = styled.div`
margin-left:24px;

display:flex;
flex-direction:column;
justify-content:center;
align-items:flex-start;

h1{
    margin-bottom:4px;

    color: var(--kakao-logo, #000);
font-family: Pretendard;
font-size: 20px;
font-style: normal;
font-weight: 400;
line-height: 24px; /* 120% */
letter-spacing: -0.333px;
}

h2{
    color: var(--kakao-logo, #000);
font-family: Pretendard;
font-size: 16px;
font-style: normal;
font-weight: 600;
line-height: 24px; /* 150% */
letter-spacing: -0.333px;
}

color: #00D09E;
font-family: Pretendard;
font-size: 20px;
font-style: normal;
font-weight: 800;
line-height: 24px; /* 120% */
letter-spacing: -0.333px;
`;

