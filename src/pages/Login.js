import KakaoLogin from "components/KakaoLogin"
import { Flex, WidthBlock, Wrapper } from "./Home"
import TopBar_Account from "components/TopBar_Account"
import styled from "styled-components"

import kakaoLogo from 'assets/images/KakaoTalkLogo.png'



function Login() {
    return (
        <Wrapper>
            <WidthBlock>
                <TopBar_Account text='로그인' />
                <MainBoard>
                    <KakaoLogo src={kakaoLogo} />

                    <H1>저희 피크닉플릭은 카카오계정을 통해서 <br /> 회원관리를 도와드리고 있습니다.</H1>

                    <KakaoLogin />
                </MainBoard>


                <Footer>
                    <h2>돗자리 대여 서비스</h2>
                    <h1>피크닉플릭</h1>
                </Footer>
            </WidthBlock>
        </Wrapper>
    )

}
export default Login

const MainBoard = styled(Flex)`
position:absolute;
top:50%;
left:50%;
transform:translate(-50%,-50%);


flex-direction:column;
justify-content:center;
align-items:center;
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
bottom:5%;

display:flex;
flex-direction:column;
justify-content:center;
align-items:center;

h1{
width:100%;

color: #00D09E;
text-align: center;
font-family: BMJua;
font-size: 36px;
font-style: normal;
font-weight: 400;
line-height: normal;
}
h2{
width:100%;

color: #00D09E;
text-align: center;
font-family: BMJua;
font-size: 16px;
font-style: normal;
font-weight: 200;
line-height: normal;
}
`;

