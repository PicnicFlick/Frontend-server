import { Scanner } from "@yudiel/react-qr-scanner";

function QrScanner() {

    return (
        <Scanner
            onScan={(result) => {
                if(result){
                    console.log("result.rawValue",result[0].rawValue);
                    sessionStorage.setItem('matId',result[0].rawValue);
                    window.location.href="1";
                }
            }}
            onError={(error) => {
                console.log('qr스캔 오류 발생 :',error?.message);
            }}
        />
    );
}

export default QrScanner;
