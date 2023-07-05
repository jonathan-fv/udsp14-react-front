import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { Root } from '../../types/SituationTypes';

import call112 from '../../assets/images/Appel112.svg';
//import AudioPlayer from '../question/AudioQuestions';
import ShowMedia from '../showMedia/ShowMedia';

import Vector_1 from '../../assets/images/Vector_1.svg';
import Vector_2 from '../../assets/images/Vector_2.svg';

import './SituationDetail.css';

type Props = {
	situation: Root;
};

const SituationDetail = (props: Props) => {
	const [currentQuestion, setCurrentQuestion] = useState<string>();

	const onClick = (answerTarget: string) => {
		setCurrentQuestion(answerTarget);
	};

	const navigate = useNavigate();
	const { situation } = props;

	const clickButton112 = () => {
		navigate("/simulation/" + situation._id)
	}
	

	return (
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
					{
						situation.flow.map(({id, type, label, targets, media}) => {
							return (
								(currentQuestion ? id === currentQuestion : type === 'initial') && (
									<ShowMedia 
										media={media}
										onClick={onClick}
										flow={situation.flow}
										id={id}
										type={type}
										label={label}
										targets={targets}
									/>
								)
							);
						})

						// situation.flow.map((name) => {
						// 	<img src={situation.flow.name} alt={situation.flow[0].media[0].name} className="box-img" />
						// })
					}
				</div>
			</div>

			<img className="button-112" src={call112} alt="Boutton 112" onClick={clickButton112} />

			<div className="vectors-img">
				<img className="vectors-img-left" src={Vector_2} alt="Vector 2" />
				<img className="vectors-img-right" src={Vector_1} alt="Vector 1" />
			</div>
		</div>
	);
};

export default SituationDetail;
