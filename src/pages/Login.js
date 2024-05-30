import KakaoLogin from "components/KakaoLogin"
import { Flex, WidthBlock, Wrapper } from "./Home"
import TopBar_Account from "components/TopBar_Account"
import styled from "styled-components"

import hangang from 'assets/images/hangang.jpeg'


function Login() {
    return (
        <Wrapper>
            <StyledWidthBlock>
                <Footer>
                    <h1>Picnic Flick!</h1>
                    <h2>깨끗한 한강을 만드는 작은 한 걸음,</h2>
                    <h2>친환경 돗자리 대여 서비스</h2>
                </Footer>
                <TopBar_Account text='로그인' />
                <AA>
                    저희 피크닉플릭은 '카카오계정'을 통해
                    <br />회원가입을 도와드리고 있습니다
                </AA>
                <KakaoButtonContainer>
                    <KakaoLogin />
                </KakaoButtonContainer>
            </StyledWidthBlock>
        </Wrapper>
    )

}
export default Login


const StyledWidthBlock = styled(WidthBlock)`
    background-image: url(${hangang}); 
    background-size: cover;  
    background-position: center;   
`

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
    bottom:5%;               
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

const AA = styled.div`
position:absolute;
width:100%;

top:75%;
left:50%;
transform:translate(-50%,-50%);


color: #FFF;
text-align: center;
font-family: Pretendard;
font-size: 14px;
font-style: normal;
font-weight: 400;
line-height: normal;


display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
`;


