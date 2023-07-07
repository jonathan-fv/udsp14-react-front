import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Root } from '../../types/SituationTypes';
//import AudioPlayer from '../question/AudioQuestions';

import ShowMedia from '../showMedia/ShowMedia';

import Call_112 from '../../assets/images/Appel112.svg';

import Footer from '../footer/Footer';

import './SituationDetail.css';

type Props = {
	situation: Root;
};

const SituationDetail = (props: Props) => {
	const navigate = useNavigate();
	const { situation } = props;

	const [currentQuestion, setCurrentQuestion] = useState<string>();

	const onClick = (answerTarget: string) => {
		setCurrentQuestion(answerTarget);
	};

	const clickButton112 = () => {
		navigate("/simulation/" + situation._id)
	}
	let imageUrl = ''
	const image = situation.flow[0].media.map((e) => {
		if (e.type === 'image') {
			imageUrl = e.url
		}
		return imageUrl
	})

	return (
		<>
		<div className="box_details">
			<div className="detail-presentation">
				<div className="box-detail">
					<h2 className="box-detail-title">
						Titre de la situation
					</h2>
					<div className="box-title">
						<p>{situation.situation.title}</p>
					</div>
					<h2  className="box-detail-title">
						Description de la situation
					</h2>
					<div className="box-info">
						<p>{situation.situation.description}</p>
					</div>
				</div>
				<div style={{width: '50%'}} className='flex justify-center items-center'>
					<img src={imageUrl} alt=""/>
				</div>
			</div>

			<img className="button-112" src={Call_112} alt="112B" onClick={clickButton112} />

		</div>
	{/*<Footer />*/}
		</>

);
};

export default SituationDetail;
