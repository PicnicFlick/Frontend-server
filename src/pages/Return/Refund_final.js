import { Flex, WidthBlock, Wrapper } from "pages/Home"
import { FlowBox, FlowImg, FlowText, LentalMain, MainBoard, LentalButton } from "./Return_Root"

import lentalFlow3 from 'assets/images/LentalFlow3.png';
import styled, { keyframes } from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Return_final() {
    const navigate=useNavigate();

    return (
        <LentalMain>
            <MainBoard>
                <FlowBox>
                    <FlowImg src={lentalFlow3} />
                </FlowBox>

                <TextBox>
                    <H1>반납 완료!</H1>
                    <H2>돗자리를 성공적으로 반납했습니다</H2>
                </TextBox>
            </MainBoard>

            <BtnBox>
                <FinalBtn onClick={()=>navigate('/')}>
                    홈으로 가기
                </FinalBtn>
                <FinalBtn>
                    내역 확인하기
                </FinalBtn>
            </BtnBox>

        </LentalMain>
    )
}

export default Refund_final;


export const fadein= keyframes`
    from {
        top:45%;
        opacity: 0;
    }
    to {
        top:50%;
        opacity: 1;
    }

`;


const TextBox = styled(Flex)`
animation: ${fadein} 1s;
  -moz-animation: ${fadein} 1s; /* Firefox */
  -webkit-animation: ${fadein} 1s; /* Safari and Chrome */
  -o-animation: ${fadein} 1s; /* Opera */

position:absolute;
top:50%;
left:50%;
transform:translate(-50%);
flex-direction:column;
gap:12px;
`;
const H1 = styled(FlowText)`
position:relative;

width:180px;

text-align: center;
font-size: 45px;
font-style: normal;
line-height: normal;
`;

const H2 = styled(FlowText)`
position:relative;

width:270px;

text-align: center;
font-size: 22px;
font-style: normal;
line-height: normal;
`;

const BtnBox = styled(Flex)`
position:absolute;
left:50%;
bottom:10%;
transform:translateX(-50%);

justify-content:center;
align-items:center;
gap:12px;
`;
const FinalBtn = styled(LentalButton)`
position:static;
transform:none;
//static일 때도 tranform은 적용. 조심

width:160px;
height:64px;

font-size: 22px;
font-weight: 600;
`;