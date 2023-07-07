import {Outlet, useLocation, useNavigate} from 'react-router-dom';
import React from 'react';
import NavBar from '../navbar/NavBar';
import Footer from "../footer/Footer";

const FrontLayout = () => {
	const loc = useLocation()
	return (
		<>
			<header>
				<NavBar />
			</header>
			<Outlet />
			{
				loc.pathname !== '/' && <Footer />
			}
		</>
	);
};

export default FrontLayout;
