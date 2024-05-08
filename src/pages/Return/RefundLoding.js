import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function RefundLoading() {
    const navigate = useNavigate();

    useEffect(() => {
        const initiateRefund = async () => {
            try {
                const accessToken = sessionStorage.getItem('token'); // Make sure 'accessToken' is the correct key where the token is stored
                if (!accessToken) {
                    throw new Error("No access token available.");
                }                console.log(accessToken);
                const response = await axios.post('http://54.180.208.134:8080/api/v1/payment/refund', {
                    "matId": 2
                },{
                    headers:{
                        Authorization: `${accessToken}`
                    }
                }).then(response => {
                    const next_redirect_pc_url = response.data.next_redirect_pc_url;
                    if (next_redirect_pc_url) {
                        console.log("next_redirect_pc_url : " + next_redirect_pc_url);
                        window.location.href = next_redirect_pc_url;
                    } else {
                        throw new Error('No redirect URL provided');
                    }
                })
                .catch(error => {
                    console.error('Refund initiation failed:', error);
                    navigate('/error'); 
                });
                console.log("Response Data:", response.data);//****
                console.log("Response Headers:", response.headers);

                console.log(response.data);
                const next_redirect_pc_url = response.data.next_redirect_pc_url;
                if (next_redirect_pc_url) {
                    console.log("next_redirect_pc_url : " + next_redirect_pc_url);
                    window.location.href = next_redirect_pc_url;
                } else {
                    throw new Error('No redirect URL provided');
                }
            } catch (error) {
                console.error('Payment initiation failed:', error);
                navigate('/error'); 
            }
        };

        const handleRefundSuccess = () => {
            console.log("handleRefundSuccess 핸들러에 들어옴!");
            const urlParams = new URLSearchParams(window.location.search);
            const pgToken = urlParams.get('pg_token');
            if (pgToken) {
                console.log("Refund success with pg_token:", pgToken);
                navigate('/return/1', { state: { pgToken: pgToken } });
            } else {
                initiateRefund();
            }
        };

        handleRefundSuccess();
    }, [navigate]);

    return (
        <div>환불 로딩 페이지 입니다</div>
    );
}

export default RefundLoading;
