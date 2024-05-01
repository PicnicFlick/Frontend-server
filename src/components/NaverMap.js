import { useEffect, useRef } from "react";
import styled from "styled-components";

import marker from 'assets/images/Marker.svg';

function NaverMap({
  height, 
  showInfo, 
  setShowInfo, 
  showMenu,
  setInfoIndex
}){
  const mapRef = useRef(null);

  var markers=[];
  const markerStyle= "width:20px; height:20px; background-color:red; background-image:'../assets/images/Marker.png';"
  

  useEffect(() => {
    const { naver } = window;
    if (mapRef.current && naver) {
      const location = new naver.maps.LatLng(37.5293507, 127.0699562);

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
        position: new naver.maps.LatLng(37.5300000, 127.0690000),
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
        position: new naver.maps.LatLng(37.5290000, 127.0720000),
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

