import { Flex, WidthBlock, Wrapper } from "pages/Home"
import styled, { keyframes } from "styled-components";
import bkBtn from 'assets/images/BackButton2.png';

import { Outlet, useNavigate } from "react-router-dom";
import { useLogined } from "hooks/useLogined";


function Lental_Root() {
    // useLogined();
    const navigate = useNavigate();

    return (
        <Wrapper>
            <WidthBlock_Lental style={{ backgroundColor: '#00D09E' }}>
                <BkBtn onClick={() => { navigate(-1) }} src={bkBtn} />
                <Outlet />
            </WidthBlock_Lental>
        </Wrapper>
    )
}

export default Lental_Root




export const fadein_btn = keyframes`
    0% {
        opacity: 0;
    }
    80% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }

`;


export const WidthBlock_Lental = styled(WidthBlock)`
position:relative;
justify-content:center;

h1{
color: #FFF;
text-align: center;
font-family: Pretendard;
font-size: 14px;
font-style: normal;
font-weight: 400;
line-height: 20px; /* 142.857% */
letter-spacing: -0.333px;
}
`;

export const BkBtn = styled.img`
position:absolute;

top:12px;
left:12px;

width:30px;
height:30px;

cursor:pointer;
`;

export const LentalMain = styled.div`
min-height: 100vh;

@media screen and (max-width:450px){
    min-height: -webkit-fill-available; 
}

background: #00D09E; /* 배경색 */
display: flex; /* Flexbox 레이아웃 사용 */
flex-direction: column; /* 자식 요소를 수직 방향으로 정렬 */
justify-content: space-evenly; /* 수직 방향 가운데 정렬 */
align-items: center; /* 수평 방향 가운데 정렬 */
margin: 0; /* 마진 제거 */
padding: 0; /* 패딩 제거 */
`;


export const FlowBox = styled(Flex)`
position:relative;
height:112px;
`;
export const FlowImg = styled.img`
width:220px;
height:50px;
`;
export const FlowText = styled.p`
position:absolute;

color: #FFF;
text-align: center;
font-family: BmJua;
font-size: 22px;
font-style: normal;
font-weight: 400;
line-height: 24px; /* 109.091% */
letter-spacing: -0.333px;
`;


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

  animation:${fadein_btn} 1s;

  color: var(--kakao-logo, #000);
  font-family: Pretendard;
  font-size: 27px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px; /* 88.889% */
  letter-spacing: -0.333px;

  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);


  cursor:pointer;

  display:flex;
  justify-content:center;
  align-items:center;
`;

export const MainBoard = styled(Flex)`
position:absolute;



min-height:60vh;
top:40px;
left:50%;
transform:translateX(-50%);

display:flex;
flex-direction:column;
justify-content:space-between;
`;