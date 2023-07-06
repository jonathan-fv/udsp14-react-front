import { Flow, MediaType } from '../../types/SituationTypes';
import './Question.css';
import './Answer.css';
import pls from '../../assets/images/pls-1.jpg';
//@ts-ignore
//import AudioTest from '../../assets/audio/audiotest.mp3';
import { Link } from 'react-router-dom';

import Footer from '../footer/Footer';

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
	//console.log(media)
	return (
		<div className="box-mediaA">
			<div className="detail-presentationQ">
				<h1 className="text-2xl text-center">{label}</h1>
				<div className="media-container">
				{media.map((media) => {
					return (
						<div key={media.name}>
							{
								media.type === 'image' ?
									// test la longueur du media, s'il y'a un media on affiche l'image sinon on met celle par defaut
									media.name === "Image"
									? 
										<div className='imgShowMedia'>
											<img src={pls} alt={media.name} />
										</div>
									: 
										<div className='imgShowMedia'>
											<img src={media.url} alt={media.name} />
										</div>
									
								
								: media.type === 'sound' ?
									// test la longueur du media, s'il y'a un media on affiche le son sinon on met le son par defaut
									media.name.length > 1
									?
										<div className="audioBoxA">
											<audio controls src={media.url}>
												Votre navigateur ne prend pas en charge l'élément audio.
											</audio>
										</div>
									:
										false
								:
									false
								}
						</div>
					);
				})}
				</div>
			</div>
			<div className="answer-box">
			{targets.map((answer) => {
				return (
					<div className="button-answer">
					{flow.map((x) => {
						return (
							answer === x.id && (
								<button onClick={() => onClick(x.targets[0])}>
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
					{
						!media.length ?
							<div>
								<img src={pls} alt="default" />
							</div>
						:
						media.map((media) => {
							return(
								<div key={media.name}>
									<img src={media.url} alt={media.name} />
								</div>
							);
						})
					}
					<div className="bg-gray-100 hover:bg-gray-300 shadow-lg shadow-black-500/50 tracking-wide uppercase font-bold text-center p-5 m-5 text-sm">
						<Link to="/">Retour à l'accueil</Link>
					</div>
				</div>
			)}

			<Footer />

			
		</div>
	);
};

export default Answer;
