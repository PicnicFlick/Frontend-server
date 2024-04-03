import { useEffect, useRef, useState } from 'react';
import { BrowserMultiFormatReader, BarcodeFormat, DecodeHintType } from '@zxing/library';

function QrScanner(){
const [localStream, setLocalStream] = useState();
const Camera = useRef(null);
const hints = new Map();
const formats = [BarcodeFormat.QR_CODE, BarcodeFormat.DATA_MATRIX, BarcodeFormat.CODE_128, BarcodeFormat.CODABAR, BarcodeFormat.EAN_13, BarcodeFormat.EAN_8, BarcodeFormat.CODE_39, BarcodeFormat.CODE_93];
hints.set(DecodeHintType.POSSIBLE_FORMATS, formats);
const Scan = new BrowserMultiFormatReader(hints, 500);

useEffect(() => {
 navigator.mediaDevices.getUserMedia({
    video: { facingMode: { exact: "environment" } }, //후면
 })
   .then(stream => {
     console.log("stream:",stream);
     setLocalStream(stream);
   })
 return () => {
   Stop();
 }
}, []);
useEffect(() => {
 if (!Camera.current)
   return;
 if (localStream && Camera.current) {
   Scanning();
 }
 return () => {
   Stop();
 }
}, [localStream]);
const req = useRef();
const Scanning = async () => {
 // const t = await Scan.decodeOnce();
 console.log('scan');
 if (localStream && Camera.current) {
   try {
     const data = await Scan.decodeFromStream(localStream, Camera.current, (data, err) => {
       if (data) {
         setText(data.getText());
         // Scan.stopContinuousDecode();
       } else {
         setText("");
       }
     });
   } catch (error) {
     console.log(error);
   }
 }

}
const Stop = () => {
 if (localStream) {
   const vidTrack = localStream.getVideoTracks();
   vidTrack.forEach(track => {
     localStream.removeTrack(track);
   });
 }
}
const [text, setText] = useState('')
return (
 <div>
   <video
     ref={Camera}
     id="video"
   />
   <span>{text}</span>
 </div>
);
};
export default QrScanner;