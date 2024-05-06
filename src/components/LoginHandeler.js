import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


function LoginHandeler(props){
// 인가코드 백으로 보내는 작업 하는곳
const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get("code");
console.log(code);

//인가코드 백으로 보내는 코드
useEffect(() => {
  const kakaoLogin = async () => {
    if (!code) return;
    console.log("인가코드 : ", code);
    try {
      const res = await axios({
        method: "POST",
        url: `http://54.180.208.134:8080/api/v1/login/oauth2/code/kakao?code=${code}`,
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          "Access-Control-Allow-Origin": "*",
        },
      });
      // 성공 처리
      console.log(res);

      const accessToken = res.data.result.tokenInfoResponseDto.accessToken;
      const refreshToken = res.data.result.tokenInfoResponseDto.refreshToken;
      const name = res.data.result.name;
      const email = res.data.result.email;
      const socialId = res.data.result.socialId;

      

      console.log("accessToken : " + accessToken);
      console.log("refreshToken : " + refreshToken);
      console.log("name, email, socialId : ", name, email, socialId);
      sessionStorage.setItem('token', accessToken);//'get'이 아니라 'set',,,
      sessionStorage.setItem('refreshtoken', refreshToken);
      sessionStorage.setItem('name', name);
      sessionStorage.setItem('email', email);

      alert('성공적으로 로그인 했습니다');

      navigate("/"); // 로그인 성공 후 메인화면으로 이동

      //sessionStorage.setItem("name", res.data.account.profile_nickname);

    } catch (error) {
      // 오류 처리
      console.error('로그인 과정에서 오류', error);
      // 여기서 error 객체를 함께 출력하여 오류의 상세 내용을 파악할 수 있음
    }
  };

  kakaoLogin();
}, [code]); // code가 변경될 때만 함수를 실행하도록 의존성 배열에 추가

  return (
    <div className="LoginHandeler">
      <div className="notice">
        <p>로그인 중입니다.</p>
        <p>잠시만 기다려주세요.</p>
        <div className="spinner"></div>
      </div>
    </div>
  );
};
    
export default LoginHandeler;