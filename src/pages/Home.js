import styled, { keyframes } from "styled-components";

import logo from 'assets/images/Logo.png';
import menu from 'assets/images/Menu.svg';
import x from 'assets/images/X.png';
import next from 'assets/images/Next.png';
import gps from 'assets/images/Gps.svg';

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PLACESINFO } from "consts/places";
import MarkerInfo from "components/MarkerInfo";
import axios from "axios";
import MenuBar from "components/MenuBar";
import NaverMap, { locations } from "components/NaverMap";

export const VH = window.innerHeight;
export const QRHEIGHT = 72;
const TOPBARHEIGHT = 48;

function Home() {
    const navigate = useNavigate();

    const [locationLatitude,setLocationLatitude] = useState(locations[0].latitude);
    const [locationLongitude,setLocationLongitude] = useState(locations[0].longitude);
    const [gpsLatitude,setGpsLatitude]=useState();
    const [gpsLongitude,setGpsLongitude]=useState();
    const [gpsLoading,setGpsLoading]=useState(false);

    const [state,setState]=useState("");
    const [stateTexts,setStateTexts]=useState([]);

    const [showPopUp, setShowPopUp] = useState(true);
    const [showMenu, setShowMenu] = useState(false);
    const [showInfo, setShowInfo] = useState(false);

    const [infoIndex, setInfoIndex] = useState();
    const [menuLeft, setMenuLeft] = useState('100%');
   
    const [placeInfo, setPlaceInfo] = useState();

    const onClick_loginCheck = () => {
        if (!sessionStorage.getItem('token')) {
            alert('로그인이 필요한 서비스입니다.');
            navigate('/login')
        }
    }

    const onClick_showPopUp = () => {
        setShowPopUp(prev => !prev);
        console.log("showPopUp", showPopUp);
        console.log()
    }
    
    const onClick_menu = () => {
        setShowMenu(true);
    }

    const goToLentalStart = () => {
        navigate('/lental/start');
    }

    const goToReturnStart = () => {
        navigate('/return/start');
    }

    const fetchLocation = async () => {
        const token = sessionStorage.getItem('token');
        const placeId = infoIndex + 1;
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_BACK_API}/api/v1/mat`,
                {
                    headers: {
                        Authorization: token
                    },
                    params: {
                        placeId: placeId
                    },
                })
            console.log(response.data);
            setPlaceInfo(
                {
                    name: PLACESINFO[infoIndex].name,
                    thumbnail: PLACESINFO[infoIndex].thumbnail,
                    availableCount: response.data.result.availableCount
                }
            );
        } catch (error) {
            console.log(error);
        }
    }

    const fetchState = async() => {
        const token = sessionStorage.getItem('token');
        //console.log('token',token);
        try{
            const response = await axios.get(
                `${process.env.REACT_APP_BACK_API}/api/v1/history/recent`,
                {
                    headers:{
                        Authorization:token
                    }
                }
            )
            setState(response.data.result);
            console.log('fetchState',response.data);
        }catch(error){
            console.log(error);
        }
    }

    const onClick_fetchGps = () => {
        setGpsLoading(true);
        navigator.geolocation.getCurrentPosition((position) => {
          console.log(position);
          setGpsLatitude(position.coords.latitude);
          setGpsLongitude(position.coords.longitude);
          setLocationLatitude(position.coords.latitude);
          setLocationLongitude(position.coords.longitude);
          setGpsLoading(false);
        });
    }

    useEffect(() => {
        if (showMenu)
            setMenuLeft("40%");
    }, [showMenu]);

    useEffect(() => {
        if (showInfo) {
            fetchLocation();
        }
    }, [showInfo])
    
    useEffect(()=>{
        if(sessionStorage.getItem('token'))
            fetchState();
    },[])
    useEffect(()=>{
        if(state==='NOT_RETURNED')
            setStateTexts(['현재','대여중','인 돗자리가 있습니다.'])
        else if(state==='RETURNED')
            setStateTexts(['현재 돗자리를', '대여중','입니다.'])
        else if(state==='LATE_RETURNED')
            setStateTexts(['현재','반납되지 않은 돗자리','가 있습니다.'])
    },[state])

    return (
        <Wrapper>
            <WidthBlock>
                {showMenu
                    &&
                    <div>
                        <MenuBar
                            left={menuLeft}
                            setMenuLeft={setMenuLeft}
                            setShowMenu={setShowMenu} />
                        <BlackScreen />
                    </div>
                }

                <TopBar>
                    <img style={{ width: '100px', height: '22px' }} loading="lazy" src={logo} />
                    <img src={menu} onClick={onClick_menu} />
                </TopBar>

                <NaverMap
                    showMenu={showMenu}
                    setInfoIndex={setInfoIndex}
                    showInfo={showInfo}
                    setShowInfo={setShowInfo}
                    height={VH - QRHEIGHT - TOPBARHEIGHT}
                    gpsLatitude={gpsLatitude}
                    gpsLongitude={gpsLongitude}
                    locationLatitude={locationLatitude}
                    locationLongitude={locationLongitude}
                    gpsLoading={gpsLoading} />

                <QRBar onClick={onClick_loginCheck}>
                    <h1 onClick={goToLentalStart}>대여하기</h1>
                    <h2 onClick={goToReturnStart}>반납하기</h2>
                </QRBar>

                <GpsBtn onClick={onClick_fetchGps}>
                    {gpsLoading
                    ? <GpsLoader/>
                    : <img src={gps}/>
                    }
                   
                </GpsBtn>
                {showPopUp &&
                    (sessionStorage.getItem('token') === null
                        ?
                        <WarningBar returned={true}>
                            <X src={x} onClick={onClick_showPopUp} />
                            서비스를 이용을 위해&nbsp;
                            <span onClick={()=>navigate('/login')}>
                                로그인
                            </span>
                            을 해주세요
                            <Next onClick={()=>navigate('/login')} src={next} />
                        </WarningBar>
                        : 
                        <WarningBar returned={state !== "LATE_RETURNED"}>
                            <X src={x} onClick={onClick_showPopUp} />
                            {stateTexts[0]}&nbsp;
                            <span onClick={()=>navigate('/my_page/history')}>
                                {stateTexts[1]}
                            </span>
                            {stateTexts[2]}
                            <Next onClick={()=>navigate('/my_page/history')} src={next} />
                        </WarningBar>
                        

                    )
                    // 중첩조건문할 때는 괄호 사용
                }
                {
                    (showInfo)
                    &&
                    <MarkerInfo
                        placeInfo={placeInfo}
                        setShowInfo={setShowInfo} />
                }

            </WidthBlock>
        </Wrapper>
    )
}

export default Home;

export const Flex = styled.div`
display:flex;
justify-content:center;
align-items:center;
`;

export const Wrapper = styled(Flex)`
width:100vw;
min-height: 100vh;
@media screen and (max-width:450px){
    min-height: -webkit-fill-available; 
}
overflow:hidden;
`;

export const WidthBlock = styled(Flex)`
position:relative;
width:100%;
min-height: 100vh;

@media screen and (max-width:450px){
    min-height: -webkit-fill-available; 
}
@media screen and (min-width:450px){
    width:400px;
    border-left:2px solid #E6EAED;
    border-right:2px solid #E6EAED;
}

flex-direction:column;
justify-content:flex-start;

overflow:hidden;
`;

export const TopBar = styled(Flex)`
position:relative;

width: 100%;
height: ${TOPBARHEIGHT}px;
flex-shrink: 0;

background-color:#00D09E;

justify-content:space-between;
align-items:center;

padding:16px;

img{
    cursor:pointer;
}
`;


export const QRBar = styled(Flex)`
width:100%;
position:absolute;
bottom:0%;
z-index:10;

cursor:pointer;

h1{
width: 50%;
height: ${QRHEIGHT}px;
flex-shrink: 0;

background: #00D09E;

color: #FFF;
text-align: center;
font-size: 24px;
font-style: normal;
font-weight: 700;
line-height: 24px; /* 100% */
letter-spacing: -0.333px;

display:flex;
justify-content:center;
align-items:center;
}

h2{
width: 50%;
height: ${QRHEIGHT}px;
flex-shrink: 0;

background: #7A7A7A;

color: #FFF;
text-align: center;
font-size: 24px;
font-style: normal;
font-weight: 700;
line-height: 24px; /* 100% */
letter-spacing: -0.333px;

display:flex;
justify-content:center;
align-items:center;
}
`;


export const WarningBar = styled(Flex)`
position:absolute;
left:50%;
transform:translateX(-50%);
bottom:100px;

width: 80%;
height: 37px;
flex-shrink: 0;

background-color: #FFF;
filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));

