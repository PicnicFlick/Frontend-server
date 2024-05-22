import styled from "styled-components"
import { Wrapper_Auth } from "./Auth_Login"
import Auth_Header from "components/Auth_Header"
import { useEffect, useState } from "react"
import axios from "axios"
import { tmpToken } from "./Auth_Selection"
import { useNavigate } from "react-router-dom"

function Auth_History(){
    const navigate=useNavigate();
    const text = "대여내역 관리"

    const [historyList,setHistoryList]=useState([]);
    const [pageNum,setPageNum]=useState(0);
    const [totalCnt,setTotalCnt]=useState(0);
    const [totalPages,setTotalPages]=useState(0);

    const fetchHistory = async() => {
        try{
            const URL = process.env.REACT_APP_BACK_API;
            const token = sessionStorage.getItem('token');
            // const token = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzMzgxNDE0MTc0IiwiYXV0aCI6IlJPTEVfVVNFUiIsImV4cCI6MTcxNjU5NDU5M30.UptgLHZq6XBVwzvtO3Q-hUEnPrLi9Nsac9dGSMOB4HI";
            console.log('token : ',token);
            //[관리자]전체 사용자 내역 조회 API
            const response = await axios.get(`${URL}/api/v1/history/admin`,{
                headers:{
                    Authorization:token
                },
                params:{
                    pageNum:1,
                    status:'RETURNED'
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
                const historyList_1 = response.data.result.historyList;
                setHistoryList(historyList_1);
                setPageNum(response.data.result.pageNum);
                setTotalCnt(response.data.result.totalCnt);
                setTotalPages(response.data.result.totalPages);

                // Log and store each variable
                historyList_1.forEach((item, index) => {
                    console.log(`Item ${index + 1}:`);
                    console.log(`cnt: ${item.cnt}`);
                    console.log(`despositPrice: ${item.despositPrice}`);
                    console.log(`email: ${item.email}`);
                    console.log(`historyId: ${item.historyId}`);
                    console.log(`itemName: ${item.itemName}`);
                    console.log(`location: ${item.location}`);
                    console.log(`matId: ${item.matId}`);
                    console.log(`nickname: ${item.nickname}`);
                    console.log(`rentPrice: ${item.rentPrice}`);
                    console.log(`returned_time: ${item.returned_time}`);
                    console.log(`started_time: ${item.started_time}`);
                    console.log(`status: ${item.status}`);
                    console.log(`totalPrice: ${item.totalPrice}`);
                });
            } else {
                console.error('Unexpected response structure:', response.data);
            }
        } catch (error) {
            alert(error);
        }
    }

    useEffect(()=>{fetchHistory()},[]);


    //관리자 로그인 여부//
    useEffect(()=>{
        const parsed = JSON.parse(process.env.REACT_APP_AUTH_ACCOUNT);
        const sessionItem = JSON.parse(sessionStorage.getItem('authKey'));

        if(!sessionItem ||
            (sessionItem.id !== parsed.id ||
                sessionItem.password !== parsed.password)){
                alert('관리자 로그인이 필요한 서비스입니다');
                navigate('/auth/login');
            }
    },[])
    //반납여부 문자열 조건부 랜더링
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
    //날짜 "년-월-일"만 추출
    const formatDate = (dateString) => {
        return dateString.split('T')[0];
    }

    return (
        <Wrapper_Auth>
            <Auth_Header text={text}/>
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
            {historyList.map((item,index)=>
                <OneBox key={index}>
                    <C_IndexTopic>{item.historyId}</C_IndexTopic>
                    <C_IndexTopic>{item.nickname}</C_IndexTopic>
                    <C_IndexTopic>{item.location}</C_IndexTopic>
                    <C_IndexTopic>{formatDate(item.started_time)}</C_IndexTopic>
                    <C_IndexTopic>{item.totalPrice}</C_IndexTopic>
                    <C_IndexTopic>{renderStatus(item.status)}</C_IndexTopic>
                    <C_IndexTopic><Button_MoreDetail>더보기</Button_MoreDetail></C_IndexTopic>
                </OneBox>
            )}
            </AllBox>
            </FullBox>
      
        </Wrapper_Auth>
    )
}

export default Auth_History
//상단 일자 component
const Date = styled.div`
    display:flex; /*flexbox*/
    flex-direction:row; /*가로로 나열*/
    margin-top:20px;
    margin-bottom:20px;
    margin-right:10px;
`;
const Date1 =styled.h1`
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

//팝업
const Popup = styled.div``;
const Pop_1 = styled.div``;
const Pop_2 = styled.div``;
