import styled from 'styled-components';
import { WrapperAuth } from './AuthLogin';
import AuthHeader from 'components/AuthHeader';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AuthHistory() {
    const navigate = useNavigate();
    const text = '대여내역 관리';

    const [historyList, setHistoryList] = useState([]);
    const [pageNum, setPageNum] = useState(0);
    const [totalCnt, setTotalCnt] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [showPopup, setShowPopup] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const [selectedCategory, setSelectedCategory] = useState('');
    const [decling, setDecling] = useState(false);

    const fetchHistory = async () => {
        try {
            const URL = process.env.REACT_APP_BACK_API;
            const token = sessionStorage.getItem('token');
            console.log('token : ', token);
            const response = await axios.get(`${URL}/api/v1/history/admin`, {
                headers: {
                    Authorization: token,
                },
                params: {
                    pageNum: 1,
                    status: 'RETURNED',
                },
            });

            console.log(response.data.result);
            const result = response.data.result;

            if (result) {
                setHistoryList(result.historyList);
                setPageNum(result.pageNum);
                setTotalCnt(result.totalCnt);
                setTotalPages(result.totalPages);
            } else {
                console.error('Unexpected response structure:', response.data);
            }
        } catch (error) {
            alert(error);
        }
    };
    const onClickSort = event => {
        event.preventDefault();
        const category = event.currentTarget.dataset.category;
        let tmp = [...historyList];
        console.log('type:', typeof category);

        if (selectedCategory === category) {
            if (!decling) {
                setHistoryList(
                    tmp.sort((a, b) => {
                        if (category === 'historyId')
                            return b[category] - a[category];
                        else
                            return String(b[category]).localeCompare(
                                String(a[category]),
                            );
                    }),
                );
                setDecling(true);
            } else {
                setHistoryList(
                    tmp.sort((a, b) => {
                        if (category === 'historyId')
                            return a[category] - b[category];
                        else
                            return String(a[category]).localeCompare(
                                String(b[category]),
                            );
                    }),
                );
                setDecling(false);
            }
        } else {
            setHistoryList(
                tmp.sort((a, b) => {
                    if (category === 'historyId')
                        return a[category] - b[category];
                    else
                        return String(a[category]).localeCompare(
                            String(b[category]),
                        );
                }),
            );
            setDecling(false);
        }

        setSelectedCategory(category);
    };

    useEffect(() => {
        fetchHistory();
    }, []);

    useEffect(() => {
        const parsed = JSON.parse(process.env.REACT_APP_AUTH_ACCOUNT);
        const sessionItem = JSON.parse(sessionStorage.getItem('authKey'));

        if (
            !sessionItem ||
            sessionItem.id !== parsed.id ||
            sessionItem.password !== parsed.password
        ) {
            alert('관리자 로그인이 필요한 서비스입니다');
            navigate('/auth/login');
        }
    }, []);

    const renderStatus = status => {
        switch (status) {
            case 'RETURNED':
                return '반납완료';
            case 'NOT_RETURNED':
                return '대여중';
            case 'LATE_RETURNED':
                return '연체중';
            default:
                return status;
        }
    };

    const formatDate = dateString => {
        return dateString.split('T')[0];
    };

    return (
        <WrapperAuth>
            <AuthHeader text={text} />
            <FullBox>
                <IndexBox>
                    <IndexTopic data-category="historyId" onClick={onClickSort}>
                        대여 ID▼
                    </IndexTopic>
                    <IndexTopic data-category="nickname" onClick={onClickSort}>
                        대여자 이름▼
                    </IndexTopic>
                    <IndexTopic data-category="location" onClick={onClickSort}>
                        대여 장소▼
                    </IndexTopic>
                    <IndexTopic
                        data-category="started_time"
                        onClick={onClickSort}
                    >
                        대여 일시▼
                    </IndexTopic>
                    <IndexTopic
                        data-category="totalPrice"
                        onClick={onClickSort}
                    >
                        결제금액▼
                    </IndexTopic>
                    <IndexTopic data-category="status" onClick={onClickSort}>
                        대여상태▼
                    </IndexTopic>
                    <IndexTopic>비고</IndexTopic>
                </IndexBox>
                <HR />
                <AllBox>
                    {historyList.map((item, index) => (
                        <OneBox key={index}>
                            <CIndexTopic>{item.historyId}</CIndexTopic>
                            <CIndexTopic>{item.nickname}</CIndexTopic>
                            <CIndexTopic>{item.location}</CIndexTopic>
                            <CIndexTopic>
                                {formatDate(item.started_time)}
                            </CIndexTopic>
                            <CIndexTopic>{item.totalPrice}</CIndexTopic>
                            <CIndexTopic>
                                {renderStatus(item.status)}
                            </CIndexTopic>
                            <CIndexTopic>
                                <ButtonMoreDetail
                                    onClick={() => {
                                        setSelectedItem(item);
                                        setShowPopup(true);
                                    }}
                                >
                                    더보기
                                </ButtonMoreDetail>
                            </CIndexTopic>
                        </OneBox>
                    ))}
                </AllBox>
                {showPopup && selectedItem && (
                    <Popup>
                        <Pop1>
                            <Pop2>
                                대여ID
                                <br />
                                <br />
                                대여자 이름
                                <br />
                                <br />
                                대여 장소
                                <br />
                                <br />
                                대여 일시
                                <br />
                                <br />
                                반납 일시
                            </Pop2>
                            <Pop3>
                                {selectedItem.historyId}
                                <br />
                                <br />
                                {selectedItem.nickname}
                                <br />
                                <br />
                                {selectedItem.location}
                                <br />
                                <br />
                                {formatDate(selectedItem.started_time)}
                                <br />
                                <br />
                                {formatDate(selectedItem.returned_time)}
                            </Pop3>
                            <Pop4>
                                대여 금액
                                <br />
                                <br />
                                보증금
                                <br />
                                <br />
                                실제 결제금액
                                <br />
                                <br />
                                대여 상태
                            </Pop4>
                            <Pop5>
                                {selectedItem.rentPrice}
                                <br />
                                <br />
                                {selectedItem.despositPrice}
                                <br />
                                <br />
                                {selectedItem.totalPrice}
                                <br />
                                <br />
                                {renderStatus(selectedItem.status)}
                            </Pop5>
                        </Pop1>
                        <ButtonClose onClick={() => setShowPopup(false)}>
                            닫기
                        </ButtonClose>
                    </Popup>
                )}
            </FullBox>
        </WrapperAuth>
    );
}

