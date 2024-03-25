import { useEffect, useRef } from "react";
import styled from "styled-components";

function NaverMap({height, showMenu}){
const mapRef = useRef(null);
  const lat = 37.5293507;
  const lng = 127.0699562;

  
  useEffect(() => {
    const { naver } = window;
    if (mapRef.current && naver) {
      const location = new naver.maps.LatLng(lat, lng);

      const map = new naver.maps.Map(mapRef.current, {
        center: location,
        zoom: 17, // 지도 확대 정도
      });
      new naver.maps.Marker({
        position: location,
        map,
      });
    }
  }, []);


  return (
     <MapBoard height = {height} showMenu={showMenu} ref={mapRef}/>
  );
}

export default NaverMap;

export const MapBoard = styled.div`
position:relative;
display:block;
width:100%;
height:${props=>props.height}px;

${props=>props.showMenu && 'z-index:-10'};
`;