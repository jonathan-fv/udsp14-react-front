import {Route, Routes} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SituationPage from "./pages/SituationPage";
import AudioPage from "./pages/AudioPage";
import Home from "./pages/Home";
import CreateSituationPage from "./pages/CreateSituationPage";
import BackLayout from "./components/layouts/BackLayout";
import FrontLayout from "./components/layouts/FrontLayout";

const MainRoute = () => {
    return (
      <Routes>
          <Route path='/situation' element={<SituationPage />}/>
          <Route path='/audio' element={<AudioPage />}/>
          <Route path="/" element={<Home/>} />
          <Route path='/login' element={<LoginPage />}/>
          <Route path='/test' element={<CreateSituationPage />}/>
      </Routes>
    );
}

export default MainRoute;