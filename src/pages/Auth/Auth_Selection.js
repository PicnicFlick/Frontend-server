import styled from "styled-components"
import { Wrapper_Auth } from "./Auth_Login"
import Auth_Header from "components/Auth_Header"
import { useNavigate } from "react-router-dom"

function Auth_Selection(){
    const navigate=useNavigate();
    const text = "페이지 선택"

    return (
        <Wrapper_Auth>
            <Auth_Header text={text}/>

            <SelectBoard>
                <SelectBox onClick={()=>{navigate('/auth/item')}}>
                    대여품 수량관리
                </SelectBox>

                <SelectBox onClick={()=>{navigate('/auth/history')}}>
                    대여내역 관리
                </SelectBox>
            </SelectBoard>

        </Wrapper_Auth>
    )
}

export default Auth_Selection

const SelectBoard = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    gap:54px;

    margin:96px;
`;
const SelectBox = styled.div`
width: 360px;
height: 280px;
flex-shrink: 0;

border-radius: 40px;
background: #00D09E;

color: #FFF;
font-family: Pretendard;
font-size: 24px;
font-style: normal;
font-weight: 700;
line-height: 24px; /* 100% */
letter-spacing: -0.333px;

padding:36px 40px;

cursor:pointer;
`;

