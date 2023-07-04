import { Link } from 'react-router-dom';
//import { useNavigate } from "react-router-dom";

import { Root } from '../../types/SituationTypes';

import pls from '../../assets/images/pls-1.jpg';

import './SituationDetail.css';
import AudioPlayer from '../question/AudioQuestions';

import Vector_1 from '../../assets/images/Vector_1.svg';
import Vector_2 from '../../assets/images/Vector_2.svg';

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
		<div className="box_details">
			<h1 className="text-center uppercase text-xl m-5 font-bold ">
				{situation.situation.title}
			</h1>
			{/* <div className="img-box bg-gray-200 rounded-xl"></div> */}
			{/* <img
          src={situation.situation.image_path}
          alt={situation.situation.title}
          className=""
        /> */}
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

			{/* INIT Q-&-A */}
			<div className="bg-cyan-400 hover:bg-cyan-700 rounded-full flex justify-center text-4xl m-10 button_situation">
				<Link to={'/simulation/' + situation._id}>112</Link>
			</div>

			<div className="vectors-img">
				<img className="vectors-img-left" src={Vector_2} alt="Vector 2"/>
				<img className="vectors-img-right" src={Vector_1} alt="Vector 1"/>
			</div>
		</div>
	);
};

export default SituationDetail;
