import styled from "styled-components"
import { Flex } from "../pages/Home";

import bkBtn from '../assets/images/BackButton.svg';
import { useNavigate } from "react-router-dom";

function TopFixedBar({text}){
    const navigate=useNavigate();

    return (
       <Bar>
        <BkBtn onClick = {()=>{navigate(-1)}} src={bkBtn}/>
        <h1>{text}</h1>
       </Bar>
    )
}

export default TopFixedBar

export const Bar = styled(Flex)`
position:fixed;

width:100%;
@media screen and (min-width:450px){
    width:400px;
    border-left:2px solid #E6EAED;
    border-right:2px solid #E6EAED;
}
height:48px;
//sticky는 width:100% 해당 안됨
border-bottom: 2px solid #E6EAED;

background-color:white;
z-index:10;
h1{
margin-top:2px;

color: var(--kakao-logo, #000);
text-align: center;
font-size: 20px;
font-style: normal;
font-weight: 400;
}
`;

export const BkBtn = styled.img`
position:absolute;
left:16px;
top:50%;
transform:translateY(-50%);

cursor:pointer;
`;


export const TopFixedBar_Blank = styled(Flex)`
width:100%;
@media screen and (min-width:450px){
    width:375px;
}
height:48px;
`;