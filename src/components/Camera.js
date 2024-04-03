import jsQR from 'jsqr';
import { Flex } from 'pages/Home';
import { useEffect, useRef } from 'react';
import styled from 'styled-components';

function Camera() {
    const jsQR = require("jsqr");
    const videoRef = useRef(null);
    console.log("jsQR:", jsQR);


    useEffect(() => {
        navigator.mediaDevices.getUserMedia(
            { 
                audio: true, 
                video: {facingMode:"environment"}
            }
            )
            .then(stream => {
                console.log("미디어스트림:", stream);
                // 여기서 stream은 MediaStream 객체입니다.
                videoRef.current.srcObject = stream;
                videoRef.current.play();
            })
            .catch(error => {
                console.error('미디어 스트림을 얻는 데 실패했습니다:', error);
            });
    },[videoRef])

    return (
        <Flex>
            <CameraDisplay
                ref={videoRef}
                autoPlay="true"
                id="video"
                muted="true"
                playsinline
            />
        </Flex>

    )
}

export default Camera;

const CameraDisplay = styled.video`
width:500px;
height:500px;
border:2px solid teal;
`;



