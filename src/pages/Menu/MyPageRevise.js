import TopFixedBar, { TopFixedBarBlank } from 'components/TopFixedBar';
import { Flex, WidthBlock, Wrapper } from 'pages/Home';
import { MainBoard } from './MyPage';

import profile from 'assets/images/ProfileIcon.png';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { useLogined } from 'hooks/useLogined';

function MyPageRevise() {
    useLogined();
    const location = useLocation();
    const [userData, setUserData] = useState(location.state);
    const userName = useState(location.state.name);
    //location.state.name자체는 배열. 이렇게 반환받고 userName[0]으로 써야함.
    //location.state.name[0]은 안 됨. name의 첫번째 글자와 어떤 이상한 값을 원소로 하는 배열이 또 따로 만들어짐

    const [disabled, setDisabled] = useState(true);

    const onChangeAccount = event => {
        event.preventDefault();
        const name = event.currentTarget.value;
        setUserData(prev => ({ ...prev, name: name }));
        // console.log('name,userName',name,userName);
        if (name === userName[0] || name.length === 0) setDisabled(true);
        else setDisabled(false);
    };

    const onClickRevise = async () => {
        let tmp = window.confirm('닉네임을 변경하시겠습니까?');
        const nickname = userData.name;
        const token = sessionStorage.getItem('token');

        if (tmp) {
            try {
                const response = await axios.patch(
                    `${process.env.REACT_APP_BACK_API}/api/v1/user/update/nickname`,
                    { nickname: nickname },
                    {
                        headers: {
                            Authorization: token,
                        },
                    },
                );
                if (response.data.isSuccess) console.log(response.data);
                else alert(response.data.message);
            } catch (error) {
                console.log(error);
            }
        }
    };
    // console.log(userData,disabled);
    return (
        <Wrapper>
            <WidthBlock>
                <TopFixedBar text="마이페이지" />
                <TopFixedBarBlank />

                {typeof userData === 'object' && (
                    <MainBoardRevise>
                        <BigProfileImg
                            onClick={() =>
                                alert('프로필사진 수정 기능은 준비중입니다.')
                            }
                            src={profile}
                        />

                        <InputBox>
                            <h1>닉네임</h1>
                            <Input
                                category="name"
                                value={userData.name}
                                onChange={onChangeAccount}
                            />
                        </InputBox>

                        <InputBox>
                            <h1>이메일(수정불가)</h1>
                            <Input
                                category="email"
                                value={userData.email}
                                onChange={onChangeAccount}
                                disabled={true}
                            />
                        </InputBox>

                        <Button disabled={disabled} onClick={onClickRevise}>
                            수정하기
                        </Button>
                    </MainBoardRevise>
                )}
            </WidthBlock>
        </Wrapper>
    );
}

export default MyPageRevise;

export const MainBoardRevise = styled(MainBoard)`
    margin-top: 48px;
`;

export const BigProfileImg = styled.img`
    width: 180px;
    height: 180px;
    cursor: pointer;

    margin-bottom: 24px;
`;

export const InputBox = styled(Flex)`
    width: 80%;
    margin-bottom: 24px;

    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    h1 {
        margin: 4px 12px;
        color: #555;
        font-size: 16px;
    }
`;
export const Input = styled.input`
    width: 100%;
    height: 48px;

    ${props =>
        props.category === 'name'
            ? 'border:2px solid #00D09E; color: #555;'
            : 'border:2px solid #DDD; color: #AAA;'};

    border-radius: 24px;

    padding: 12px;

    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px; /* 120% */
    letter-spacing: -0.333px;
`;

export const Button = styled.button`
    margin-top: 36px;
    background-color: ${props => (props.disabled ? '#CCC' : '#00D09E')};
    color: white;
    font-size: 18px;
    width: 100px;
    height: 40px;

    border-radius: 20px;
`;
