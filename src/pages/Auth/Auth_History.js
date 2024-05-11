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
            const token = tmpToken;
            console.log('token',token);

            const response = await axios.get(`${URL}/api/v1/history/admin`,{
                headers:{
                    Authorization:token
                },
                params:{
                    pageNum:1,
                    status:'RETURNED'
                }
            });
            setHistoryList(response.data.result.historyList);
            setPageNum(response.data.result.pageNum);
            setTotalCnt(response.data.result.totalCnt);
            setTotalPages(response.data.result.totalPages);
            //response.data.result에 있는 모든 속성들 변수화

            console.log(response.data);
        }catch(error){
            alert(error);
        }
    }

    useEffect(()=>{fetchHistory()},[]);


    //관리자 로그인 여부//
    useEffect(()=>{
        const parsed = JSON.parse(process.env.REACT_APP_AUTH_ACCOUNT);
        const sessionItem = JSON.parse(sessionStorage.getItem('loginKey'));

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
            <div>주영이가 작업할 곳 1</div>
            <div>HistoryList</div>
            {historyList.map((item,index)=>
            <h1>{item.started_time} / {item.returned_time}</h1>)}
        </Wrapper_Auth>
    )
}

export default Auth_History