border-radius:12px;

color: var(--kakao-logo, #000);
text-align: center;
font-size: 14px;
font-style: normal;
font-weight: 300;
line-height: 24px; /* 171.429% */
letter-spacing: -0.333px;

span{
    color: ${props=>props.returned ? '#00D09E' : '#F2771E'};
    font-size: 14px;
    cursor:pointer;
}
`;
export const X = styled.img`
position:absolute;
left:16px;
top:50%;
transform:translateY(-50%);

width:8px;
height:8px;

cursor:pointer;
`;
export const Next = styled.img`
position:absolute;
right:16px;
top:50%;
transform:translateY(-50%);

width:6px;
height:12px;

cursor:pointer;
`;

export const BlackScreen = styled.div`
position:absolute;
top:50%;
left:50%;
transform:translate(-50%,-50%);
width:100%;
min-height:100vh;
z-index:15;

background-color:rgba(0,0,0,0.5);
`;

const GpsBtn = styled.div`
position:absolute;
bottom:${QRHEIGHT + 24}px;
right: 24px;


width:50px;
height:50px;
border-radius:25px;
background-color:white;
box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);

cursor:pointer;

display:flex;
justify-content:center;
align-items:center;

img{
    width:32px;
    height:32px;
}
`;



const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const GpsLoader = styled.div`
    border: 4px solid rgba(0, 0, 0, 0.1);
    width: 28px;
    height: 28px;
    border-radius: 50%;
    border-left-color: #00D09E;
    animation: ${spin} 1s linear infinite;
    margin: auto;
    
`;