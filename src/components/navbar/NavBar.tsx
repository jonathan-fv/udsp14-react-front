import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
	return (
		<div className="nav-bar">
			<nav className="bg-gray-800">
				<div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
					<div className="relative flex h-16 items-center justify-between">
						<div className="flex items-center justify-center">
							<div className="flex items-center">
								<Link
									to="/"
									className="text-white ml-2 text-4xl font-bold text-transparent tracking-wider logo-link"
								>
									UDSP14{' '}
								</Link>
							</div>
						</div>
						<div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
							<button
								type="button"
								className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
							>
								<span className="sr-only">View notifications</span>
								{/* <Link
									to="/login"
									className="block rounded py-2 pr-4 pl-3 text-white"
									aria-current="page"
								>
									Connexion
								</Link> */}
							</button>
						</div>
					</div>
				</div>
			</nav>
		</div>
	);
};

export default NavBar;
