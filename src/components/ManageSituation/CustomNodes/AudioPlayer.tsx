import React, { useState, useRef, useEffect } from 'react';
import playImage from '../../../assets/images/play.png';
import pauseImage from '../../../assets/images/pause.png';

const AudioPlayer = (props: any) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);
    const { source, className } = props;

    const togglePlayPause = () => {
        isPlaying
            ? audioRef.current?.pause()
                : audioRef.current?.play();
        setIsPlaying(!isPlaying);
    };

    const handleAudioEnded = () => {
        setIsPlaying(false);
    };

    useEffect(() => {
        audioRef.current?.addEventListener('ended', handleAudioEnded);
        return () => {
            audioRef.current?.removeEventListener('ended', handleAudioEnded);
        };
    }, []);

    return (
        <div className="m-auto">
            <button onClick={togglePlayPause} className="focus:outline-none">
                {isPlaying ? (
                    <img className={className} src={pauseImage} alt="" />
                ) : (
                    <img className={className} src={playImage} alt="" />
                )}
            </button>
            <audio ref={audioRef} src={source}></audio>
        </div>
    );
};

export default AudioPlayer;