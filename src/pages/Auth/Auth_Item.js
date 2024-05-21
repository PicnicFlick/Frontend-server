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
            <Top_Text>
                대여중 총 수량 : 30개
                <Spacer/>
                대여 중인 총 수량 : 10개 
            </Top_Text>
            <FullBox> 
                <RentalShopContainer>

                {resultList?.map((item,index)=>{
                    return(
                    <div key={index}>

                        <RentalShopName>
                        <RentalShopName_Text>
                            {index+1}. {PLACESINFO[index].name}(인덱스 : 돗자리 id)
                        </RentalShopName_Text>
                        </RentalShopName>
                        <RentalShopBox>
                        {item.matIdList.map((item2,index2)=>
                        <h1 key={index2}>
                            {index2} : {item2}번
                            {/* PLACESINFO는 상수(프론트에서 관리하는 대여장소들 정보) */}
                            <Delete>
                            <DeleteButton id={index+1} onClick={onClick_add}>
                                돗자리 삭제하기
                            </DeleteButton>
                            </Delete>
                        </h1>
                        )}
                        <AddButton id={index+1} onClick={onClick_add}>
                            돗자리 추가하기
                        </AddButton>
                        </RentalShopBox>   
                        <br/>
                    </div>
                    )
                }
            )}
            </RentalShopContainer>
        </FullBox>
    </Wrapper_Auth>
    )
}
export default Auth_Item

const Top_Text = styled.h1`
    color: #000;
    font-family: Pretendard;
    font-size: 25px;
    font-style: normal;
    font-weight: 500;
    line-height: 24px;
    letter-spacing: -0.333px;
    margin-top: 30px;
    /* margin-bottom:10px; */
`;
//span요소를 사용해서 tap한 것 처럼
const Spacer = styled.span`
    display : inline-block;
    width: 80px;
`;
const FullBox = styled.div`
    margin-top: 30px;
    margin-bottom:30px;
`;
const RentalShopName = styled.div`
    margin-top: 10px;
    margin-bottom:10px;
`;
const RentalShopName_Text = styled.h1`
    color: #000;
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: 24px;
    letter-spacing: -0.333px;
    margin-top: 0 29px;
    flex:1;
`;
const RentalShopContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-around;
    flex-wrap: wrap;
    width: 100%;
`;
const RentalShopBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    width: 300px;
    margin: 10px;
    padding: 20px;
    flex-shrink: 0;
    border-radius: 12px;
    background: #D9D9D9;
`;
const IndexBox = styled.div`

`;

const LentalState = styled.div``;
const IndexLine=styled.line``;
const AllLocker = styled.div``;
const OneLocker=styled.div``;
const ID = styled.text``;
const LentalState_2 = styled.text``;
//취소하기 버튼 전용 span
const Delete = styled.text`
    margin-top:10px;
    margin-bottom:10px;
`;
const DeleteButton = styled.button`
    width:100px;
    height:20px;
    background-color:pink;
`;
const Quantity = styled.div``;
const AddButton = styled.button`
    width:100px;
    height:20px;
    background-color:yellowgreen;
`;

