import styled from "styled-components"
import { Wrapper_Auth } from "./Auth_Login"
import Auth_Header from "components/Auth_Header"
import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

function Auth_History() {
    const navigate = useNavigate();
    const text = "대여내역 관리"

    const [historyList, setHistoryList] = useState([]);
    const [pageNum, setPageNum] = useState(0);
    const [totalCnt, setTotalCnt] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [showPopup, setShowPopup] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const fetchHistory = async () => {
        try {
            const URL = process.env.REACT_APP_BACK_API;
            const token = sessionStorage.getItem('token');
            console.log('token : ', token);
            const response = await axios.get(`${URL}/api/v1/history/admin`, {
                headers: {
                    Authorization: token
                },
                params: {
                    pageNum: 1,
                    status: 'RETURNED'
                }
            });
            console.log(response.data);
            console.log(response.data.result);
            console.log(response.data.result.historyList);
            const result = response.data.result;
            const historyList_1 = response.data.result.historyList;
            historyList_1.forEach((item, index) => {
                console.log(`Item ${index + 1}:`, item);
            });
            if (result) {
                setHistoryList(historyList_1);
                setPageNum(response.data.result.pageNum);
                setTotalCnt(response.data.result.totalCnt);
                setTotalPages(response.data.result.totalPages);
            } else {
                console.error('Unexpected response structure:', response.data);
            }
        } catch (error) {
            alert(error);
        }
    }

    useEffect(() => { fetchHistory() }, []);

    useEffect(() => {
        const parsed = JSON.parse(process.env.REACT_APP_AUTH_ACCOUNT);
        const sessionItem = JSON.parse(sessionStorage.getItem('authKey'));

        if (!sessionItem ||
            (sessionItem.id !== parsed.id ||
                sessionItem.password !== parsed.password)) {
            alert('관리자 로그인이 필요한 서비스입니다');
            navigate('/auth/login');
        }
    }, [])

    const renderStatus = (status) => {
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
    }

    const formatDate = (dateString) => {
        return dateString.split('T')[0];
    }

    return (
        <Wrapper_Auth>
            <Auth_Header text={text} />
            <Date>
                <Date1>일자</Date1>
                <Date2>날짜 모달</Date2>
            </Date>
            <FullBox>
                <IndexBox>
                    <IndexTopic>대여 ID</IndexTopic>
                    <IndexTopic>대여자 이름</IndexTopic>
                    <IndexTopic>대여 장소</IndexTopic>
                    <IndexTopic>대여 일시</IndexTopic>
                    <IndexTopic>결제금액</IndexTopic>
                    <IndexTopic>대여상태</IndexTopic>
                    <IndexTopic>비고</IndexTopic>
                </IndexBox>
                <AllBox>
                    {historyList.map((item, index) =>
                        <OneBox key={index}>
                            <C_IndexTopic>{item.historyId}</C_IndexTopic>
                            <C_IndexTopic>{item.nickname}</C_IndexTopic>
                            <C_IndexTopic>{item.location}</C_IndexTopic>
                            <C_IndexTopic>{formatDate(item.started_time)}</C_IndexTopic>
                            <C_IndexTopic>{item.totalPrice}</C_IndexTopic>
                            <C_IndexTopic>{renderStatus(item.status)}</C_IndexTopic>
                            <C_IndexTopic>
                                <Button_MoreDetail onClick={() => { setSelectedItem(item); setShowPopup(true); }}>더보기</Button_MoreDetail>
                            </C_IndexTopic>
                        </OneBox>
                    )}
                </AllBox>
            </FullBox>
            {showPopup && selectedItem && (
                <Popup>
                    <Pop_1>
                        <Pop_2>대여ID<br /><br />대여자 이름<br /><br />대여 장소<br /><br />대여 일시<br /><br />반납 일시</Pop_2>
                        <Pop_3>
                            {selectedItem.historyId}<br /><br />
                            {selectedItem.nickname}<br /><br />
                            {selectedItem.location}<br /><br />
                            {formatDate(selectedItem.started_time)}<br /><br />
                            {formatDate(selectedItem.returned_time)}
                        </Pop_3>
                        <Pop_4>대여 금액<br /><br />보증금<br /><br />실제 결제금액<br /><br />대여 상태</Pop_4>
                        <Pop_5>
                            {selectedItem.rentPrice}<br /><br />
                            {selectedItem.despositPrice}<br /><br />
                            {selectedItem.totalPrice}<br /><br />
                            {renderStatus(selectedItem.status)}
                        </Pop_5>
                    </Pop_1>
                    <Button_Close onClick={() => setShowPopup(false)}>닫기</Button_Close>
                </Popup>
            )}
        </Wrapper_Auth>
    )
}

