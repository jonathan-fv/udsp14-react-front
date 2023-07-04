import { NavLink } from 'react-router-dom';

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

	const style =
		'block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700';

	return (
		<>
			<nav className="bg-white dark:bg-gray-900  w-full z-20 border-b border-gray-200 dark:border-gray-600">
				<div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
					<NavLink to="dashboard" className="flex items-center">
						<span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
							Dashboard
						</span>
					</NavLink>
					<div
						className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
						id="navbar-sticky"
					>
						<ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
							{navList.map((item, index) => (
								<li key={index}>
									<NavLink
										to={item.path}
										className={({ isActive }) =>
											isActive
												? style +
												  'bg-gray-100 md:bg-transparent md:text-blue-700 md:dark:text-blue-500 underline underline-thickness-1 underline-offset-4'
												: style
										}
									>
										{item.name}
									</NavLink>
								</li>
							))}
						</ul>
					</div>
				</div>
			</nav>
		</>
	);
};

export default NavbarDashboard;
