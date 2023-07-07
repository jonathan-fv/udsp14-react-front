import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SituationPage from './pages/SituationPage';
import SimulationPage from './pages/SimulationPage';
import Home from './pages/Home';
import CreateSituationPage from './pages/CreateSituationPage';
import DashboardMenu from './pages/DashboardMenu';
import DashboardSituations from './pages/DashboardSituations';
import FrontLayout from './components/layouts/FrontLayout';
import BackLayout from './components/layouts/BackLayout';
import Users from './pages/Users';
import EditSituationPage from './pages/EditSituationPage';

const MainRoute = () => {
	return (
		<Routes>
			<Route element={<FrontLayout />}>
				<Route path="/" element={<Home />} />
				<Route path="/situation/:id" element={<SituationPage />} />
				<Route path="/simulation/:id" element={<SimulationPage />} />
			</Route>
			<Route path={'/administration'}>
				<Route path="login" element={<LoginPage />} />
				<Route element={<BackLayout />}>
					<Route path="dashboard" element={<DashboardMenu />} />
					<Route path="situations" element={<DashboardSituations />} />
					<Route path="create-situation" element={<CreateSituationPage />} />
					<Route path="edit-situation/:id" element={<EditSituationPage />} />
					<Route path="users" element={<Users />} />
				</Route>
			</Route>
		</Routes>
	);
};

export default MainRoute;
