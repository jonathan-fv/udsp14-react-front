import React from 'react';

//@ts-ignore
import AudioTest from '../../assets/audio/audiotest.mp3';

const AudioPlayer: React.FC = () => {

	return (
		<div>
			<audio controls src={AudioTest}>
				Votre navigateur ne prend pas en charge l'élément audio.
			</audio>
		</div>
	);
};

export default AudioPlayer;
