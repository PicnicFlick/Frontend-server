import Kakao from 'assets/images/kakao_login_medium_wide.png';
export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&response_type=code`;

function KakaoLogin()
{
    const handleLogin = ()=>{
        window.location.href = KAKAO_AUTH_URL;
    }
    // https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code

    return(
    <>
        <img onClick={handleLogin} src={Kakao} />
    </>
    )
}

export default KakaoLogin
