import React, { useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

function RefundLoading() {
    const navigate = useNavigate();
    const location = useLocation();
    const matId = location.state?.matId;

    useEffect(() => {
        const initiateRefund = async () => {
            try {
                const accessToken = sessionStorage.getItem('token'); 
                if (!accessToken) {
                    throw new Error("No access token available.");
                }                console.log(accessToken);
                const response = await axios.post(`${process.env.REACT_APP_BACK_API}/api/v1/payment/refund`, {
                    "matId": matId,
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
                        //throw new Error('No redirect URL provided');
                    }
                })
                .catch(error => {
                    //console.error('Refund initiation failed:', error);
                    navigate('/return/start'); 
                });
                console.log("Response Data:", response.data);//****
                console.log("Response Headers:", response.headers);

                console.log(response.data);
                const next_redirect_pc_url = response.data.next_redirect_pc_url;
                if (next_redirect_pc_url) {
                    console.log("next_redirect_pc_url : " + next_redirect_pc_url);
                    window.location.href = next_redirect_pc_url;
                } else {
                    //throw new Error('No redirect URL provided');
                }
            } catch (error) {
                console.error('Payment initiation failed:', error);
                navigate('/return/start'); 
            }
        };

        const handleRefundSuccess = () => {
            console.log("handleRefundSuccess 핸들러에 들어옴!");
            const urlParams = new URLSearchParams(window.location.search);
            const pgToken = urlParams.get('pg_token');
            if (pgToken) {
                console.log("Refund success with pg_token:", pgToken);
                navigate('/return/final', { state: { pgToken: pgToken } });
            } else {
                initiateRefund();
            }
        };

        handleRefundSuccess();
    }, [navigate, matId]);

    return (
        <div>환불 로딩 페이지 입니다</div>
    );
}

export default RefundLoading;
