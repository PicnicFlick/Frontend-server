import styled from "styled-components"
import { Wrapper_Auth } from "./Auth_Login"
import Auth_Header from "components/Auth_Header"
import axios from "axios"
import { tmpToken } from "./Auth_Selection"
import { useEffect, useState } from "react"
import { PLACESINFO } from "consts/places"
import { useNavigate } from "react-router-dom"

function Auth_Item(){
    const navigate=useNavigate();

    const text = "대여품 수량관리"
    const placeIdList = [1,2,3];
    const [resultList,setResultList]=useState([]);

    const fetchItem = async() => {
        let tmp = [];
        const token = sessionStorage.getItem('token');
        
        for(let i = 0; i<placeIdList.length; i++){
            console.log(token);
            try{
                const response = await axios.get(`${process.env.REACT_APP_BACK_API}/api/v1/mat`,
                {
                    headers:{
                        Authorization:token
                    },
                    params:{
                        placeId:placeIdList[i]
                    },
                });
                tmp.push(response.data.result);
                console.log(response.data);
            }catch(error){
                // alert(error);
            }
        }
        setResultList(tmp);
    }
    //resultList에 각 대여장소별 response.data.result를 모아둠

    const onClick_add = async (event) => {
        const placeId = Number(event.currentTarget.id);
        const token = sessionStorage.getItem('token');

        let tmp = window.confirm(`해당 ${placeId}번 위치에 돗자리를 추가하시겠습니까?`)
        
        if(tmp)
            try{
                //[관리자 페이지]돗자리 추가 API
                const response = await axios.post(
                    `${process.env.REACT_APP_BACK_API}/api/v1/mat/admin`,
                    {
                        placeId:placeId,
                        price:3000
                    },
                    {
                        headers:{
                            Authorization:token
                        }
                    }
                    )
                console.log(response.data);
                alert('성공적으로 추가되었습니다');
                fetchItem();
            }catch(error){
                alert(error);
            }
    }

    const onClick_delete = async (event) => {
        const placeId = Number(event.currentTarget.dataset.placeid);
        //dataset의 속성이름에 대문자 들어가면 안됨

        const id = Number(event.currentTarget.id);
        const token = sessionStorage.getItem('token');

        let tmp = window.confirm(`해당 ${placeId}번 위치의 ${id}번 돗자리를 삭제하시겠습니까?`)
        
        if(tmp)
            try{
                //[관리자] 돗자리 삭제 API
                const response = await axios.delete(
                    `${process.env.REACT_APP_BACK_API}/api/v1/mat/${id}/admin`,
                    {
                        headers:{
                            Authorization:token
                        },
                    }
                    )
                console.log(response.data);
                alert('성공적으로 삭제되었습니다');
                fetchItem();
            }catch(error){
                alert(error);
            }
    }

    useEffect(()=>{fetchItem()},[]);

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

            <div>주영이가 작업할 곳 2</div>

           
            {resultList?.map((item,index)=>{
                return(
                <div key={index}>
                    
                    <button 
                    style={{
                        width:'100px',
                        height:'20px',
                        backgroundColor:'yellowgreen',
                    }}
                    id = {index+1} 
                    onClick={onClick_add}>
                        돗자리 추가하기
                    </button>
                    {index+1}. {PLACESINFO[index].name}
                    (인덱스 : 돗자리 id)
                    {item.matIdList.map((item2,index2)=>
                    <h1 key={index2}>
                        {index2} : {item2}번
                        {/* PLACESINFO는 상수(프론트에서 관리하는 대여장소들 정보) */}
                        <button 
                        style={{
                            width:'100px',
                            height:'20px',
                            backgroundColor:'pink',
                        }}
                        id = {item2} 
                        data-placeid = {index+1}
                        onClick={onClick_delete}>
                        돗자리 삭제하기
                    </button>

                    </h1>
                    )}
                    <br/>
                </div>
                )
            }
           )}
        </Wrapper_Auth>
    )
}
export default Auth_Item

const Top_Text = styled.h1``;
const FullBox = styled.div``;
const RentalShopBox = styled.div``;
const IndexBox = styled.div``;
const LentalState = styled.div``;
const IndexLine=styled.line``;
const AllLocker = styled.div``;
const OneLocker=styled.div``;
const ID = styled.text``;
const LentalState_2 = styled.text``;
const Delete = styled.text``;
const DeleteButton = styled.button``;
const Quantity = styled.div``;
const AddButton = styled.button``;


