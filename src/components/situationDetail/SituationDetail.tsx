import { Link } from 'react-router-dom';
//import { useNavigate } from "react-router-dom";

import { Root } from '../../types/SituationTypes';

import pls from '../../assets/images/pls-1.jpg';
import call112 from '../../assets/images/Appel112.svg';

import './SituationDetail.css';
import AudioPlayer from '../question/AudioQuestions';

type Props = {
	situation: Root;
};

const SituationDetail = (props: Props) => {
	const { situation } = props;

	/*const navigate = useNavigate();
	const handleGoBack = () => {
		navigate(-1);
	};*/

	return (
		// <div className="box_details"></div>
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				padding: 30,
			}}
		>
			{/* <h1 className="text-center uppercase text-xl m-5 font-bold ">
				{situation.situation.title}
			</h1>

			<div className="box_details_img flex m-2 flex-col flex-nowrap items-center justify-between sm:flex-row">
				<img
					src={pls}
					alt={situation.situation.title}
					className="rounded-md m-5"
				/>
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						gap: '50px',
						maxWidth: '50%',
						justifyContent: 'center',
					}}
				>
					<p className="text-justify">{situation.situation.description}</p>
					<div
						style={{
							display: 'flex',
							justifyContent: 'center',
						}}
					>
						<AudioPlayer />
					</div>
				</div>
			</div>
			<div className="bg-cyan-400 hover:bg-cyan-700 rounded-full flex justify-center text-4xl m-10 button_situation">
				<Link to={'/simulation/' + situation._id}>112</Link>
			</div>
			 */}
			<div
				style={{
					display: 'flex',
					gap: 200,
					marginBottom: 250,
					alignItems: 'center',
				}}
			>
				<div
					style={{
						border: '1px solid black',
						padding: 10,
						textAlign: 'justify',
						borderRadius: 10,
						maxWidth: 650,
						color: '#061849',
					}}
				>
					<h1 style={{ paddingBottom: 10, fontWeight: 'bold', fontSize: 30 }}>
						{situation.situation.title}
					</h1>
					<div
						style={{
							border: '1px solid black',
							padding: 15,
							borderRadius: 8,
							marginBottom: 10,
						}}
					>
						<p>Inconscience</p>
					</div>
					<h1 style={{ paddingBottom: 10, fontWeight: 'bold', fontSize: 30 }}>
						Description de la situation
					</h1>
					<div
						style={{
							border: '1px solid black',
							padding: 15,
							borderRadius: 8,
							overflow: 'scroll',
							height: 200,
							overflowX: 'hidden',
						}}
					>
						<p>{situation.situation.description}</p>
					</div>
				</div>
				<div>
					<img
						src={pls}
						alt={situation.situation.title}
						style={{
							borderRadius: 15,
							maxWidth: '576px',
							height: '300px',
							border: '1px solid red',
						}}
					/>
				</div>
			</div>
			<div>
				<img
					src={call112}
					alt={situation.situation.title}
					style={{ borderRadius: '50%', width: 150 }}
				/>
			</div>
		</div>
	);
};

export default SituationDetail;
