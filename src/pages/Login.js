import KakaoLogin from "components/KakaoLogin"
import { Flex, WidthBlock, Wrapper } from "./Home"
import TopBar_Account from "components/TopBar_Account"
import styled from "styled-components"

import hangang from 'assets/images/hangang.jpeg'


function Login() {
    return (
        <StyledWrapper>
            <WidthBlock>
                <Footer>
                    <h1>Picnik Flick!</h1>
                    <h2>깨끗한 한강을 만드는 작은 한 걸음,</h2>
                    <h2> 친환경 돗자리 대여 서비스</h2>
                </Footer>
                <TopBar_Account text='로그인' />
                <MainBoard>
                    <KakaoButtonContainer>
                        <KakaoLogin />
                    </KakaoButtonContainer>
                    <AA>저희 피크닉플릭은 '카카오계정'을 통해</AA>
                    <AA2>회원가입을 도와드리고 있습니다</AA2>
                </MainBoard>
            </WidthBlock>
        </StyledWrapper>
    )

}
export default Login

const StyledWrapper = styled(Wrapper)`
    display: flex;          
    justify-content: center; 
    align-items: center;    
    height: 100vh;           
    min-height: 100vh;       
    width: 100%;             
    background-image: url(${hangang}); 
    background-size: cover;  
    background-position: center;       
    position: relative;     
    @media screen and (max-width: 450px) {
        min-height: -webkit-fill-available;  /* 모바일에서 사용할 수 있는 최대 높이 */
    }

    @media screen and (min-width: 450px) {
        width: 400px;   /* 화면이 450px 이상일 때 너비를 400px로 설정 */
        border-left: 2px solid #E6EAED;  
        border-right: 2px solid #E6EAED;
    }
`;

const MainBoard = styled(Flex)`
    position: absolute;  
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;          
    display: flex;        
    flex-direction: column;
    justify-content: center; 
    align-items: center;     
`;


const KakaoButtonContainer = styled.div`
    position: absolute;  
    bottom: 50%;           
    left: 50%;             
    transform: translate(-50%,500%); /*X축으로 50% 이동하여 중앙 정렬*/
`;

const H1 = styled.h1`
margin-bottom:30px;

width:100%;

color: black;
text-align: center;
font-family: Pretendard;
font-size: 14px;
font-style: normal;
font-weight: 400;
line-height: 20px;

span{
    font-weight:700;
}
`;

const KakaoLogo = styled.img`
width:200px;
height:200px;

margin-bottom:18px;
`;

const Footer = styled.div`
position:absolute;
width:100%;
top:25%;

display:flex;
flex-direction:column;
justify-content:center;
align-items:center;

h1{
width:100%;

color: #FFFFFF;
text-align: center;
font-family: BMJua;
font-size: 50px;
font-style: normal;
font-weight: 400;
line-height: normal;
}
h2{
width:100%;

color: #FFFFFF;
text-align: center;
font-family: BMJua;
font-size: 18px;
font-style: normal;
font-weight: 200;
line-height: normal;
}
`;

const AA =styled.div`
position:absolute;
/* top: 70%; */
width:100%;
transform: translate(0%,2150%);
/* bottom:30%; */
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
color: #B4B4B4;
text-align: center;
font-family: BMJua;
font-size: 14px;
font-style: normal;
font-weight: 400;
line-height: normal;
`;

const AA2 = styled(AA)`
    top: calc(50% + 10px); /* AA의 top 값에서 20px만큼 아래로 */
`;

