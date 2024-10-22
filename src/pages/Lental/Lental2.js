import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import {
    FlowBox,
    FlowImg,
    FlowText,
    LentalButton,
    LentalMain,
    MainBoard,
} from './LentalRoot';

import lentalFlow2 from 'assets/images/LentalFlow2.png';
import { Flex } from 'pages/Home';

function Lental2() {
    const navigate = useNavigate();
    const location = useLocation();
    const matId = location.state?.matId;

    const [cnt, setCnt] = useState(1);
    const [time, setTime] = useState(3);
    const [receipt, setReceipt] = useState({
        price: 2000,
        guarantee: 5000,
        price_entire: 7000,
        amount_spent: 2000,
    });

    console.log('receipt, time, cnt', receipt, time, cnt);

    return (
        <LentalMain>
            <MainBoard>
                <FlowBox>
                    <FlowImg style={{ height: '52px' }} src={lentalFlow2} />
                    <FlowThird>금액 결제</FlowThird>
                </FlowBox>

                <PayBox>
                    <h1>결제예정금액 상세</h1>
                    <ReceiptBox>
                        <Element>
                            <h2>+ 대여비</h2>
                            <h3>{receipt.price.toLocaleString()}원</h3>
                        </Element>

                        <Element>
                            <h2>+ 보증금</h2>
                            <h3>{receipt.guarantee.toLocaleString()}원</h3>
                        </Element>

                        <HR />

                        <Element>
                            <h2>총 결제금액</h2>
                            <h3>{receipt.price_entire.toLocaleString()}원</h3>
                        </Element>
                    </ReceiptBox>
                    <EntireSpent>
                        <h4>반납 성공 시 총 지출액</h4>
                        <h5>{receipt.amount_spent.toLocaleString()}원</h5>
                    </EntireSpent>
                </PayBox>
            </MainBoard>
            <LentalButton
                onClick={() =>
                    navigate('../payment-loading', { state: { matId } })
                }
            >
                결제하러 가기
            </LentalButton>
        </LentalMain>
    );
}

export default Lental2;

export const fadein = keyframes`
    from {
        margin-top:8px;
        opacity: 0;
    }
    to {
        margin-top:20px;
        opacity: 1;
    }

`;

const FlowThird = styled(FlowText)`
    right: 0;
    bottom: 0;
    transform: translateX(15%);
`;

const PayBox = styled(Flex)`
    animation: ${fadein} 1s;
    -moz-animation: ${fadein} 1s; /* Firefox */
    -webkit-animation: ${fadein} 1s; /* Safari and Chrome */
    -o-animation: ${fadein} 1s; /* Opera */

    margin-top: 20px;

    width: 342px;
    flex-shrink: 0;
    border-radius: 16px;
    background: #fff;

    flex-direction: column;
    justify-content: space-between;
    gap: 12px;

    padding-top: 30px;
    padding-bottom: 42px;

    h1 {
        color: var(--kakao-logo, #000);
        font-size: 25px;
        font-style: normal;
        font-weight: 700;

        margin-bottom: 24px;
    }
`;

const Element = styled.div``;
const HR = styled.div``;
const ReceiptBox = styled(Flex)`
    width: 180px;

    flex-direction: column;
    justify-content: center;

    ${Element} {
        width: 100%;

        color: var(--kakao-logo, #000);
        font-family: Pretendard;
        font-size: 20px;
        font-style: normal;
        font-weight: 700;
        line-height: 28px;
        letter-spacing: -0.333px;

        display: flex;
        justify-content: space-between;
        align-items: center;

        h2 {
            color: var(--kakao-logo, #868383);
            font-family: Pretendard;
            font-size: 20px;
            font-style: normal;
            font-weight: 500;
            line-height: 28px;
            letter-spacing: -0.333px;
        }
        h3 {
            color: var(--kakao-logo, #000);
            font-family: Pretendard;
            font-size: 20px;
            font-style: normal;
            font-weight: 700;
            line-height: 28px;
            letter-spacing: -0.333px;
        }
    }
    ${HR} {
        margin: 4px;

        width: 180px;
        height: 1px;
        background-color: #aaa;
    }
`;

const EntireSpent = styled.div`
    width: 80%;
    font-family: Pretendard;

    display: flex;
    justify-content: space-between;
    align-items: center;

    h4 {
        font-size: 20px;
        font-weight: 500;
        font-style: normal;

        line-height: 28px; /* 127.273% */
        letter-spacing: -0.333px;
        color: var(--kakao-logo, #868383);
    }
    h5 {
        font-size: 20px;
        color: black;
        font-style: normal;
        font-weight: 700;
        line-height: 28px; /* 127.273% */
        letter-spacing: -0.333px;
    }
`;

export const BtnBox = styled(Flex)`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
`;
export const CntBtn = styled.button`
    width: 30px;
    height: 30px;

    border-radius: 25px;
    background-color: ${props => (props.active ? '#00D09E' : '#DDD')};
`;
export const CntBox = styled(Flex)`
    width: 80%;
    justify-content: space-between;
    align-items: center;
`;
