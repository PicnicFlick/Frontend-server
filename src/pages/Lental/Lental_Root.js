import { Flex, WidthBlock, Wrapper } from "pages/Home"
import styled from "styled-components";
import bkBtn from 'assets/images/BackButton2.png';

import { Outlet, useNavigate } from "react-router-dom";


function Lental_Root() {
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

margin-bottom:8px;
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

    h1{
    font-size:16px;
    }
`;

export const FlowBox = styled(Flex)`
position:absolute;
top:10%;
left:50%;
transform:translateX(-50%);

height:112px;

flex-direction:column;
`;