import { useNavigate } from "react-router-dom";

import flow from 'assets/images/LentalFlow.png';
import { FlowBox, FlowImg, FlowText, LentalButton, LentalMain, MainBoard } from "./Lental_Root";
import styled from "styled-components";


function Lental_Start() {
  const navigate = useNavigate();

  return (
    <LentalMain>
      <MainBoard>
        <FlowBox>
          <FlowImg src={flow} />
          <FlowStart>위치 확인</FlowStart>
        </FlowBox>
      </MainBoard>
      <StartText>
          대여하기 시작 화면입니다.
          <br />
          대여소에 부착되어있는 QR코드를 촬영해주세요.
        </StartText>
      <LentalButton onClick={() => { navigate("/lental/qr") }}>
        QR코드 촬영하기
      </LentalButton>
    </LentalMain>
  );
}
export default Lental_Start;

const FlowStart = styled(FlowText)`
left:-8%;
bottom:-2px;
`;

const StartText = styled.div`
position:absolute;
top:50%;
left:50%;
transform:translate(-50%,-50%);

width:350px;
line-height:24px;
font-size:16px;
font-family:Pretendard;
color:white;

text-align:center;
`;

