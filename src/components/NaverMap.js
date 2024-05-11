import { useEffect, useRef } from "react";
import styled from "styled-components";

import marker from 'assets/images/Marker.svg';
import { useNavigate } from "react-router-dom";

export const locations = [
  {
    latitude:37.5293507, 
    longitude:127.0699562
  },
  {
    latitude:37.5300000, 
    longitude:127.0690000
  },
  {
    latitude:37.5290000,
    longitude: 127.072000
  },
]


function NaverMap({
  height, 
  showInfo, 
  setShowInfo, 
  showMenu,
  setInfoIndex
}){
  const navigate=useNavigate();
  const mapRef = useRef(null);

  var markers=[];
  const markerStyle= "width:20px; height:20px; background-color:red; background-image:'../assets/images/Marker.png';"
  

  useEffect(() => {
    const { naver } = window;
    if (mapRef.current && naver) {
      const location = new naver.maps.LatLng(locations[0].latitude,locations[0].longitude);

      const map = new naver.maps.Map(mapRef.current, {
        center: location,
        zoom: 17, // 지도 확대 정도
        minZoom: 17, //지도의 최소 줌 레벨
        zoomControl: false, //줌 컨트롤의 표시 여부
        zoomControlOptions: { //줌 컨트롤의 옵션
          position: naver.maps.Position.TOP_RIGHT
        }
      });
      markers[0] = new naver.maps.Marker({
        position: location,
        map: map,
        icon: {
          url: marker, //50, 68 크기의 원본 이미지
          size: new naver.maps.Size(24, 36),
          scaledSize: new naver.maps.Size(24, 36),
          origin: new naver.maps.Point(0, 0),
          anchor: new naver.maps.Point(12, 34)
      }
      });

      markers[1] = new naver.maps.Marker({
        position: new naver.maps.LatLng(locations[1].latitude,locations[1].longitude),
        map: map,
        icon: {
          url: marker, //50, 68 크기의 원본 이미지
          size: new naver.maps.Size(24, 36),
          scaledSize: new naver.maps.Size(24, 36),
          origin: new naver.maps.Point(0, 0),
          anchor: new naver.maps.Point(12, 34)
      }
        
      });

      markers[2] = new naver.maps.Marker({
        position: new naver.maps.LatLng(locations[2].latitude,locations[2].longitude),
        map: map,
        icon: {
          url: marker, //50, 68 크기의 원본 이미지
          size: new naver.maps.Size(24, 36),
          scaledSize: new naver.maps.Size(24, 36),
          origin: new naver.maps.Point(0, 0),
          anchor: new naver.maps.Point(12, 34)
      }
        
      });

      function getClickHandler(index) {
        return function(e) {
            if(!sessionStorage.getItem('token')){
                alert('로그인이 필요한 서비스입니다.');
                navigate('/login')
            }
              
            var marker = markers[index];
            console.log("Clicked!!:",index);
            setShowInfo(true);
            setInfoIndex(index);
        }
    }

      for(let i=0;i<3;i++)
        naver.maps.Event.addListener(markers[i], 'click', getClickHandler(i));

    }
  }, []);


  return (
     <MapBoard 
     height = {height} 
     showInfo = {showInfo}
     showMenu={showMenu} 
     ref={mapRef}/>
  );
}

export default NaverMap;

export const MapBoard = styled.div`
position:relative;
display:block;
width:100%;
height:${props=>props.height}px;

${props=>(props.showMenu || props.showInfo) && 'z-index:-10'};
`;

