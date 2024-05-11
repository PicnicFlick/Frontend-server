import { useNavigate } from "react-router-dom";
import styled from "styled-components"

function Auth_Header({text}){
    const navigate = useNavigate();

    const onClick_logout=()=>{
        sessionStorage.removeItem('authKey');
        navigate('/auth/login');
    }
    return (
            <Header>
                <TextBox>
                    <h1 onClick={()=>navigate('/auth/selection')}>피크닉플릭</h1>
                    <h2>{text}</h2>
                    <h3 onClick={onClick_logout}>로그아웃</h3>
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
position:relative;
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
h3{
    position:absolute;
    right:24px;
    font-size:18px;
    font-weight:400;
}
`;

