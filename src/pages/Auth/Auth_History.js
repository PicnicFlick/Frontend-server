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
            const result = response.data.result;
            if(result){
                setHistoryList(response.data.result.historyList);
                setPageNum(response.data.result.pageNum);
                setTotalCnt(response.data.result.totalCnt);
                setTotalPages(response.data.result.totalPages);
                //response.data.result에 있는 모든 속성들 변수화
            } else {
                console.error('Unexpected response structure:', response.data);
            }
        }catch(error){
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
                <IndexTopic>E-mail</IndexTopic>
                <IndexTopic>대여 수량</IndexTopic>
                <IndexTopic>대여 일시</IndexTopic>
                <IndexTopic>결제금액</IndexTopic>
                <IndexTopic>대여상태</IndexTopic>
                <IndexTopic>비고</IndexTopic>

            </IndexBox>
            {historyList.map((item,index)=>
            <h1>{item.started_time} / {item.returned_time}</h1>)}
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
margin-bottom: 30px;
border-bottom: 3px solid #D9D9D9; /* 줄 */
`;
const IndexTopic = styled.h1`
    width: 86px;
    height: 33px;
    flex-shrink: 0;
    color: var(--kakao-logo, #000);
    text-align: center;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px; /* 133.333% */
    letter-spacing: -0.333px;
    margin-right:20px;
    margin-left:10px;
`;
const AllBox = styled.div`

`;
const OneBox = styled.div`

`;
//버튼
const Button_MoreDetail = styled.button``;
const Button_Delete = styled.button``;
//팝업
const Popup = styled.div``;
const Pop_1 = styled.div``;
const Pop_2 = styled.div``;
