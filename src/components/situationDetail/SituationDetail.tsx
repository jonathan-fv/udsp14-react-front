import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
		navigate('/simulation/' + situation._id);
	};

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
				<div className="box-media">
					{situation.flow.map(({ id, type, label, targets, media }) => {
						return (
							(currentQuestion
								? id === currentQuestion
								: type === 'initial') && (
								<ShowMedia
									key={id}
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
					})}
				</div>
			</div>

			<img
				className="button-112"
				src={Call_112}
				alt="112B"
				onClick={clickButton112}
			/>

			<Footer />
		</div>
	);
};

export default SituationDetail;
