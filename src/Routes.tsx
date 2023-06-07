import {Route, Routes} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SituationPage from "./pages/SituationPage";
import AudioPage from "./pages/AudioPage";
import Home from "./pages/Home";
import CreateSituationPage from "./pages/CreateSituationPage";

const MainRoute = () => {
  return (
    <Routes>
      <Route element={<FrontLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path='/situation' element={<SituationPage />}/>
        <Route path='/audio' element={<AudioPage />}/>
      </Route>
      <Route path={'/administration'} element={<BackLayout />}>
        <Route path='create-situation' element={<CreateSituationPage />}/>
      </Route>
    </Routes>
  );
}

export default MainRoute;