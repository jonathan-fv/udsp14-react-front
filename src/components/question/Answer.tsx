import { Flow, MediaType } from '../../types/SituationTypes';
import './Question.css';
//import pls from '../../assets/images/pls-1.jpg';
import { Link } from 'react-router-dom';

import Vector_1 from '../../assets/images/Vector_1.svg';
import Vector_2 from '../../assets/images/Vector_2.svg';

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
	return (
		<div className="flex flex-col flex-wrap items-center">
			<div className="">
				<h1 className="text-2xl text-center">{label}</h1>
				{media.map((media) => {
					return (
						<div>
							{
								media.type === 'image' ?
									<img src={`http://localhost:8000/upload/images/` + media.name} alt={media.name} />
								: media.type === 'sound' 
								?
									<h3>audio: {media.name}</h3>
								:
									<h3>Error</h3>
							}
						</div>
					);
				})}
			</div>
			{targets.map((answer) => {
				return (
					<div className="bg-gray-100 hover:bg-gray-300 shadow-lg shadow-black-500/50 tracking-wide uppercase font-bold text-center p-5 m-5 text-sm">
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

			{type === 'final' && (
				<div className="bg-gray-100 hover:bg-gray-300 shadow-lg shadow-black-500/50 tracking-wide uppercase font-bold text-center p-5 m-5 text-sm">
					<Link to="/">Retour à l'accueil</Link>
				</div>
			)}

			<div className="vectors-img">
				<img className="vectors-img-left" src={Vector_2} alt="Vector 2"/>
				<img className="vectors-img-right" src={Vector_1} alt="Vector 1"/>
			</div>
		</div>
	);
};

export default Answer;
