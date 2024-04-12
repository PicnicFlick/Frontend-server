import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

function PaymentLoading() {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const initiatePayment = async () => {
            try {
                const response = await axios.post('http://13.124.95.110:8080/payment/ready', {
                    "quantity": 1,
                    "total_amount": 10
                });
                console.log(response.data);
                console.log(response.data.next_redirect_pc_url);//요거
                const next_redirect_pc_url = response.data.next_redirect_pc_url;
                console.log("next_redirect_pc_url : " + next_redirect_pc_url);
                window.location.href = response.data.next_redirect_pc_url;
            } catch (error) {
                console.error('Payment initiation failed:', error);
            }
        };

        const handlePaymentSuccess = () => {
            const urlParams = new URLSearchParams(window.location.search);
            const pgToken = urlParams.get('pg_token');

            if (pgToken) {
                console.log("Payment success with pg_token:", pgToken);
                
                navigate('/lental/3', { state: { pgToken: pgToken } });
            } else {
                initiatePayment();
            }
        };

        handlePaymentSuccess();
    }, [navigate]);

    return (
        <div>결제 로딩 페이지 입니다</div>
    );
}

export default PaymentLoading;
