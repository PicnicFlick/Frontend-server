import KakaoLogin from "../components/KakaoLogin"
import { Flex } from "./Home"

function Test(){
    return(
        <div>
            <Flex style={{flexDirection:'column'}}>
                카카오 로그인 테스트 화면 입니다~!!!
                <KakaoLogin/>
            </Flex>
        </div>
    )

}
export default Test
