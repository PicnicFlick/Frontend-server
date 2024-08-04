import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import next from 'assets/images/Next.png';
import profile from 'assets/images/ProfileIcon.png';

function MenuBar({ left, setMenuLeft, setShowMenu }) {
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const Authorization = sessionStorage.getItem('token');
    const Refresh = sessionStorage.getItem('refreshtoken');

    const email = sessionStorage.getItem('email');
    const name = sessionStorage.getItem('name');

    useEffect(() => {
        if (sessionStorage.getItem('token') == null) {
            setMessage('로그인 하세요(click!)');
        } else {
            setMessage(sessionStorage.getItem('name') + '님 반갑습니다.');
        }
    }, []);

    const onClickCloseMenu = () => {
        //로그아웃 버튼 누르면 슬라이드 메뉴 자동으로 닫힘
        setMenuLeft('100%');
        setTimeout(() => {
            setShowMenu(false);
        }, 200);
    };

    const onLogout = async () => {
        console.log(Authorization);
        console.log(Refresh);

        sessionStorage.removeItem('token');
        sessionStorage.removeItem('name');
        sessionStorage.removeItem('refreshtoken');

        window.location.reload(true);
    };

    const onClickLogout = () => {
        const confirmLogout = window.confirm('정말 로그아웃 하시겠습니까?');
        if (confirmLogout) {
            onLogout();
        }
    };

    const onClickMyPage = () => {
        if (sessionStorage.getItem('token') == null) {
            alert('로그인이 필요한 서비스입니다.');
            navigate('/login');
        } else {
            navigate('/my_page');
        }
    };
    const onClickUseWay = () => {
        navigate('/useWay');
    };
    const onClickCenter = () => {
        navigate('/serviceCenter');
    };
    return (
        <MenuBlock left={left}>
            <Next src={next} onClick={onClickCloseMenu} />
            {sessionStorage.getItem('token') == null ? (
                <BoardByLogin>
                    <GoToLogin onClick={() => navigate('/login')}>
                        <h1>로그인하러 가기</h1>
                        <img alt="" src={next} />
                    </GoToLogin>
                    <ProfileBoard>
                        <img alt="" src={profile} />
                        <h1>로그인이 필요합니다.</h1>
                    </ProfileBoard>
                </BoardByLogin>
            ) : (
                <BoardByLogin>
                    <Logout onClick={onClickLogout}>로그아웃</Logout>
                    <ProfileBoard>
                        <img alt="" src={profile} />
                        <h2>{email}</h2>
                        <h1>
                            {name} <span>님</span>
                        </h1>
                    </ProfileBoard>
                </BoardByLogin>
            )}
            <Strab />
            <MenuBoard>
                <h1 onClick={onClickMyPage}>마이페이지</h1>
                <h1 onClick={onClickUseWay}>이용안내</h1>
                <h1 onClick={onClickCenter}>고객센터</h1>
            </MenuBoard>

            <Footer>
                <h2>스마트 돗자리 대여서비스</h2>
                <h1>피크닉플릭</h1>
            </Footer>
        </MenuBlock>
    );
}

export default MenuBar;

export const MenuBlock = styled.div`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: ${props => props.left};
    transition: left 0.2s ease-in-out;

    width: 60%;
    min-height: 100vh;

    @media screen and (max-width: 450px) {
        min-height: -webkit-fill-available;
    }

    background: #fff;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25) inset;
    //왼오(양수 왼, 음수 오) / 위아래(양수 아래, 음수 위) / blur 픽셀 등등

    z-index: 20;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
`;

const BoardByLogin = styled.div`
    position: relative;
    width: 100%;

    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
`;

export const GoToLogin = styled.div`
    position: absolute;
    top: 16px;
    right: 16px;

    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;

    cursor: pointer;

    h1 {
        color: var(--kakao-logo, #000);
        font-family: Pretendard;
        font-size: 12px;
        font-style: normal;
        font-weight: 300;
        line-height: 24px; /* 200% */
        letter-spacing: -0.333px;
    }
    img {
        width: 5px;
        height: 10px;
    }
`;

export const Logout = styled.div`
    position: absolute;
    top: 12px;
    right: 16px;
    color: #7b7575;
    text-align: center;
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 24px; /* 200% */
    letter-spacing: -0.333px;

    cursor: pointer;
`;

export const Next = styled.img`
    position: absolute;
    left: 16px;
    top: 16px;
    z-index: 30;

    width: 8px;
    height: 16px;
    cursor: pointer;
`;

export const Message = styled.p`
    font-size: 30px;
    color: green;
    padding: 20px;
    text-align: center;
`;

export const ProfileBoard = styled.div`
    margin-top: 50px;
    margin-bottom: 18px;

    width: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 12px;
    h1 {
        color: var(--kakao-logo, #000);
        text-align: center;
        font-family: Pretendard;
        font-size: 20px;
        font-style: normal;
        font-weight: 700;
        line-height: 24px; /* 120% */
        letter-spacing: -0.333px;
        span {
            color: var(--kakao-logo, #000);
            text-align: center;
            font-family: Pretendard;
            font-size: 18px;
            font-style: normal;
            font-weight: 200;
            line-height: 24px; /* 120% */
            letter-spacing: -0.333px;
        }
    }
    h2 {
        color: var(--kakao-logo, #000);
        text-align: center;
        font-family: Pretendard;
        font-size: 14px;
        font-style: normal;
        font-weight: 300;
        line-height: 12px; /* 85.714% */
        letter-spacing: -0.333px;
    }
    img {
        width: 40px;
        height: 40px;
    }
`;

export const Strab = styled.div`
    margin-bottom: 40px;

    width: 100%;
    height: 12px;
    flex-shrink: 0;
    background: #e6eaed;
`;

export const MenuBoard = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    gap: 28px;

    h1 {
        color: var(--kakao-logo, #000);
        text-align: center;
        font-family: Pretendard;
        font-size: 20px;
        font-style: normal;
        font-weight: 400;
        line-height: 24px; /* 120% */
        letter-spacing: -0.333px;

        cursor: pointer;
    }
`;

export const Footer = styled.div`
    position: absolute;
    bottom: 5%;

    h2 {
        color: #9d9c9c;
        text-align: center;
        font-family: BMJua;
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
    }

    h1 {
        color: #3f3f3f;
        text-align: center;
        font-family: BMJua;
        font-size: 28px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
    }
`;
