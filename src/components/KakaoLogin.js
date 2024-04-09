import Kakao from 'assets/images/KakaoLogin.png';
export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&response_type=code`;

function KakaoLogin({className})
{
    const handleLogin = ()=>{
        window.location.href = KAKAO_AUTH_URL;
    }
    // https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code

    return(
        <img 
        className={className}
        style={{
            width:'336px',
            height:'57.2px',
            cursor:'pointer',
            objectFit:'cover',
            borderRadius:'20px'}}
        onClick={handleLogin} 
        src={Kakao} 
        />
    )
}

export default KakaoLogin
