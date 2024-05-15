import { Footer } from "components/MenuBar";
import TopFixedBar, { TopFixedBar_Blank } from "components/TopFixedBar";
import { WidthBlock, Wrapper } from "pages/Home";
import styled from "styled-components";

import kakaoChannel from 'assets/images/Channel.png';

function ServiceCenter() {

    return (
        <Wrapper>
            <WidthBlock_ServiceCenter>
                <TopFixedBar text="고객센터" />
                <TopFixedBar_Blank />
                <KaKaoChannel src={kakaoChannel} />
                <h3>
                    저희 피크닉플릭은 카카오채널을 통해서<br />
                    문의 및 상담을 받고 있습니다.
                </h3>
                <button
                onClick={()=>window.open('https://open.kakao.com/o/gFLdyPrg')}>
                    피크닉플릭 채널 추가하기 +
                </button>
            </WidthBlock_ServiceCenter>
            <Footer>
                <h2>
                    스마트 돗자리 대여서비스
                </h2>
                <h1>
                    피크닉플릭
                </h1>
            </Footer>
        </Wrapper>
    )
}

export default ServiceCenter;

const KaKaoChannel = styled.img`
width:200px;
height:200px;
margin-top:84px;
margin-bottom:12px;
`;
const WidthBlock_ServiceCenter = styled(WidthBlock)`
h3{
    width:320px;
    color: var(--kakao-logo, #000);
    text-align: center;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px; /* 150% */
    letter-spacing: -0.333px;

    margin-bottom:52px;
}
button{
    width: 280px;
    height: 60px;
    flex-shrink: 0;
    border-radius: 30px;
    background: #FD0;

    color: var(--kakao-logo, #000);
    text-align: center;
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 30px; /* 150% */
    letter-spacing: -0.333px;
}
`;