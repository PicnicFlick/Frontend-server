import { Scanner } from "@yudiel/react-qr-scanner";

function QrScanner(){

return (
 <div>
    <Scanner
            onResult={(text, result) => console.log(text, result)}
            onError={(error) => console.log(error?.message)}
    />
    "카메라 실행중"
 </div>
);
};
export default QrScanner;