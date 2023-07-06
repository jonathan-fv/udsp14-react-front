import { Flow, MediaType } from '../../types/SituationTypes';
import './Question.css';
import './Answer.css';
import pls from '../../assets/images/pls-1.jpg';
import AudioPlayer from '../../components/ManageSituation/CustomNodes/AudioPlayer'
//@ts-ignore
//import AudioTest from '../../assets/audio/audiotest.mp3';
import { Link } from 'react-router-dom';

import Footer from '../footer/Footer';
import {useEffect} from "react";

type Props = {
	id: string;
	type: string;
	label: string;
	targets: Array<string>;
	flow: Flow[];
	media: MediaType[];
	onClick: (answerTarget: string) => void;
};

const Answer = (props: Props) => {
	const { type, label, targets, flow, media, onClick } = props;
	let sound: string | null = null
	let image: string | null = null

	media.forEach((m) => {
		if(m.type === 'sound') {
			sound = m.url
		}
		if (m.type === 'image') {
			image = m.url
		}
	})

	//console.log(media)
	return (
		<div className="box-mediaA">
			<div className="detail-presentationQ">
				<div className="media-container">
							{<div>
								<img className='imgShowMedia' src={image ? image : pls} alt="" />
							</div>}

							<h1 className=" p-4  text-4xl text-center">{label}</h1>

							{sound &&
									<AudioPlayer source={sound} color="white" autoPlay={true}/>
							}
				</div>
			</div>
			<div className="answer-box">
			{targets.map((answer) => {
				return (
					<div className="button-answer">
					{flow.map((x) => {
						return (
							answer === x.id && (
								<button style={{width: '100%', height: '100%'}} onClick={() => onClick(x.targets[0])}>
									{x.label}
								</button>
							)
						);
						})}
					</div>
				);
			})}
			</div>

			{type === 'final' && (
				<div className="detail-presentationQ flex justify-center items-center">
						<Link className="bg-gray-100 hover:bg-gray-300 shadow-lg shadow-black-500/50 tracking-wide uppercase font-bold text-center p-5 m-5 text-sm button-answer flex justify-center items-center" to="/">Retour à l'accueil</Link>
				</div>
			)}

			
		</div>
	);
};

export default Answer;
