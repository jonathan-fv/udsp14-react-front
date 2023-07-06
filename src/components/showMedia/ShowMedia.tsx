import { Flow, MediaType } from '../../types/SituationTypes';
import pls from '../../assets/images/pls-1.jpg';
import './ShowMedia.css';
//@ts-ignore
//import AudioTest from '../../assets/audio/audiotest.mp3';

type Props = {
	id: string;
	type: string;
	label: string;
	targets: Array<string>;
	flow: Flow[];
	media: MediaType[];
	onClick: (answerTarget: string) => void;
};

const ShowMedia = (props: Props) => {
	const { type, label, targets, flow, media, onClick } = props;
	return (
		<div className="flex flex-col justify-center">
			<h1 className="text-2xl text-center">{label}</h1>
			{media.map((media) => {
				return (
					<div key={media.name}>
						{media.type === 'image' ? (
							// test la longueur du media, s'il y'a un media on affiche l'image sinon on met celle par defaut
							media.name === 'Image' || media.name === ' ' ? (
								//<img src={`http://localhost:8000/upload/images/` + media.name} alt={media.name} />
								<div className="imageShowMedia">
									<img src={media.url} alt={media.name} />
								</div>
							) : (
								<div className="imageShowMedia">
									<img src={pls} alt={media.name} />
								</div>
							)
						) : media.type === 'sound' ? (
							// test la longueur du media, s'il y'a un media on affiche le son sinon on met le son par defaut
							media.name.length > 1 ? (
								<div className="audioBox">
									<audio controls src={media.url}>
										Votre navigateur ne prend pas en charge l'élément audio.
									</audio>
								</div>
							) : (
								false
							)
						) : (
							false
						)}
					</div>
				);
			})}
		</div>
	);
};

export default ShowMedia;
