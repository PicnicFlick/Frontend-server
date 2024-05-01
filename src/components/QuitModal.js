import styled from "styled-components";
import xModal from 'assets/images/XModal.svg';
import { useState } from "react";

function QuitModal({setShowModal}){
    const [content,setContent]=useState("");
    
    const onChange_content = (event) =>{
        event.preventDefault();
        setContent(event.currentTarget.value);
    }

    const onClick_submit = () => {
        let tmp = window.confirm('정말 탈퇴하시겠습니까?');
    }

    const onClick_close = () => {
        setShowModal(false);
    }
    return(
        <StyledModal>
            <img onClick = {onClick_close} src={xModal}/>
            <h1>회원탈퇴</h1>
            <h2>탈퇴사유</h2>
            <textarea
            onChange={onChange_content}
            value = {content} 
            placeholder="탈퇴하려는 사유를 작성해주세요 ;("/>

            <button onClick={onClick_submit}>탈퇴하기</button>
        </StyledModal>
    )

}

export default QuitModal;

export const StyledModal = styled.div`
position:absolute;
top: 50%;
left:50%;
transform:translate(-50%,-50%);
z-index:20;

width:80%;
height:400px;

border-radius: 20px;
background: #FFF;

display:flex;
flex-direction:column;
justify-content:flex-start;
align-items:flex-start;

padding:32px;
padding-top:52px;

img{
    position:absolute;
    top:18px;
    left:18px;

    cursor:pointer;
}

h1{
    color: var(--kakao-logo, #000);
    text-align: center;
    font-size: 20px;
    font-style: normal;
    font-weight: 900;
    line-height: 24px; /* 120% */
    letter-spacing: -0.333px;

    margin-bottom:28px;
}

h2{
    color: var(--kakao-logo, #000);
    font-size: 16px;
    font-style: normal;
    font-weight: 900;
    line-height: 24px; /* 200% */
    letter-spacing: -0.333px;

    margin-bottom:4px;
}

textarea{
    width: 100%;
    height: 200px;
    flex-shrink: 0;
    outline: none;

    font-size:14px;
    line-height:20px;

    background-color:#EDEDED;
    border:none;

    padding:12px;

    margin-bottom:23px;

    white-space: normal;
}

button{
    position:absolute;
    bottom:18px;
    align-self:center;
width: 80px;
height: 30px;
flex-shrink: 0;
border-radius: 10px;
background: #D7D7D7;

color: #1E1E1E;
text-align: center;
font-size: 14px;
font-style: normal;
font-weight: 500;
line-height: 24px; /* 171.429% */
letter-spacing: -0.333px;
}
`;