import Login from '../components/login/Login';
import LogoUDPS from '../assets/images/Logo_UDPS14.png';

const LoginPage = () => {
	return (
		<div className="h-[100vh] bg-[#051949]">
			<div className="bg-white w-[100vw]">
				<img src={LogoUDPS} alt="Logo UDPS" className="w-1/12 mx-auto" />
			</div>
			<Login />
		</div>
	);
};

export default LoginPage;
