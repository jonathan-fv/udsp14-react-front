import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import NavbarDashboard from '../navbar-dashboard/NavbarDashboard';
import API from "../../services/API";

const BackLayout = () => {

	const navigate = useNavigate();

	API.get('/auth/login')
		.then(res => {
			if(res.data.IsAuth === false) {
				navigate('/administration/login');
			}
		})

	return (
		<>
			<header>
				<NavbarDashboard />
			</header>
			<Outlet />
		</>
	);
};

export default BackLayout;
