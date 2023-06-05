import {Route, Routes} from "react-router-dom";
import LoginPage from "./pages/LoginPage";

const MainRoute = () => {
    return (
      <Routes>
          <Route path='/login' element={<LoginPage/>}/>
      </Routes>
    );
}

export default MainRoute;