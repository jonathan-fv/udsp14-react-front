import './Login.css';
import API from "../../services/API";

const Login = () => {
	const submitLogin = (e: { preventDefault: () => void; target: any; }) => {
		e.preventDefault();

		const form = e.target;
		const data = new FormData(form);

		const dataObject = {
			username: data.get('username'),
			password: data.get('password')
		}

		API.post('/auth/login', dataObject).then().catch((e)=>{console.log(e)})
	};

	return (
		<>
			<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
				<div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
					<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
						<h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
							Connexion au compte
						</h1>
						<form className="space-y-4 md:space-y-6" onSubmit={submitLogin}>
							<div>
								<input
									type="username"
									name="username"
									id="username"
									className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									placeholder="Votre email"
								/>
							</div>
							<div>
								<input
									type="password"
									name="password"
									id="password"
									placeholder="••••••••"
									className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								/>
							</div>
							<button
								type="submit"
								className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
							>
								Connexion
							</button>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export default Login;
