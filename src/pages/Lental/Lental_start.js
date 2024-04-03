import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";


function Lental_Start() {
  const navigate = useNavigate();

  return (
    <LentalMain>
      <h1>대여하기 시작 화면입니다~!!!</h1>
      <LentalButton onClick={() => { navigate("/lental/qr") }}>
        대여소 QR코드 인식하기
      </LentalButton>
    </LentalMain>
  );
}
export default Lental_Start;

export const LentalMain = styled.div`
  background: #00D09E; /* 배경색 */
  display: flex; /* Flexbox 레이아웃 사용 */
  flex-direction: column; /* 자식 요소를 수직 방향으로 정렬 */
  justify-content: center; /* 수직 방향 가운데 정렬 */
  align-items: center; /* 수평 방향 가운데 정렬 */
  margin: 0; /* 마진 제거 */
  padding: 0; /* 패딩 제거 */
`;


export const LentalButton = styled.div`
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


  &:hover{
    border:2px solid orange;
  }

  cursor:pointer;

  display:flex;
  justify-content:center;
  align-items:center;
`;
