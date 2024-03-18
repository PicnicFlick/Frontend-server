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
    width:375px;
}
height:44px;
//sticky는 width:100% 해당 안됨
border-bottom: 2px solid #E6EAED;

h1{
margin-top:2px;

color: var(--kakao-logo, #000);
text-align: center;
font-family: "Big Shoulders Display";
font-size: 20px;
font-style: normal;
font-weight: 500;
}
`;

export const BkBtn = styled.img`
position:absolute;
left:16px;
top:50%;
transform:translateY(-50%);

cursor:pointer;
`;