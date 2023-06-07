import {Route, Routes} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SituationPage from "./pages/SituationPage";
import AudioPage from "./pages/AudioPage";
import Home from "./pages/Home";
import CreateSituationPage from "./pages/CreateSituationPage";
import DashboardMenu from "./pages/DashboardMenu";
import FrontLayout from "./components/layouts/FrontLayout";
import BackLayout from "./components/layouts/BackLayout";

const MainRoute = () => {
  return (
    <Routes>
      <Route element={<FrontLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path='/situation/:id' element={<SituationPage />}/>
        <Route path='/audio' element={<AudioPage />}/>
      </Route>
      <Route path={'/administration'} element={<BackLayout />}>
        <Route path='dashboard' element={<DashboardMenu />}/>
        <Route path='create-situation' element={<CreateSituationPage />}/>
      </Route>
    </Routes>
  );
}

export default MainRoute;