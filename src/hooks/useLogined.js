import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useLogined = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (sessionStorage.getItem('token') == null) {
            alert('로그인이 필요한 서비스입니다!');
            navigate('/login');
            console.log('useLogined');
        }
    }, []);
};

//훅 사용법 => useEffect도 필수
