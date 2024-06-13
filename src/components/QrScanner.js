import { Scanner } from "@yudiel/react-qr-scanner";
import { useNavigate } from "react-router-dom";

function QrScanner() {
    const navigate = useNavigate();

    return (
        <Scanner
            onResult={(text, result) => {
                console.log("text, result:", text, result);
                if (text) {
                    navigate('/lental/1', { state: { matId: text } });
                }
            }}
            onError={(error) => {
                console.log(error?.message);
            }}
        />
    );
}

export default QrScanner;
