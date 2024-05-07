import TopFixedBar, { TopFixedBar_Blank } from "components/TopFixedBar";
import { Flex, WidthBlock, Wrapper } from "pages/Home";
import { MainBoard } from "./MyPage";
import { useEffect, useState, usestatus } from "react";
import styled from "styled-components";

import next from 'assets/images/Next.svg';
import dropDown from 'assets/images/DropDown.svg';
import { useNavigate } from "react-router-dom";
import axios from "axios";

function MyPage_History(){
    const navigate=useNavigate();
    const [rentList,setRentList] = useState([])

    const fetchRentList = async () => {
        const token = sessionStorage.getItem('token');
        try{
            const response = await axios.get(
                `${process.env.REACT_APP_BACK_API}/api/v1/history/log`
                ,
                {
                    headers:{
                        Authorization:`${token}`
                    }
                }
            )
            console.log(response.data)
            setRentList(response.data.result);

        }catch(error){
            console.log(error);
        }
    }

    useEffect(()=>{
        fetchRentList();
    },[]);


    return (
        <Wrapper>
            <WidthBlock>
                <TopFixedBar text="마이페이지" />
                <TopFixedBar_Blank />
                <TopBar_History>
                    <h1>
                        이용내역
                    </h1>
                    <h2>
                        총&nbsp;{rentList?.length}건
                    </h2>
                    <DropDownBox>
                        <select>
                            <option>전체</option>
                            <option>대여중</option>
                            <option>반납완료</option>
                        </select>
                        <img src={dropDown}/>
                    </DropDownBox>
                </TopBar_History>
                
                <MainBoard>
                    {rentList.map((item,index)=>(
                    <HistoryBox status={item.status}>
                        <TextBox>
                        <h1>
                            {item.rentDay?.slice(0,10)}
                        </h1>
                        <h2>
                            {item.startTime} ~ {item.returnTime?.slice(0,8)}
                        </h2>
                        </TextBox>

                        
                        <button>
                        {
                          item.status=='NOT_RETURNED'
                            ? '대여중'
                            : (item.status=='RETURNED'
                            && '반납완료')
                        }
                        </button>
                        
                        <NextBox>
                            <h1 onClick={()=>navigate(`${item.history_id}`,{status:item})}>
                                {item.price.toLocaleString()}원
                            </h1>
                            <img src={next}/>
                        </NextBox>

                    </HistoryBox>
                    ))}
                </MainBoard>
            </WidthBlock>
        </Wrapper>
    )
}

export default MyPage_History;


const DropDownBox = styled(Flex)``;
export const TopBar_History = styled(Flex)`
position:relative;

width:100%;
@media screen and (min-width:450px){
    width:400px;
}
height:72px;

justify-content:space-between;

padding-left:28px;
padding-right:18px;
h1{
color: var(--kakao-logo, #000);
text-align: center;
font-size: 24px;
font-style: normal;
font-weight: 700;
line-height: 24px; /* 100% */
letter-spacing: -0.333px;
}
h2{
position:absolute;
right:100px;
color: var(--kakao-logo, #000);
text-align: right;
font-size: 12px;
font-style: normal;
font-weight: 300;
line-height: 24px; /* 200% */
letter-spacing: -0.333px;
}
${DropDownBox}{
    position:relative;

    width: 72px;
    height: 24px;
    flex-shrink: 0;
    border-radius: 6px;
    border: 1px solid #B7B7B7;
    background: #FFF;
    select{
        position:relative;
        -webkit-appearance: none; /* 크롬, 사파리, 최신 버전의 오페라 */
        -moz-appearance: none; /* 파이어폭스 */
        appearance: none; /* 표준 구문 */

        width:100%;
        height:24px;
        background-color:transparent;
        border:none;

        padding-left:8px;
        z-index:10;
    }
    img{
        position:absolute;
        right:8px;
    }
}
`;

const TextBox = styled(Flex)``;
const NextBox = styled(Flex)``;
export const HistoryBox = styled.div`
position:relative;
width:100%;
height:156px;

border-bottom: 2px solid #E6EAED;

${TextBox}{
    position:absolute;
    width:100%;
    top:18px;
    left:28px;

    flex-direction:column;
    align-items:flex-start;
    h1{
        color: var(--kakao-logo, #000);
        font-size: 20px;
        font-style: normal;
        font-weight: 700;
        line-height: 24px; /* 120% */
        letter-spacing: -0.333px;
        text-align:left;

        margin-bottom:8px;
    }
    h2{
        color: var(--kakao-logo, #000);
        font-size: 16px;
        font-style: normal;
        font-weight: 300;
        line-height: 20px;
        letter-spacing: -0.333px;
        text-align:left;

        margin-bottom:4px;
    }
}

button{
    position:absolute;
    right:20px;
    bottom:56px;
    width: 64px;
    height: 24px;
    flex-shrink: 0;
    border-radius: 6px;

    color: #FFF;
    text-align: center;
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px; /* 200% */
    letter-spacing: -0.333px;
    ${props=>props.status=='NOT_RETURNED'
    ? 'background-color: #00D09E;' 
    : 'background-color: #D9D9D9;'}
}

${NextBox}{
    position:absolute;
    right:20px;
    bottom:16px;
    gap:8px;

    h1{
        ${props=>props.status=='NOT_RETURNED'
    ? 'color: #00D09E;' 
    : 'color: #636363;'}

        text-align: right;
        font-size: 24px;
        font-style: normal;
        font-weight: 200;
        line-height: 24px; /* 100% */
        letter-spacing: -0.333px;
        cursor:pointer;
    }
    }  
`;


