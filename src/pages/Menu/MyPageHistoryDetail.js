import TopFixedBar, { TopFixedBarBlank } from 'components/TopFixedBar';
import { Flex, WidthBlock, Wrapper } from 'pages/Home';
import { Logo, MainBoard } from './MyPage';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import bottomLogo from 'assets/images/BottomLogo.png';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useLogined } from 'hooks/useLogined';

function MyPageHistoryDetail() {
    useLogined();
    const id = useParams().id;
    const [rentDetail, setRentDetail] = useState();

    const fetchRentDetail = async () => {
        const token = sessionStorage.getItem('token');
        console.log('id, token', id, token);
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_BACK_API}/api/v1/history/${id}`,
                {
                    headers: {
                        Authorization: `${token}`,
                    },
                },
            );
            console.log(response.data);
            setRentDetail(response.data.result);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchRentDetail();
    }, []);

    console.log('rentDetail', rentDetail);
    return (
        <Wrapper>
            <WidthBlock>
                <TopFixedBar text="마이페이지" />
                <TopFixedBarBlank />
                {typeof rentDetail == 'object' && (
                    <MainBoard>
                        <DetailBoard status={rentDetail.status}>
                            <p>상세내역</p>
                            <DetailBox>
                                <TextBox1>
                                    <h1>대여시간</h1>
                                    <h2>
                                        {rentDetail.started_time.slice(0, 10)},
                                        &nbsp;
                                        {rentDetail.started_time.slice(
                                            11,
                                        )} ~{' '}
                                        {(rentDetail.status === 'RETURNED' ||
                                            rentDetail.status ===
                                                'LATE_RETURNED') &&
                                            rentDetail.returned_time.slice(11)}
                                    </h2>
                                </TextBox1>

                                <TextBox2>
                                    <h1>대여하신 곳</h1>
                                    <h2>{rentDetail.location}</h2>
                                </TextBox2>

                                <TextBox2 style={{ marginBottom: 0 }}>
                                    <h1>돗자리(보관함) 번호</h1>
                                    <h2>
                                        {rentDetail.matId} 번
                                        <button>
                                            {rentDetail.status ===
                                            'NOT_RETURNED'
                                                ? '대여중'
                                                : rentDetail.status ===
                                                  'RETURNED'
                                                ? '반납완료'
                                                : '지각반납'}
                                        </button>
                                    </h2>
                                </TextBox2>
                            </DetailBox>
                        </DetailBoard>

                        <ReceiptBoard>
                            <p>결제내역</p>
                            <ReceiptBox>
                                <ReceiptElement state={rentDetail.status}>
                                    <h1>대여요금</h1>
                                    <h2>-{rentDetail.rentPrice}</h2>
                                </ReceiptElement>
                                <ReceiptElement>
                                    <h1>보증금</h1>
                                    <h2>-{rentDetail.despositPrice}</h2>
                                </ReceiptElement>

                                <ReceiptElement>
                                    <h1>
                                        보증금 환급{' '}
                                        {rentDetail.status === 'NOT_RETURNED' &&
                                            '(반납시)'}
                                    </h1>
                                    <h2>+{rentDetail.despositPrice}</h2>
                                </ReceiptElement>

                                <HR />

                                <ReceiptElement>
                                    <h1>
                                        실제 결제금액{' '}
                                        {rentDetail.status === 'NOT_RETURNED' &&
                                            '(반납시)'}
                                    </h1>
                                    <h2>-{rentDetail.totalPrice}</h2>
                                </ReceiptElement>
                            </ReceiptBox>
                        </ReceiptBoard>
                    </MainBoard>
                )}
                <Logo src={bottomLogo} />
            </WidthBlock>
        </Wrapper>
    );
}

export default MyPageHistoryDetail;

const DetailBox = styled(Flex)``;
const TextBox1 = styled(Flex)``;
const TextBox2 = styled(Flex)``;
export const DetailBoard = styled(Flex)`
    width: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    border-bottom: 2px solid #e6eaed;
    padding: 28px;

    p {
        align-self: flex-start;
        color: var(--kakao-logo, #000);
        font-size: 24px;
        font-style: normal;
        font-weight: 700;
        line-height: 24px; /* 100% */
        letter-spacing: -0.333px;

        margin-bottom: 24px;
    }
    ${DetailBox} {
        flex-direction: column;
        width: 90%;
        justify-content: flex-start;
        align-items: flex-start;

        ${TextBox1} {
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
            margin-bottom: 20px;

            h1 {
                color: var(--kakao-logo, #000);
                font-size: 18px;
                font-style: normal;
                font-weight: 700;
                line-height: 24px; /* 120% */
                letter-spacing: -0.333px;
                margin-bottom: 4px;
            }
            h2 {
                color: var(--kakao-logo, #000);
                font-size: 16px;
                font-style: normal;
                font-weight: 300;
                line-height: 20px;
                letter-spacing: -0.333px;
                margin-bottom: 4px;
            }
        }
        ${TextBox2} {
            width: 100%;
            position: relative;
            margin-bottom: 20px;

            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
            gap: 2px;
            h1 {
                color: var(--kakao-logo, #000);
                font-size: 18px;
                font-style: normal;
                font-weight: 700;
                line-height: 24px; /* 133.333% */
                letter-spacing: -0.333px;
            }
            h2 {
                width: 100%;
                color: var(--kakao-logo, #000);
                font-size: 16px;
                font-style: normal;
                font-weight: 400;
                line-height: 24px; /* 150% */
                letter-spacing: -0.333px;

                display: flex;
                justify-content: space-between;

                button {
                    width: 64px;
                    height: 24px;
                    flex-shrink: 0;
                    border-radius: 6px;

                    color: #fff;
                    text-align: center;
                    font-size: 12px;
                    font-style: normal;
                    font-weight: 700;
                    line-height: 24px; /* 200% */
                    letter-spacing: -0.333px;
                    ${props =>
                        props.status === 'NOT_RETURNED'
                            ? 'background-color : #00D09E;'
                            : props.status === 'RETURNED'
                            ? 'background-color: #D9D9D9;'
                            : 'background-color:  #F2771E;'}
                }
            }
        }
    }
`;

export const ReceiptBoard = styled(Flex)`
    width: 100%;
    flex-direction: column;
    padding: 28px;

    p {
        margin-bottom: 16px;

        align-self: flex-start;
        color: var(--kakao-logo, #000);
        text-align: center;
        font-size: 20px;
        font-style: normal;
        font-weight: 700;
        line-height: 24px; /* 120% */
        letter-spacing: -0.333px;
    }
`;
export const ReceiptBox = styled(Flex)`
    width: 90%;
    flex-direction: column;
    gap: 4px;
`;
export const ReceiptElement = styled(Flex)`
    width: 100%;
    justify-content: space-between;
    h1 {
        color: #888;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 24px; /* 150% */
        letter-spacing: -0.333px;
    }
    h2 {
        color: var(--kakao-logo, #000);
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 24px; /* 150% */
        letter-spacing: -0.333px;
    }
`;
export const HR = styled.div`
    width: 100%;
    height: 1px;
    flex-shrink: 0;
    background-color: #525252;

    margin: 8px;
`;
