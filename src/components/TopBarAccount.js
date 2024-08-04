import { TopBar } from 'pages/Home';
import styled from 'styled-components';

import back from 'assets/images/Back.png';
import { useNavigate } from 'react-router-dom';

function TopBarAccount({ text }) {
    const navigate = useNavigate();

    return (
        <TopBar>
            <BackBtn onClick={() => navigate('/')} src={back} />
            <Text>{text}</Text>
        </TopBar>
    );
}

export default TopBarAccount;

const BackBtn = styled.img`
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);

    width: 20px;
    height: 20px;

    cursor: pointer;
`;

export const Text = styled.h1`
    margin-left: 24px;

    color: var(--back_02, #fff);
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px; /* 120% */
    letter-spacing: -0.333px;
`;
