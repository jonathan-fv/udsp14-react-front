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

	console.log(image)
	console.log(sound)
	//console.log(media)
	return (
		<div className="box-mediaA">
			<div className="detail-presentationQ">
				<h1 className="text-2xl text-center">{label}</h1>
				<div className="media-container">

						<div >
							{<div>
								<img className='imgShowMedia' src={image ? image : pls} alt="" />
							</div>}

							{sound &&
									<AudioPlayer source={sound} color="white" autoPlay={true}/>
							}
							{/*{*/}
							{/*	media.type === 'image' ?*/}
							{/*		// test la longueur du media, s'il y'a un media on affiche l'image sinon on met celle par defaut*/}
							{/*			(<div >*/}
							{/*				<img className='imgShowMedia' src={media.name === 'Image' ? pls : media.url} alt={media.name} />*/}
							{/*			</div>)*/}
							{/*		*/}
							{/*	*/}
							{/*	: media.type === 'sound' ?*/}
							{/*		// test la longueur du media, s'il y'a un media on affiche le son sinon on met le son par defaut*/}
							{/*		media.name.length > 1*/}
							{/*		?*/}
							{/*			<div className="audioBoxA">*/}
							{/*				/!*<audio controls src={media.url}>*!/*/}
							{/*				/!*	Votre navigateur ne prend pas en charge l'élément audio.*!/*/}
							{/*				/!*</audio>*!/*/}
							{/*				<AudioPlayer source={media.url} color='white'/>*/}
							{/*			</div>*/}
							{/*		:*/}
							{/*			false*/}
							{/*	:*/}
							{/*		false*/}
							{/*	}*/}
						</div>
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
				<div className="detail-presentationQ">
					<div className="bg-gray-100 hover:bg-gray-300 shadow-lg shadow-black-500/50 tracking-wide uppercase font-bold text-center p-5 m-5 text-sm button-answer" style={{width: '100%', height: '100%'}}>
						<Link to="/">Retour à l'accueil</Link>
					</div>
				</div>
			)}

			<Footer />

			
		</div>
	);
};

export default Answer;
