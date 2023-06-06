import {Route, Routes} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import CreateSituationPage from "./pages/CreateSituationPage";

const MainRoute = () => {
    return (
      <Routes>
        <Route path='/login' element={<LoginPage />}/>
        <Route path='/test' element={<CreateSituationPage />}/>
      </Routes>
    );
}

export default MainRoute;