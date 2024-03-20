import { BrowserRouter, Route, Routes } from "react-router-dom";
import Test from "./pages/Test";
import Home from "./pages/Home";
import MyPage from "./pages/Menu/MyPage";
import GlobalStyles from "./GlobalStyles";
import LoginHandeler from "./components/LiginHandeler";


function App() {
  return (
    <div>
      <BrowserRouter>
        <GlobalStyles/>
        <Routes>
          <Route path="" element={<Home/>}/>
          <Route path="test" element={<Test/>}/>
          <Route path="my_page" element = {<MyPage/>}/>
          <Route path= "/login/oauth2/callback/kakao" element={<LoginHandeler/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
