import styled, { keyframes } from "styled-components"
import { FlowBox, FlowImg, FlowText, LentalButton, LentalMain, MainBoard } from "./Lental_Root";
import { useNavigate } from "react-router-dom";

import place1 from 'assets/images/Place1.png';
import flowSecond from 'assets/images/flowSecond.png';
import lentalFlow1 from 'assets/images/LentalFlow1.png';
import character from 'assets/images/Character.png';
import ballon from 'assets/images/Ballon.png';


function Lental_1(){
    const navigate=useNavigate();

    const place = "CU뚝섬르네상스점 옆";
    const cnt = 8;
    const entire = 20;
    return (
        <LentalMain>
            <MainBoard>
                <FlowBox>
                    <FlowImg 
                    style={{height:'52px'}}
                    src={lentalFlow1}/>
                    <FlowSecond>대여 수량 확인</FlowSecond>
                </FlowBox>

                <AbleBox>
                    <h1>
                        {place}
                    </h1>
                    <h2>
                        대여 가능 수량
                    </h2>
                    <h3>
                        <span>{cnt}</span> / {entire}
                    </h3>
                    <PlaceImg src={place1}/>
                </AbleBox>


                <CharacterBox>
                    <Ballon src={ballon}/>
                    <Character src={character}/>
                </CharacterBox>

            </MainBoard>
                <LentalButton onClick={()=>navigate('/lental/2')}>다음</LentalButton>
        </LentalMain>
    )
}

export default Lental_1

export const fadein = keyframes`
    from {
        margin-top:0px;
        opacity: 0;
    }
    to {
        margin-top:12px;
        opacity: 1;
    }

`;

export const fadein_character = keyframes`
    from {
        margin-top:8px;
        opacity: 0;
    }
    to {
        margin-top:20px;
        opacity: 1;
    }

`;

const PlaceImg = styled.img``;
const AbleBox = styled.div`
animation: ${fadein} 1s;
  -moz-animation: ${fadein} 1s; /* Firefox */
  -webkit-animation: ${fadein} 1s; /* Safari and Chrome */
  -o-animation: ${fadein} 1s; /* Opera */

position:relative;
margin-top:12px;

width: 342px;
height: 145px;
flex-shrink: 0;

border-radius: 16px;
background: #FFF;
box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);

h1{
    position:absolute;
    top:31px;
    left:20px;

    color: var(--kakao-logo, #000);
    font-family: Pretendard;
    font-size: 19px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px; /* 126.316% */
    letter-spacing: -0.333px;
}

h2{
    position:absolute;
    top:60px;
    left:20px;

    color: var(--kakao-logo, #000);
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px; /* 171.429% */
    letter-spacing: -0.333px;
}

h3{
    position:absolute;
    top:90px;
    left:20px;

    color: #B7B7B7;
font-family: Pretendard;
font-size: 24px;
font-style: normal;
font-weight: 800;
line-height: 24px;
letter-spacing: -0.333px;

span{
    color: #00D09E;
    font-size: 24px;
}
}

${PlaceImg}{
    position:absolute;
    top:50%;
    right:20px;
    transform:translateY(-50%);

    width:100px;
    height:100px;
    border-radius:12px;
}
`;

const FlowSecond = styled(FlowText)`
width:122px;

left:50%;
bottom:0;
transform:translateX(-50%);
`;

const CharacterBox=styled.div`
animation: ${fadein_character} 1s;
  -moz-animation: ${fadein_character} 1s; /* Firefox */
  -webkit-animation: ${fadein_character} 1s; /* Safari and Chrome */
  -o-animation: ${fadein_character} 1s; /* Opera */

position:relative;
margin-top:20px;
height:200px;

`;
const Character=styled.img`
position:absolute;
left:50%;
bottom:-20px;
transform:translateX(-50%);
width:150px;
height:160px;
`;
const Ballon = styled.img`
position:absolute;
left:50%;
top:0;
transform:translateX(-50%);

width:250px;
height:110px;
`;
