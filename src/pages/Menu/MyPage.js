import { useEffect, useState } from "react";
import TopFixedBar, { TopFixedBar_Blank } from "../../components/TopFixedBar";
import { BlackScreen, Flex, WidthBlock, Wrapper } from "../Home";
import styled from "styled-components";
import { ResponsivePieCanvas } from '@nivo/pie'

import next from 'assets/images/Next.svg';
import bottomLogo from 'assets/images/BottomLogo.png';
import profile from 'assets/images/ProfileIcon.png';
import { useNavigate } from "react-router-dom";
import QuitModal from "components/QuitModal";
import axios from "axios";
import { useLogined } from "hooks/useLogined";


function MyPage() {
    useLogined();
    const navigate=useNavigate();
    const [userData, setUserData] = useState({
        name: '노준호',
        email: 'asd1873@naver.com',
        warningCnt: '30',
        echoRate: 30
    })
    
    const [pieData,setPieData] = useState([{},{}]);


    const fetchUserData = async () => {
        const token = sessionStorage.getItem('token');
        try{
            const response = await axios.get(
                `${process.env.REACT_APP_BACK_API}/api/v1/user/mypage`
                ,
                {
                    headers:{
                        Authorization:`${token}`
                    }
                }
            )
            console.log(response.data)
            setUserData(response.data.result);

        }catch(error){
            console.log(error);
        }
    }

 

    useEffect(()=>{
        fetchUserData();
    },[]);


    useEffect(()=>{
        if(typeof(userData) === 'object'){
            setPieData([
                {
                    "id": "decrease",
                    "label": "decrease",
                    "value": userData.echoRate,
                    // "color": "hsl(144, 0%, 0%)"
                  },
                  {
                    "id": "erlang",
                    "label": "erlang",
                    "value": 100-userData.echoRate,
                    // "color": "hsl(121, 70%, 50%)"
                },
            ])
        }
    },[userData]);

    return (
        <Wrapper>
            <WidthBlock>
                <TopFixedBar text="마이페이지" />
                <TopFixedBar_Blank />
                <MainBoard>
                    <AccountBoard>
                        <ProfileImg src={profile} />
                        <AccountText>
                            <h1>
                                {userData.name}
                            </h1>
                            <h2>
                                {userData.email}
                            </h2>
                        </AccountText>
                        <BtnBox onClick={()=>navigate("revise",{state:userData})}>
                            <h3>
                                수정
                            </h3>
                            <NextBtn src={next} />
                        </BtnBox>
                            
                    </AccountBoard>
                    <HistoryBoard>
                        <h1>
                            이용내역
                        </h1>
                        <BtnBox onClick={()=>navigate('history')}>
                            <h2>
                                내역확인
                            </h2>
                            <NextBtn src={next} />
                        </BtnBox>
                    </HistoryBoard>
                    <WarningBoard>
                        <h1>경고횟수</h1>
                        <h2>{userData.warningCnt}회</h2>
                    </WarningBoard>
                    <Co2Board>
                        <h1>탄소저감률</h1>
                        <Co2Chart>
                            <MyResponsivePieCanvas data={pieData}/>
                            <h2>{userData.echoRate}%</h2>
                        </Co2Chart>
                    </Co2Board>
                    <Logo src={bottomLogo} />
                </MainBoard>
                {showModal
                &&
                <div>
                <QuitModal setShowModal={setShowModal}/>
                <BlackScreen/>
                </div>
                }
            </WidthBlock>
        </Wrapper>
    )
}

export default MyPage;

export const MyResponsivePieCanvas = ({ data /* see data tab */ }) => (
    <ResponsivePieCanvas
        data={data}
        margin={{ top: 20, right: 0, bottom: 20, left: 200 }}
        innerRadius={0.7}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        colors={['#00D09E','#DDD']}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    0.6
                ]
            ]
        }}
        enableArcLabels={false}
        enableArcLinkLabels={false}
        isInteractive={false}
    />
)

export const MainBoard = styled(Flex)`
width:100%;

background-color:white;

flex-direction:column;
justify-content:flex-start;
align-items:center;
`;

