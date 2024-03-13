import { BrowserRouter, Route, Routes } from "react-router-dom";
import Test from "./pages/Test";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<Test/>}/>
          <Route/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
