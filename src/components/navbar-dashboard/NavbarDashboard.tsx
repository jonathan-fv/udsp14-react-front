import { NavLink } from 'react-router-dom';
import API from '../../services/API';

const NavbarDashboard = () => {
	const navList = [
		{
			name: 'Nouvelle situation',
			path: 'create-situation',
		},
		{
			name: 'Situations',
			path: 'situations',
		},
		{
			name: 'Utilisateurs',
			path: 'users',
		},
	];

	const style = 'block py-2 pl-3 pr-4 rounded text-xl ';

	const logout = () => {
		API.post('auth/logout')
			.then(() => {
				window.location.href = '/administration/login';
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<nav className="bg-white w-full z-20 border-b-2 border-b-[#051949]">
			<div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
				<NavLink to="dashboard" className="flex items-center">
					<span className="self-center text-2xl font-semibold whitespace-nowrap text-[#051949]">
						Dashboard
					</span>
				</NavLink>
				<div
					className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
					id="navbar-sticky"
				>
					<ul className="flex flex-col bg-white p-4 md:p-0 mt-4 md:flex-row md:space-x-8 md:mt-0">
						{navList.map((item, index) => (
							<li key={index}>
								<NavLink
									to={item.path}
									className={({ isActive }) =>
										isActive
											? style +
											  'text-blue-700 underline underline-thickness-1 underline-offset-4'
											: style +
											  'text-[#051949] hover:text-blue-700 hover:transition-colors hover:underline hover:underline-thickness-1 hover:underline-offset-4'
									}
								>
									{item.name}
								</NavLink>
							</li>
						))}
						<li>
							<button
								className={style + 'text-red-700 hover:text-red-900'}
								onClick={logout}
							>
								Déconnexion
							</button>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default NavbarDashboard;
