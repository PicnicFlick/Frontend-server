import TopFixedBar from "../../components/TopFixedBar";
import { WidthBlock, Wrapper } from "../Home";

function MyPage(){
    return(
        <Wrapper>
            <WidthBlock>
                <TopFixedBar text="마이페이지"/>
            </WidthBlock>
        </Wrapper>
    )
}

export default MyPage;