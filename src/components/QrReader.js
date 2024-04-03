import { Flex } from 'pages/Home';
import Quagga from 'quagga'; // ES6
import { useEffect, useRef } from 'react';
import styled from 'styled-components';

function QrReader(){
    const videoRef = useRef(null);


    useEffect(()=>{
        Quagga.init({
            inputStream : {
              name : "Live",
              type : "LiveStream",
              target: videoRef.current
              //document.querySelector('#yourElement')    // Or '#yourElement' (optional)
            },
            decoder : {
              readers : ["code_128_reader"]
            }
          }, function(err) {
              if (err) {
                  console.log(err);
                  return
              }
              console.log("Initialization finished. Ready to start");
              Quagga.start();
          });
    },[videoRef])
    

      console.log("Quagga:",Quagga);
      return (
        <Flex>
            <CameraDisplay ref={videoRef} />
        </Flex>

    )
}

export default QrReader;


const CameraDisplay = styled.div`
width:600px;
height:600px;
border:2px solid teal;
`;