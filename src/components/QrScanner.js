import { Scanner } from "@yudiel/react-qr-scanner";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//@yudiel/react-qr/scanner => 최신 라이브러리 물어보고 공식문서 적극 활용

function QrScanner() {

    return (
        <Scanner
            onResult={(text, result) => {
                console.log("text, result:", text, result);
                window.location.href=text;
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

