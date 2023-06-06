import React from "react";
import { Outlet } from "react-router-dom";

const BackLayout = () => {
	return (
		<>
			<Outlet />
		</>
	)
};

export default BackLayout;