export default Auth_History

//상단 일자 component
const Date = styled.div`
    display:flex; /*flexbox*/
    flex-direction:row; /*가로로 나열*/
    margin-top:20px;
    margin-bottom:1px;
    margin-right:10px;
`;
const Date1 = styled.h1`
width: 181px;
height: 43px;
flex-shrink: 0;
color: var(--kakao-logo, #000);
font-family: Pretendard;
font-size: 20px;
font-style: normal;
font-weight: 500;
line-height: 24px; /* 120% */
letter-spacing: -0.333px;
`;
const Date2 = styled.div`
width: 181px;
height: 43px;
flex-shrink: 0;
color: var(--kakao-logo, #000);
font-family: Pretendard;
font-size: 20px;
font-style: normal;
font-weight: 500;
line-height: 24px; /* 120% */
letter-spacing: -0.333px;
`;
//히스토리 Box
const FullBox = styled.div`
margin-top:10px;
margin-bottom:10px;
margin-right:10px;
margin-left:10px;
width: 947px;
height: 418px;
border-radius:15px;
border: 5px solid #7D7D7D;
background-color: transparent;/*투명색!*/
`;
const IndexBox = styled.div`
display: flex;
flex-direction: row;
margin-right: 1px;
margin-left: 10px;
margin-top: 15px;
margin-bottom: 20px;
border-bottom: 3px solid #D9D9D9; /* 줄 */
`;
const IndexTopic = styled.h1`
    width: 86px;
    height: 33px;
    flex-shrink: 0;
    color: var(--kakao-logo, #000);
    text-align: center;
    font-family: Pretendard;
    font-size: 19px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px; /* 133.333% */
    letter-spacing: -0.333px;
    margin-right:20px;
    margin-left:25px;
`;
const AllBox = styled.div`
    margin-right:20px;
    margin-left:10px;
    margin-top:5px;
    margin-bottom:10px;
`;
const OneBox = styled.div`
    display: flex; 
    margin-left:5px;
    margin-top:10px;
    margin-bottom:10px;
    border-radius: 4px;
    background: #F1F0F0;
    flex-shrink: 0;
    align-items: center; /* 세로 정렬을 중앙으로 맞춤 */
    justify-content: space-between; /* 양쪽 끝으로 배치 */
`;
const C_IndexTopic = styled.text`
    width: 86px;
    height: 33px;
    flex-shrink: 0;
    color: var(--kakao-logo, #000);
    text-align: center;
    font-family: Pretendard;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px; /* 133.333% */
    letter-spacing: -0.333px;
    margin-right:20px;
    margin-left:25px;
`;
//버튼
const Button_MoreDetail = styled.button`
    width: 65px;
    height: 25px;
    background-color: #00C797;
    color: #333; /* 폰트 색상 설정 */
    margin-right: 16px;
    color:white;
    font-weight:750;
`;
const Button_Delete = styled.button``;
const Button_Close = styled.button`
    width: 65px;
    height: 25px;
    background-color: #ff0000;
    color: white;
    margin-top: 10px;
    font-weight:600;
    align-self: flex-end;
    position: fixed; /* 화면에 고정 */
    top: 2%; /* 화면의 위에서 30% 내려온 위치 */
    left: 2%; /* 화면의 왼쪽에서 50% */
`;
//팝업
const Popup = styled.div`
    width: 720px;
    height: 288px;
    flex-shrink: 0;
    border-radius: 12px;
    background: #FFF;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    position: fixed; /* 화면에 고정 */
    top: 50%; /* 화면의 위에서 30% 내려온 위치 */
    left: 50%; /* 화면의 왼쪽에서 50% */
    transform: translate(-50%, -30%); /* 정확히 중앙에 위치하도록 조정 */
    z-index: 1000; /* 팝업을 다른 요소들 위에 표시 */
    display: flex;
    flex-direction: column;
    align-items: center;
`;
const Pop_1 = styled.div`
display:flex;
flex-direction:row;
margin-top : 10px;
margin-bottom:10px;
margin-right:10px;
margin-left:10px;
`;
const Pop_2 = styled.h1`
margin-top : 20px;
margin-bottom:10px;
margin-right:10px;
margin-left:10px;
font-weight:900px;
`;
const Pop_3 = styled.div`
margin-top : 20px;
margin-bottom:10px;
margin-right:30px;
margin-left:10px;
`;
const Pop_4 = styled.h1`
margin-top : 20px;
margin-bottom:10px;
margin-right:10px;
margin-left:10px;
font-weight:900px;
`;
const Pop_5 = styled.div`
margin-top : 20px;
margin-bottom:10px;
margin-right:10px;
margin-left:10px;
`;
