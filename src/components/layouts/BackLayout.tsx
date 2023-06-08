import React from "react";
import { Outlet } from "react-router-dom";
import NavbarDashboard from "../navbar-dashboard/NavbarDashboard";

const BackLayout = () => {
	return (
		<>
			<header>
				<NavbarDashboard />
			</header>
			<Outlet />
		</>
	)
};

export default BackLayout;