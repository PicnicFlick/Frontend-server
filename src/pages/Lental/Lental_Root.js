import { WidthBlock, Wrapper } from "pages/Home"
import styled from "styled-components";
import bkBtn from 'assets/images/BackButton2.png';

import { Outlet, useNavigate } from "react-router-dom";


function Lental_Root() {
    const navigate=useNavigate();

    return (
        <Wrapper>
            <WidthBlock_Lental style={{ backgroundColor: '#00D09E' }}>
                <BkBtn onClick={()=>{navigate(-1)}} src={bkBtn} />
                <Outlet/>
            </WidthBlock_Lental>
        </Wrapper>
    )
}

export default Lental_Root

export const WidthBlock_Lental = styled(WidthBlock)`
position:relative;
justify-content:center;

h1{
color: #FFF;
text-align: center;
font-family: Pretendard;
font-size: 14px;
font-style: normal;
font-weight: 400;
line-height: 20px; /* 142.857% */
letter-spacing: -0.333px;

margin-bottom:8px;
}


`;

export const BkBtn = styled.img`
position:absolute;

top:12px;
left:12px;

width:30px;
height:30px;

cursor:pointer;
`;


