import './Login.css';
import API from '../../services/API';
import { useNavigate } from 'react-router-dom';

const Login = () => {
	const navigate = useNavigate();

	const submitLogin = (e: { preventDefault: () => void; target: any }) => {
		e.preventDefault();

		const form = e.target;
		const data = new FormData(form);

		const dataObject = {
			username: data.get('username'),
			password: data.get('password'),
		};

		API.post('/auth/login', dataObject)
			.then((res) => {
				if (res.data.IsAuth === true) {
					navigate('/administration/dashboard');
				}
			})
			.catch((e) => {
				console.log(e);
			});
	};

	return (
		<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0 h-[80vh]">
			<div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
				<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
					<h1 className="text-center text-xl font-bold text-[#051A49]">
						Connexion au compte
					</h1>
					<form className="space-y-4 md:space-y-6" onSubmit={submitLogin}>
						<div>
							<input
								type="username"
								name="username"
								id="username"
								className="bg-white placeholder-[#051A49] text-[#051A49] shadow-[#051A49] shadow-md w-full rounded-2xl p-3"
								placeholder="Votre email"
							/>
						</div>
						<div>
							<input
								type="password"
								name="password"
								id="password"
								placeholder="Votre mot de passe"
								className="bg-white placeholder-[#051A49] text-[#051A49] shadow-[#051A49] shadow-md w-full rounded-2xl p-3"
							/>
						</div>
						<button
							type="submit"
							className="w-full text-[#051A49] shadow-md shadow-red-600 rounded-2xl p-3 hover:bg-red-600 hover:text-white"
						>
							Connexion
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Login;
