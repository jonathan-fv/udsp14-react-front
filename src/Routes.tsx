import {Route, Routes} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SituationPage from "./pages/SituationPage";
import AudioPage from "./pages/AudioPage";
import Home from "./pages/Home";

const MainRoute = () => {
    return (
      <Routes>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/situation' element={<SituationPage />}/>
          <Route path='/audio' element={<AudioPage />}/>
          <Route path="/" element={<Home/>} />
      </Routes>
    );
}

export default MainRoute;