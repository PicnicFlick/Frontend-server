import { Flex, WidthBlock, Wrapper } from "pages/Home"
import { FlowBox, FlowImg, FlowText, LentalButton, LentalMain, MainBoard } from "./Lental_Root"

import flowThird from 'assets/images/flowThird.png';
import lentalFlow2 from 'assets/images/LentalFlow2.png';
import styled from "styled-components";

function Lental_2(){
    const price = 1000;
    const guarantee=4000;
    const price_entire=5000;
    const amount_spent=1000;
    return (
        <LentalMain>
            <MainBoard>
                <FlowBox>
                    <FlowImg
                    style={{height:'52px'}}
                    src={lentalFlow2}/>
                    <FlowThird>금액 결제</FlowThird>
                </FlowBox>
                
                <PayBox>
                    <h1>
                        결제금액 상세
                    </h1>
                    <ReceiptBox>
                        <Element>
                            <h2>
                                대여비
                            </h2>
                            <h3>
                                {price}원
                            </h3>
                        </Element>

                        <Element>
                            <h2>
                                보증금
                            </h2>
                            <h3>
                                {guarantee}원
                            </h3>
                        </Element>

                        <HR/>

                        <Element>
                            <h2>
                                총 결제금액
                            </h2>
                            <h3>
                                {price_entire}원
                            </h3>
                        </Element>
                    </ReceiptBox>
                        <EntireSpent>
                            <h4>
                                반납 성공 시 총 지출액
                            </h4>

                            <h5>
                                {amount_spent}
                            </h5>
                        </EntireSpent>
                </PayBox>
            </MainBoard>
            <LentalButton>결제하러 가기</LentalButton>
        </LentalMain>
    )
}

export default Lental_2


const FlowThird= styled(FlowText)`
right:0;
bottom:0;
transform:translateX(15%);
`;


const PayBox = styled.div`
width: 342px;
height: 286px;
flex-shrink: 0;
border-radius: 16px;
background: #FFF;

h1{
    color: var(--kakao-logo, #000);
font-family: Pretendard;
font-size: 25px;
font-style: normal;
font-weight: 700;
line-height: 24px; /* 96% */
letter-spacing: -0.333px;
}
`;

const Element=styled.div``;
const HR=styled.div``;
const ReceiptBox=styled(Flex)`
flex-direction:column;
justify-content:center;

${Element}{
    color: var(--kakao-logo, #000);
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 28px;
    letter-spacing: -0.333px;
    h2{
        color: var(--kakao-logo, #868383);
    }
    h3{
        color:black;
    }
    ${HR}{
        width:200px;
        height:2px;
        background-color: #868383;
    }
}
`;

const EntireSpent = styled.div`

font-family: Pretendard;
font-size: 22px;
font-style: normal;
font-weight: 700;
line-height: 28px; /* 127.273% */
letter-spacing: -0.333px;
    h4{
        color: var(--kakao-logo, #868383);
    }
    h5{
        color: black;
    }
`;