export default AuthHistory;

const FullBox = styled.div`
    position: relative;
    width: 948px;

    margin-top: 30px;

    padding: 10px 10px 20px 10px;

    border-radius: 15px;
    border: 5px solid #7d7d7d;
    background-color: transparent; /*투명색!*/

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
const IndexBox = styled.div`
    width: 95%;

    margin-top: 15px;

    display: grid;
    grid-template-columns: repeat(7, 1fr);
`;
const IndexTopic = styled.h1`
    flex-shrink: 0;
    color: var(--kakao-logo, #000);
    text-align: center;
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px; /* 133.333% */
    letter-spacing: -0.333px;
    margin-right: 20px;
    margin-left: 25px;
    cursor: pointer;

    &:hover {
        color: #888;
    }

    &:last-of-type {
        cursor: initial;
        &:hover {
            color: #000;
        }
    }
`;
const HR = styled.div`
    width: 95%;
    height: 2px;
    border-radius: 1px;
    margin: 10px;

    background-color: #aaa;
`;
const AllBox = styled.div`
    width: 95%;
    height: 300px;
    margin-top: 5px;
    overflow-y: auto;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 4px;
`;
const OneBox = styled.div`
    width: 100%;

    border-radius: 4px;
    background: #f1f0f0;

    display: grid;
    grid-template-columns: repeat(7, 1fr);
`;
const CIndexTopic = styled.div`
    height: 40px;
    flex-shrink: 0;
    color: var(--kakao-logo, #000);
    text-align: center;
    font-family: Pretendard;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px; /* 133.333% */
    letter-spacing: -0.333px;

    display: flex;
    justify-content: center;
    align-items: center;
`;
//버튼
const ButtonMoreDetail = styled.button`
    width: 65px;
    height: 25px;
    background-color: #00c797;
    color: #333; /* 폰트 색상 설정 */
    color: white;
    font-weight: 750;
`;
const ButtonClose = styled.button`
    width: 65px;
    height: 25px;
    background-color: #ff0000;
    color: white;
    margin-top: 10px;
    font-weight: 600;
    align-self: flex-end;
    position: fixed; /* 화면에 고정 */
    top: 2%; /* 화면의 위에서 30% 내려온 위치 */
    left: 2%; /* 화면의 왼쪽에서 50% */
`;
//팝업
const Popup = styled.div`
    position: absolute; /* 화면에 고정 */
    top: 50%; /* 화면의 위에서 30% 내려온 위치 */
    left: 50%; /* 화면의 왼쪽에서 50% */
    transform: translate(-50%, -40%); /* 정확히 중앙에 위치하도록 조정 */
    z-index: 1000; /* 팝업을 다른 요소들 위에 표시 */

    width: 720px;
    height: 288px;
    flex-shrink: 0;
    border-radius: 12px;
    background: #fff;
    border-top: 1px solid #eee;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);

    display: flex;
    flex-direction: column;
    align-items: center;
`;
const Pop1 = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 10px;
    margin-bottom: 10px;
    margin-right: 10px;
    margin-left: 10px;
`;
const Pop2 = styled.h1`
    margin-top: 20px;
    margin-bottom: 10px;
    margin-right: 10px;
    margin-left: 10px;
    font-weight: 900px;
`;
const Pop3 = styled.div`
    margin-top: 20px;
    margin-bottom: 10px;
    margin-right: 30px;
    margin-left: 10px;
`;
const Pop4 = styled.h1`
    margin-top: 20px;
    margin-bottom: 10px;
    margin-right: 10px;
    margin-left: 10px;
    font-weight: 900px;
`;
const Pop5 = styled.div`
    margin-top: 20px;
    margin-bottom: 10px;
    margin-right: 10px;
    margin-left: 10px;
`;
