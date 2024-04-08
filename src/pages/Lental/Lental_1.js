import styled from "styled-components"
import { FlowBox, FlowImg, FlowText, LentalButton, LentalMain, MainBoard } from "./Lental_Root";
import { useNavigate } from "react-router-dom";

import place1 from 'assets/images/Place1.png';
import flowSecond from 'assets/images/flowSecond.png';
import lentalFlow1 from 'assets/images/LentalFlow1.png';


function Lental_1(){
    const navigate=useNavigate();

    const place = "CU옆";
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
            </MainBoard>
                <LentalButton onClick={()=>navigate('/lental/2')}>다음</LentalButton>
        </LentalMain>
    )
}

export default Lental_1

const PlaceImg = styled.img``;
const AbleBox = styled.div`
position:absolute;
top:50%;
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
