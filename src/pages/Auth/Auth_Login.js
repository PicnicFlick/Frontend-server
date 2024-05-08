import { Wrapper } from "pages/Home";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function Auth_Login(){
    const navigate=useNavigate();
    
    const [id, setId]=useState("");
    const [password,setPassword] = useState("");

    const onChange_login = (event) => {
        event.preventDefault();
        const {id,value} = event.currentTarget;

        if (id === 'id'){
            setId(value);
        }else if (id === 'password'){
            setPassword(value);
        }

    }

    const onClick_login = () => {
        if (id==='20011751' && password==='19990819')
        {
            console.log('관리자 로그인 성공')
            navigate('/auth/selection');
        }
    }

    console.log("id, password", id, password);
    return(
        <Wrapper_Auth>
            <Title>피크닉플릭</Title>
            <LoginBox>

                <InputBox>
                    <h1>ID</h1>
                    <input 
                    onChange={onChange_login}
                    id = "id" 
                    value = {id} 
                    placeholder="아이디"/>
                </InputBox>

                <InputBox>
                    <h1>Password</h1>
                    <input 
                    onChange={onChange_login}
                    id="password" 
                    type="password"
                    value={password} 
                    placeholder = "비밀번호"/>
                </InputBox>

                <button onClick={onClick_login}>로그인</button>
            </LoginBox>
        </Wrapper_Auth>
    )
}

export default Auth_Login;

export const Wrapper_Auth = styled(Wrapper)`
display:flex;
flex-direction:column;
justify-content:flex-start;
align-items:center;

padding-top:60px;
`;

const Title = styled.h1`
color: #00D09E;
text-align: center;
font-family: BMJua;
font-size: 50px;
font-style: normal;
font-weight: 400;
line-height: normal;

margin-bottom:18px;
`;

const LoginBox = styled.div`
width: 300px;
height: 375px;
flex-shrink: 0;

background-color: #EAEAEA;
border-radius:12px;
border: 2px solid #00D09E;

display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
padding:60px;

gap:8px;

button{
    width: 225px;
    height: 40px;
    margin-top:60px;

    flex-shrink: 0;
    border-radius: 10px;
    background: #00D09E;

    color: #FFF;
    text-align: center;
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px; /* 171.429% */
    letter-spacing: -0.333px;
}
`;

const InputBox = styled.div`
display:flex;
flex-direction:column;
justify-content:flex-start;
align-items:flex-start;

h1{
    color: var(--kakao-logo, #000);
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px; /* 171.429% */
    letter-spacing: -0.333px;
}
input{
    width: 225px;
    height: 36px;
    flex-shrink: 0;

    border-radius: 6px;
    border: 1px solid #00D09E;
    background: #FFF;

    padding:12px;

    outline:none;
}
`;