export const AccountBoard = styled(Flex)`
position:relative;
width:100%;
height:140px;

border-bottom: 2px solid #E6EAED;


`;


export const ProfileImg = styled.img`
position:absolute;
left:36px;
width:60px;
height:60px;
`;

export const NextBtn = styled.img`
cursor:pointer;
`;

export const AccountText = styled(Flex)`
position:absolute;
left:108px;

flex-direction:column;
justify-content:center;
align-items:flex-start;
gap:4px;

h1{
color: var(--kakao-logo, #000);
font-size: 20px;
font-style: normal;
font-weight: 800;
line-height: 24px; /* 120% */
letter-spacing: -0.333px;
text-align:left;
}
h2{
color: var(--kakao-logo, #000);
font-size: 14px;
font-style: normal;
font-weight: 300;
line-height: 12px; /* 85.714% */
letter-spacing: -0.333px;
}
`;

export const HistoryBoard = styled(Flex)`
position:relative;
width:100%;
height:60px;
border-bottom: 2px solid #E6EAED;

h1{
    position:absolute;
    left:40px;
    color: var(--kakao-logo, #000);
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px; /* 120% */
    letter-spacing: -0.333px;
    text-align:left;
}
`;

export const WarningBoard = styled(Flex)`
position:relative;
width:100%;
height:60px;
border-bottom: 2px solid #E6EAED;

h1{
    position:absolute;
    left:40px;
color: var(--kakao-logo, #000);
font-size: 20px;
font-style: normal;
font-weight: 700;
line-height: 24px; /* 120% */
letter-spacing: -0.333px;
text-align:left;
}
h2{
    position:absolute;
    right:36px;
    color: #FF8A00;
text-align: right;
font-size: 24px;
font-style: normal;
font-weight: 700;
line-height: 24px; /* 100% */
letter-spacing: -0.333px;
}
`;

export const Co2Board = styled(Flex)`
position:relative;
width:100%;
height:156px;
border-bottom: 2px solid #E6EAED;

h1{
    width:100%;
    position:absolute;
    left:40px;
    color: var(--kakao-logo, #000);
    text-align:left;
font-size: 20px;
font-style: normal;
font-weight: 700;
line-height: 24px; /* 120% */
letter-spacing: -0.333px;
text-align:left;
}
`;

export const Co2Chart = styled(Flex)`
position:absolute;
width:100%;
height:156px;
h2{
position:absolute;
right:72px;
color: #00D09E;
font-size: 24px;
font-style: normal;
font-weight: 700;
line-height: 24px; /* 100% */
letter-spacing: -0.333px;

padding-top:2px;
}
`;

export const QuitBtn = styled(Flex)`
align-self:flex-end;

margin:16px 36px 0 0;

color: var(--kakao-logo, #000);
font-size: 20px;
font-style: normal;
font-weight: 700;
line-height: 24px; /* 120% */
letter-spacing: -0.333px;

justify-content:space-between;
gap:8px;

cursor:pointer;

h2{
    right:52px;
    color: var(--kakao-logo, #000);
    font-size: 16px;
    font-style: normal;
    font-weight: 300;
    line-height: 24px; /* 150% */
    letter-spacing: -0.333px;

    padding-top:2px;
}
`;

export const Logo = styled.img`
position:absolute;
bottom:40px;

width:115px;
height:50px;
`;

export const BtnBox = styled(Flex)`
position:absolute;
right:36px;

justify-content:space-evenly;
gap:8px;

cursor:pointer;

h2{
    right:52px;
    color: var(--kakao-logo, #000);
    font-size: 16px;
    font-style: normal;
    font-weight: 300;
    line-height: 24px; /* 150% */
    letter-spacing: -0.333px;

    padding-top:2px;
}

h3{
color: var(--kakao-logo, #000);
text-align: right;
font-size: 16px;
font-style: normal;
font-weight: 300;

display:flex;
justify-content:center;
align-items:center;
padding-top:2px;
}
`;