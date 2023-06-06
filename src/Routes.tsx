import {Route, Routes} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SituationPage from "./pages/SituationPage";
import Home from "./pages/Home";

const MainRoute = () => {
    return (
      <Routes>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/situation' element={<SituationPage />}/>
          <Route path="/" element={<Home/>} />
      </Routes>
    );
}

export default MainRoute;