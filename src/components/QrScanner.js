import { Scanner } from "@yudiel/react-qr-scanner";

function QrScanner() {

    return (
        <StyledScanner
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


const StyledScanner = styled(Scanner)`
width:500px;
height:500px;
`;