import styled from "styled-components"
import { Wrapper_Auth } from "./Auth_Login"
import Auth_Header from "components/Auth_Header"

function Auth_Item(){
    const text = "대여품 수량관리"

    return (
        <Wrapper_Auth>
            <Auth_Header text={text}/>
            <div>주영이가 작업할 곳2</div>
        </Wrapper_Auth>
    )
}

export default Auth_Item
