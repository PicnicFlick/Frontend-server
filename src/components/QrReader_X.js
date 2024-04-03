import { Flex } from 'pages/Home';
import Quagga from 'quagga'; // ES6
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

function QrReader(){
    const videoRef = useRef(null);
    const [detected, setDetected] = useState(false);


    useEffect(()=>{
        if(!detected)
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

              Quagga.onDetected((data)=>{
                if(!detected && data)
                {
                    console.log("detected!",data)
                    setDetected(true);
                }
              })
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
width:100%;
height:100%;
border:2px solid teal;
`;