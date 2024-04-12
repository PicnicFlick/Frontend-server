import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

function PaymentLoading() {
    const navigate = useNavigate();
    const location = useLocation(); // To access query parameters from URL

    useEffect(() => {
        // Function to initiate the payment process
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
                // Redirect to external payment URL
                window.location.href = response.data.next_redirect_pc_url;
            } catch (error) {
                console.error('Payment initiation failed:', error);
            }
        };

        // Function to handle the redirect back from the payment gateway
        const handlePaymentSuccess = () => {
            // Extract payment data from URL parameters if available
            const urlParams = new URLSearchParams(window.location.search);
            const pgToken = urlParams.get('pg_token');

            if (pgToken) {
                console.log("Payment success with pg_token:", pgToken);
                // Now you can send pgToken to your backend to verify the payment or get the payment details
                
                // Here's where you would navigate back to /lental/3 and send the payment data
                // Assuming you want to send the payment data to Lental_3 component:
                navigate('/lental/3', { state: { pgToken: pgToken } });
            } else {
                // If pgToken is not in the URL, we initiate the payment
                initiatePayment();
            }
        };

        handlePaymentSuccess();
    }, [navigate]);

    // Render loading page while waiting for payment to process or redirect
    return (
        <div>결제 로딩 페이지 입니다</div>
    );
}

export default PaymentLoading;
