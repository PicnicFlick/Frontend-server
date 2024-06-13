import { Scanner } from "@yudiel/react-qr-scanner";
import { useNavigate } from "react-router-dom";

function QrScanner() {
    const navigate = useNavigate();

    return (
        <Scanner
            onResult={(text, result) => {
                console.log("text, result:", text, result);
                if (text) {
                    sessionStorage.setItem('matId',text);
                    window.location.href='https://picnicflick.store/lental/1';
                }
            }}
            onError={(error) => {
                console.log(error?.message);
            }}
        />
    );
}

export default QrScanner;
