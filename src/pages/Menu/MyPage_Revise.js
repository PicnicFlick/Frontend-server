import TopFixedBar, { TopFixedBar_Blank } from "components/TopFixedBar"
import { Flex, WidthBlock, Wrapper } from "pages/Home"
import { MainBoard } from "./MyPage"

import profile from 'assets/images/ProfileIcon.png';
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

function MyPage_Revise(){
    const location = useLocation();
    const [userData,setUserData] = useState(location.state);
    const userName = useState(location.state.name);
        //location.state.name자체는 배열. 이렇게 반환받고 userName[0]으로 써야함.
        //location.state.name[0]은 안 됨. name의 첫번째 글자와 어떤 이상한 값을 원소로 하는 배열이 또 따로 만들어짐

    const [disabled,setDisabled] = useState(true);

    const onChange_account = (event) => {
        event.preventDefault();
        const name = event.currentTarget.value;
        setUserData((prev)=>({...prev,name:name}));
        // console.log('name,userName',name,userName);
        if(name===userName[0] || name.length==0)
            setDisabled(true);
        else
            setDisabled(false);
    };

    const onClick_revise = (event) => {
        event.preventDefault();
        let tmp = window.confirm('닉네임을 변경하시겠습니까?');
    }


    // console.log(userData,disabled);
    return (
        <Wrapper>
            <WidthBlock>
                <TopFixedBar text="마이페이지" />
                <TopFixedBar_Blank />
                
                {typeof(userData) === 'object'
                &&
                <MainBoard_Revise>
                    <BigProfileImg 
                    onClick={()=>alert("프로필사진 수정 기능은 준비중입니다.")}
                    src={profile}/>
                    
                    <InputBox>
                        <h1>닉네임</h1>
                        <Input category = 'name' value={userData.name} onChange={onChange_account}/>
                    </InputBox>

                    <InputBox>
                        <h1>이메일(수정불가)</h1>
                        <Input category = 'email' value={userData.email} onChange={onChange_account} disabled={true}/>
                    </InputBox>

                    <Button disabled={disabled} onClick={onClick_revise}>수정하기</Button>
                </MainBoard_Revise>
                }
            </WidthBlock>
        </Wrapper>
    )
}

export default MyPage_Revise

export const MainBoard_Revise=styled(MainBoard)`
margin-top:48px;
`;

export const BigProfileImg = styled.img`
width:180px;
height:180px;
cursor:pointer;

margin-bottom:24px;
`;

export const InputBox = styled(Flex)`
width:80%;
margin-bottom:24px;

flex-direction:column;
justify-content:center;
align-items:flex-start;
h1{
    margin:4px 12px;
    color:#555;
    font-size:16px;
}
`;
export const Input= styled.input`
width:100%;
height:48px;

${props=>props.category == 'name' 
? 'border:2px solid #00D09E; color: #555;' 
: 'border:2px solid #DDD; color: #AAA;'};

border-radius:24px;

padding:12px;


font-size: 16px;
font-style: normal;
font-weight: 400;
line-height: 24px; /* 120% */
letter-spacing: -0.333px;
`;

export const Button = styled.button`
margin-top:36px;
background-color:${props=>props.disabled ? '#CCC':'#00D09E'};
color:white;
font-size:18px;
width:100px;
height:40px;

border-radius:20px;
`;