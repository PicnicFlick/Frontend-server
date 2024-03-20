import styled from "styled-components"
import next from 'assets/images/Next.png';

function MenuBar({left, setMenuLeft}){
    const onClick_closeMenu = () => {
        setMenuLeft('100%');
    }
    return(
        <MenuBlock left={left}>
            <Next src={next} onClick={onClick_closeMenu}/>
            로그인이 필요합니다.
        </MenuBlock>
    )
}

export default MenuBar

export const MenuBlock=styled.div`
position:absolute;
top:50%;
transform:translateY(-50%);
left:${props=>props.left};
transition: left 0.2s ease-in-out;

width:60%;
height:100vh;

background: #FFF;
box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25) inset;

z-index:20;

display:flex;
flex-direction:column;
justify-content:flex-start;
align-items:center;
`;
export const Next=styled.img`
position:absolute;
left:16px;
top:16px;

width:8px;
height:16px;
cursor:pointer;
`;