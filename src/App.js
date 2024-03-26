import { BrowserRouter, Route, Routes } from "react-router-dom";
import Test from "./pages/Test";
import Home from "./pages/Home";
import MyPage from "./pages/Menu/MyPage";
import GlobalStyles from "./GlobalStyles";
import LoginHandeler from "./components/LiginHandeler";

//대여하기 
import LentalStart from "./pages/Lental/Lental_start";
import Lental1 from "./pages/Lental/Lental_2";
import Lental2 from "./pages/Lental/Lental_3";
import Lental3 from "./pages/Lental/Lental_start";
import LentalFinal from "./pages/Lental/Lental_final";



function App() {
  return (
    <div>
      <BrowserRouter>
        <GlobalStyles/>
        <Routes>
          <Route path="" element={<Home/>}/>
          <Route path="test" element={<Test/>}/>
          <Route path="my_page" element = {<MyPage/>}/>
          <Route path="/login/oauth2/callback/kakao" element={<LoginHandeler />} /> {/* redirect_url*/}
          <Route path="lental/start" element={<LentalStart/>}/>
          <Route path="lental/1" element={<Lental1/>}/>
          <Route path="lental/2" element={<Lental2/>}/>
          <Route path="lental/3" element={<Lental3/>}/>
          <Route path="lental/final" element={<LentalFinal/>}/>
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
