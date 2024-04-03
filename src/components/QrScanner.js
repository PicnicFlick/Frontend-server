import { Scanner } from "@yudiel/react-qr-scanner";
import styled from "styled-components";

function QrScanner() {

    return (
        <Scanner
            onResult={(text, result) => {
                console.log("text, result:", text, result)
            }
            }
            onError={(error) => {
                console.log(error?.message)
            }
            }
        />
    );
};
export default QrScanner;

