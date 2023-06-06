import {Route, Routes} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Home from "./pages/Home";

const MainRoute = () => {
    return (
      <Routes>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path="/" element={<Home/>} />
      </Routes>
    );
}

export default MainRoute;