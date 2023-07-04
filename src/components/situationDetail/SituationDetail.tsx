import { Link } from 'react-router-dom';
//import { useNavigate } from "react-router-dom";

import { Root } from '../../types/SituationTypes';

import pls from '../../assets/images/pls-1.jpg';
import call112 from '../../assets/images/Appel112.svg';

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
		// <div className="box_details"></div>
		<div className="box_details">
			<div className="detail-presentation">
				<div className="box-detail">
					<h2 style={{ paddingBottom: 10, fontWeight: 'bold', fontSize: 30 }}>
						Titre de la situation
					</h2>
					<div className="box-title">
						<p>{situation.situation.title}</p>
					</div>
					<h2 style={{ paddingBottom: 10, fontWeight: 'bold', fontSize: 30 }}>
						Description de la situation
					</h2>
					<div className="box-info">
						<p>{situation.situation.description}</p>
					</div>
				</div>
				<div>
					<img src={pls} alt={situation.situation.title} className="box-img" />
				</div>
			</div>
			<div>
				<Link to={'/simulation/' + situation._id}>
					<img
						src={call112}
						alt={situation.situation.title}
						style={{ borderRadius: '50%', width: 150 }}
					/>
				</Link>
			</div>
			<div className="vectors-img">
				<img className="vectors-img-left" src={Vector_2} alt="Vector 2" />
				<img className="vectors-img-right" src={Vector_1} alt="Vector 1" />
			</div>
		</div>
	);
};

export default SituationDetail;
