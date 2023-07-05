import { Flow, MediaType } from '../../types/SituationTypes';
import pls from '../../assets/images/pls-1.jpg';

//@ts-ignore
import AudioTest from '../../assets/audio/audiotest.mp3';

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
    return(
        <div className="">
			<div className="">
				<h1 className="text-2xl text-center">{label}</h1>
				{media.map((media) => {
					return (
						<div key={media.name} >
							{
								media.type === 'image' ?
									// test la longueur du media, s'il y'a un media on affiche l'image sinon on met celle par defaut
									media.name.length > 1
									? 
										//<img src={`http://localhost:8000/upload/images/` + media.name} alt={media.name} /> 
										<div>
											<img src={pls} alt={media.name} />
										</div>
									: 
										<div>
											<img src={pls} alt={media.name} />
										</div>
									
								
								: media.type === 'sound' ?
									// test la longueur du media, s'il y'a un media on affiche le son sinon on met le son par defaut
									media.name.length > 1
									?
										<div className="audioBox">
											<audio controls src={AudioTest}>
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
    );
}

export default ShowMedia;