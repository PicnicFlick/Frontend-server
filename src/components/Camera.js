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
    })

    return (
        <Flex>
            <CameraDisplay
                ref={videoRef}
                autoPlay="true"
                id="video"
                muted="true"
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



// const getCamera = async () => {

//     if (!navigator.mediaDevices) {
//         throw new Error("mediaDevices API unavailable.");
//     }

//     const devices = await navigator.mediaDevices.enumerateDevices();
//     const cameras = devices.filter(d => (d.kind === "videoinput"));
//     return cameras[0];

// };


// const setupCamera = () => {
//     getCamera()
//         .then(stream => {
//             console.log(stream); // 이제 camera 변수는 `Promise`가 아닌, 실제 카메라 정보를 담고 있습니다.

//             console.log("videoRef:", videoRef.current);
//             console.log("stream:", stream);
//             // videoRef.current.srcObject = stream;
//             // videoRef.current.play();
//         })
//         .catch(error => {
//             console.log("카메라 접근에 실패했습니다.", error)
//         })
// }
// useEffect(() => { setupCamera() }, [videoRef])