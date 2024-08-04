import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Test from './pages/Test';
import Home from './pages/Home';
import MyPage from './pages/Menu/MyPage';
import GlobalStyles from './GlobalStyles';
import LoginHandeler from './components/LoginHandeler';

//대여하기
import LentalRoot from 'pages/Lental/LentalRoot';
import Lental1 from './pages/Lental/Lental1';
import Lental2 from './pages/Lental/Lental2';
import LentalQR from 'pages/Lental/LentalQR';
import LentalStart from 'pages/Lental/LentalStart';
import LentalFinal from 'pages/Lental/LentalFinal';

//반납하기
import ReturnRoot from 'pages/Return/ReturnRoot';
import ReturnStart from 'pages/Return/ReturnStart';
import ReturnQR from 'pages/Return/ReturnQR';
import RefundLoading from 'pages/Return/RefundLoding';

//회원관련
import Login from 'pages/Login';
import Lental3 from 'pages/Lental/Lental3';
import PaymentLoading from 'pages/Lental/PaymentLoading';
import MyPageHistory from 'pages/Menu/MyPageHistory';
import MyPageHistoryDetail from 'pages/Menu/MyPageHistoryDetail';
import MyPageRevise from 'pages/Menu/MyPageRevise';
import AuthLogin from 'pages/Auth/AuthLogin';
import AuthSelection from 'pages/Auth/AuthSelection';
import AuthItem from 'pages/Auth/AuthItem';
import AuthHistory from 'pages/Auth/AuthHistory';
import UseWay from 'pages/Menu/UseWay';
import ServiceCenter from 'pages/Menu/ServiceCenter';
import ReturnFinal from 'pages/Return/ReturnFinal';

function App() {
    return (
        <div>
            <BrowserRouter>
                <GlobalStyles />
                <Routes>
                    <Route path="" element={<Home />} />

                    <Route path="test" element={<Test />} />

                    <Route path="login" element={<Login />} />
                    <Route
                        path="/login/oauth2/callback/kakao"
                        element={<LoginHandeler />}
                    />
                    <Route path="/my_page" element={<MyPage />} />
                    <Route path="/my_page/revise" element={<MyPageRevise />} />
                    <Route
                        path="/my_page/history"
                        element={<MyPageHistory />}
                    />
                    <Route
                        path="/my_page/history/:id"
                        element={<MyPageHistoryDetail />}
                    />
                    <Route path="/useWay" element={<UseWay />} />
                    <Route path="/serviceCenter" element={<ServiceCenter />} />
                    {/* redirect_url*/}

                    <Route path="lental" element={<LentalRoot />}>
                        <Route path="start" element={<LentalStart />} />
                        <Route path="qr" element={<LentalQR />} />
                        <Route path="1" element={<Lental1 />} />
                        <Route path="2" element={<Lental2 />} />
                        <Route
                            path="payment-loading"
                            element={<PaymentLoading />}
                        />
                        <Route path="3" element={<Lental3 />} />
                        <Route path="final" element={<LentalFinal />} />
                    </Route>

                    <Route path="return" element={<ReturnRoot />}>
                        <Route path="start" element={<ReturnStart />} />
                        <Route path="qr" element={<ReturnQR />} />
                        <Route
                            path="refund-loading"
                            element={<RefundLoading />}
                        />

                        <Route path="final" element={<ReturnFinal />} />
                    </Route>

                    <Route path="auth/login" element={<AuthLogin />} />
                    <Route path="auth/selection" element={<AuthSelection />} />
                    <Route path="auth/item" element={<AuthItem />} />
                    <Route path="auth/history" element={<AuthHistory />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
