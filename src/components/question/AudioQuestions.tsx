import React, { useState } from 'react';

//@ts-ignore
import audioTest from '../../assets/audio/audiotest.mp3';

const AudioPlayer: React.FC = () => {
	const [isPlaying, setIsPlaying] = useState(false);

	const togglePlay = () => {
		setIsPlaying(!isPlaying);
	};

	return (
		<div>
			<audio controls src={audioTest}>
				Votre navigateur ne prend pas en charge l'élément audio.
			</audio>
		</div>
	);
};

export default AudioPlayer;
