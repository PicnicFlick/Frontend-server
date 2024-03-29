import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import next from 'assets/images/Next.png';
import axios from "axios";

function MenuBar({left, setMenuLeft, setShowMenu}){
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const Authorization = localStorage.getItem('token');
    const Refresh = localStorage.getItem('refreshtoken');

    useEffect(() => {
        if(localStorage.getItem('token')==null){
            setMessage('로그인 하세요(click!)');
        }
        else {
            setMessage(localStorage.getItem('name')+'님 반갑습니다.');
        }
    }, []);

    const onClick_closeMenu = () => {//로그아웃 버튼 누르면 슬라이드 메뉴 자동으로 닫힘
        setMenuLeft('100%');
        setTimeout(() => {
            setShowMenu(false);
        }, 200);
    }

    const navigateToTest = () => {// 비로그인 상태에만 '/test'로 페이지 이동
        if (message === '로그인 하세요(click)') {
          navigate('/test'); 
        }
      }; 


    const onLogout = async () => {
        console.log(Authorization);
        console.log(Refresh);
        
        try {
            const response = await axios.post('http://13.124.95.110:8080/api/v1/user/logout',{},{
                headers:{
                    'Authorization': `${Authorization}`,
                    'Refresh': `${Refresh}`
                }
            });
            console.log(response.data);//로그아웃 성공 여부 판단용 콘솔
            localStorage.removeItem('token');
            localStorage.removeItem('name');
            localStorage.removeItem('refreshtoken');
            setMenuLeft('100%');//메뉴 닫기
        } catch(error){
            console.log('로그아웃 오류',error);
        }
    }   

    const onClickLougout = () => {
        const confirmLogout = window.confirm('정말 로그아웃 하시겠습니까?');
        if (confirmLogout){
            onLogout();
        }
    }

    return(
        <MenuBlock left={left}>
            <Next src={next} onClick={onClick_closeMenu}/>
            <Logout onClick={onClickLougout}>로그아웃</Logout>
           {
            message && <Message onClick={navigateToTest}>{message}</Message>
           }
        </MenuBlock>
    )
}

export default MenuBar

export const Logout=styled.div`
width: 97px;
height: 29px;
flex-shrink: 0;
color: #7B7575;
text-align: center;
font-family: "Big Shoulders Display";
font-size: 12px;
font-style: normal;
font-weight: 500;
line-height: 24px; /* 200% */
letter-spacing: -0.333px;
`

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
//왼오(양수 왼, 음수 오) / 위아래(양수 아래, 음수 위) / blur 픽셀 등등

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

export const Message = styled.p`
font-size: 30px;
color:green;
padding:20px;
text-align:center;
`;