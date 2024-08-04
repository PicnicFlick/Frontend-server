import { WidthBlock, Wrapper } from 'pages/Home';

import useWay1 from 'assets/images/useWay1.png';
import useWay2 from 'assets/images/useWay2.png';
import useWay3 from 'assets/images/useWay3.png';
import useWay4 from 'assets/images/useWay4.png';
import back from 'assets/images/BackButton.svg';
import { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

function UseWay() {
    const navigate = useNavigate();

    const indexList = [1, 2, 3, 4];
    const iconList = [useWay1, useWay2, useWay3, useWay4];
    const textList = [
        '메인페이지의 지도를 통해서\n 대여장소 및 대여가능수량을\n 확인해주세요!',
        '대여하기’ 버튼을\n 클릭하시면 카메라가 켜집니다.',
        '대여락커에 부착되어있는\n QR코드를 촬영 후 대여료 결제를\n 완료해주세요!',
        '반납하실 때는 다른 분들도\n 이용하기 편하도록 잘 접으신\n 다음 보관함에 넣어주세요!',
    ];
    const [currentIndex, setCurrentIndex] = useState(0);

    const onClickIndex = event => {
        event.preventDefault();
        const index = Number(event.currentTarget.id);
        setCurrentIndex(index);
    };
    const onClickNext = () => {
        if (currentIndex !== 3) setCurrentIndex(prev => prev + 1);
        else navigate('/');
    };
    console.log('currentIndex', currentIndex);
    return (
        <Wrapper>
            <WidthBlock style={{ justifyContent: 'space-between' }}>
                <BackBtn src={back} onClick={() => navigate('/')} />
                <MainBoard>
                    <img src={iconList[currentIndex]} alt=""></img>
                    {textList[currentIndex].split('\n').map(item => (
                        <h1>{item}</h1>
                    ))}
                </MainBoard>
                <BottomBoard>
                    <IndexBlock>
                        {indexList.map((_, index) => (
                            <Index
                                id={index}
                                onClick={onClickIndex}
                                selected={index === currentIndex}
                            />
                        ))}
                    </IndexBlock>
                    <button onClick={onClickNext}>
                        {currentIndex !== 3 ? '다음' : '서비스 이용하기'}
                    </button>
                </BottomBoard>
            </WidthBlock>
        </Wrapper>
    );
}

export default UseWay;

const MainBoard = styled.div`
    padding-top: 180px;
    margin-bottom: 36px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    img {
        width: 150px;
        height: 150px;

        margin-bottom: 32px;
    }

    h1 {
        width: 254px;

        color: var(--kakao-logo, #000);
        text-align: center;
        font-family: Pretendard;
        font-size: 20px;
        font-style: normal;
        font-weight: 400;
        line-height: 30px; /* 150% */
        letter-spacing: -0.333px;
    }
`;

const BottomBoard = styled.div`
    width: 100%;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    gap: 48px;

    button {
        width: 100%;
        height: 64px;
        background: #00d09e;

        color: var(--back_02, #fff);
        text-align: center;
        font-family: Pretendard;
        font-size: 20px;
        font-style: normal;
        font-weight: 500;
        line-height: 24px; /* 120% */
        letter-spacing: -0.333px;
    }
`;

const IndexBlock = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 36px;
`;

const Index = styled.div`
    width: 16px;
    height: 16px;
    border-radius: 8px;
    background-color: ${props => (props.selected ? '#00D09E' : '#DDD')};

    cursor: pointer;
`;

const BackBtn = styled.img`
    position: absolute;
    top: 16px;
    left: 16px;

    cursor: pointer;
`;
