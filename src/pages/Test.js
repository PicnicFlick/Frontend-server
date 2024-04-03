import Camera from "components/Camera"
import KakaoLogin from "../components/KakaoLogin"
import { Flex } from "./Home"
import QrReader from "components/QrReader"

function Test(){
    return(
        <div>
            <Flex style={{flexDirection:'column'}}>
                카카오 로그인 테스트 화면 입니다~!!!
                <KakaoLogin/>
            </Flex>
            <br/>
            <QrReader/>
        </div>
    )

}
export default Test
