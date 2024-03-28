import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const goQR = () => {


}

function LentalStart() {
  return (
    <LentalMain>
      <h1>대여하기 시작 화면입니다~!!!</h1>
      <LentalButton onClick={goQR}>대여소 QR코드 인식하기</LentalButton>
    </LentalMain>
  );
}
export default LentalStart;

export const LentalMain = styled.div`
  width: 100vw;  /* 뷰포트의 전체 너비 */
  height: 100vh; /* 뷰포트의 전체 높이 */
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
  box-shadow: 0px -4px 4px 0px rgba(0, 0, 0, 0.25);
`;
