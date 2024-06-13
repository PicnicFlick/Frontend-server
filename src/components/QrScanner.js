import { Scanner } from "@yudiel/react-qr-scanner";
import { useNavigate } from "react-router-dom";

function QrScanner() {

    return (
        <Scanner
            onResult={(text, result) => {
                console.log("text, result:", text, result);
                sessionStorage.setItem('matId',text);
                window.location.href="1";
            }}
            onError={(error) => {
                console.log(error?.message);
            }}
        />
    );
}

export default QrScanner;
