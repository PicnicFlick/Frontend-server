import { Flex, WidthBlock, Wrapper } from "pages/Home"
import { FlowBox, FlowImg, FlowText, LentalButton, LentalMain, MainBoard } from "./Lental_Root"

import lentalFlow2 from 'assets/images/LentalFlow2.png';
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";

function Lental_3() {
    const navigate = useNavigate();



    return (
        <LentalMain>
            <MainBoard>
                <FlowBox>
                    <FlowImg
                        style={{ height: '52px' }}
                        src={lentalFlow2} />
                    <FlowThird>금액 결제</FlowThird>
                </FlowBox>
            </MainBoard>

            <H1>
                카카오페이 결제를 완료하신 후<br/>
                아래 결제완료 버튼을 눌러주세요.
            </H1>


            <LentalButton onClick={() => navigate('/lental/final')}>
                결제 완료
            </LentalButton>
        </LentalMain>
    )
}

export default Lental_3


export const fadein = keyframes`
    from {
        top:45%;
        opacity: 0;
    }
    to {
        top:50%;
        opacity: 1;
    }

`;


const FlowThird = styled(FlowText)`
right:0;
bottom:0;
transform:translateX(15%);
`;

const H1 = styled.div`
position:absolute;
top:50%;
left:50%;
transform:translate(-50%,-50%);

animation: ${fadein} 1s;
  -moz-animation: ${fadein} 1s; /* Firefox */
  -webkit-animation: ${fadein} 1s; /* Safari and Chrome */
  -o-animation: ${fadein} 1s; /* Opera */


width:350px;
  color:white;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 30px;
  text-align:center;

  display:flex;
  justify-content:center;
  align-items:center;
`;