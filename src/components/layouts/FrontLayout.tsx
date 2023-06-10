import { Outlet } from 'react-router-dom';
import React from 'react';
import NavBar from '../navbar/NavBar';

const FrontLayout = () => {
	return (
		<>
			<header>
				<NavBar />
			</header>
			<Outlet />
		</>
	);
};

export default FrontLayout;
