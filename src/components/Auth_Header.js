import { useNavigate } from "react-router-dom";
import styled from "styled-components"

function Auth_Header({text}){
    const navigate = useNavigate();

    return (
            <Header>
                <TextBox onClick={()=>navigate('/auth/selection')}>
                    <h1>피크닉플릭</h1>
                    <h2>{text}</h2>
                </TextBox>
                <BottomBar/>
            </Header>
    )
}

export default Auth_Header

const BottomBar = styled.div`
width: 940px;
height: 8px;
flex-shrink: 0;

border-radius: 4px;
background: #7D7D7D;
`;
const TextBox = styled.div`
cursor:pointer;

display:flex;
justify-content:flex-start;
align-items:flex-end;
gap:24px;
`;
const Header = styled.div`
h1{
    color: #00D09E;
    text-align: center;
    font-family: BMJua;
    font-size: 50px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}
h2{
    color: var(--kakao-logo, #000);
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px; /* 100% */
    letter-spacing: -0.333px;
}
`;

