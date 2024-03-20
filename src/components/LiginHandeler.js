import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

const LoginHandeler = (props) => {
// 인가코드 백으로 보내는 작업 하는곳
const navigate = useNavigate();
const code = new URL(window.location.href).searchParams.get("code");
console.log(code);
//인가코드 백으로 보내는 코드
  useEffect(() => {
    const kakaoLogin = async () => {
      axios({
        method: "GET",
        url: `${process.env.REACT_APP_REDIRECT_URI}?code=${code}`,
        // url: `${process.env.REACT_APP_REDIRECT_URI}/?code=${code}`,
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
      }).then((res) => {
        // 성공 처리
        console.log(res);
        localStorage.setItem("name", res.data.account.kakaoName);
        navigate("");
      }).catch((error) => {
        // 오류 처리
        console.error('로그인 과정에서오류');
      });

    };
    kakaoLogin();
  }, [props.history]);

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