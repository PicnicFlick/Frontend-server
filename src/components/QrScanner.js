import { Scanner } from "@yudiel/react-qr-scanner";

function QrScanner() {

    return (
        <Scanner
            onResult={(text, result) => {
                console.log('1');
                console.log("text, result:", text, result);
                sessionStorage.setItem('matId',text);
                window.location.href="1";
            }}
            onError={(error) => {
                console.log('qr스캔 오류 발생 :',error?.message);
            }}
        />
    );
}

export default QrScanner;
