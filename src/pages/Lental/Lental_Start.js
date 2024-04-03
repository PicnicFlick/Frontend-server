import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import flow from 'assets/images/LentalFlow.png';
import flowFirst from 'assets/images/flowFirst.png';
import { FlowBox, LentalMain } from "./Lental_Root";


function Lental_Start() {
  const navigate = useNavigate();

  return (
    <LentalMain>
      <FlowBox>
        <FlowImg src={flow} />
        <FlowFirst src={flowFirst} />
      </FlowBox>
      <h1>
        대여하기 시작 화면입니다.
        <br />
        대여소에 부착되어있는 QR코드를 촬영해주세요.
      </h1>
      <LentalButton onClick={() => { navigate("/lental/qr") }}>
        QR코드 촬영하기
      </LentalButton>
    </LentalMain>
  );
}
export default Lental_Start;


export const LentalButton = styled.div`
  position:absolute;
  left:50%;
  bottom:10%;
  transform:translateX(-50%);
  width: 342px;
  height: 64px;
  flex-shrink: 0;
  border-radius: 16px;
  background: #fff;

  color: var(--kakao-logo, #000);
  font-family: Pretendard;
  font-size: 27px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px; /* 88.889% */
  letter-spacing: -0.333px;

  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);


  cursor:pointer;

  display:flex;
  justify-content:center;
  align-items:center;
`;

export const FlowImg = styled.img`
width:220px;
height:50px;
`;
export const FlowFirst = styled.img`
position:absolute;
left:-15px;
bottom:0;

width:80px;
height:21px;
`;