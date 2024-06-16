import { Scanner } from "@yudiel/react-qr-scanner";

function QrScanner({mode}) {

    console.log('QrScanner Mode : ',mode);
    
    return (
        <Scanner
            onScan={(result) => {
                if(result){
                    console.log("result.rawValue",result[0].rawValue);
                    sessionStorage.setItem('matId',result[0].rawValue);
                    if(mode ==='lental')
                        window.location.href="1";
                    else
                        window.location.href="final";
                }
            }}
            onError={(error) => {
                console.log('qr스캔 오류 발생 :',error?.message);
            }}
        />
    );
}

export default QrScanner;
