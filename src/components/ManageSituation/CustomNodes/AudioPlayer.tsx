import React, { useState, useRef, useEffect } from 'react';
import playImage from '../../../assets/images/play.png';
import playImageWhite from '../../../assets/images/playWhite.png';
import pauseImage from '../../../assets/images/pause.png';
import pauseImageWhite from '../../../assets/images/pauseWhite.png';

const AudioPlayer = (props: any) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);
    const { source, className, color, autoPlay } = props;

    const togglePlayPause = () => {
        isPlaying
            ? audioRef.current?.pause()
                : audioRef.current?.play();
        setIsPlaying(!isPlaying);
    };
    useEffect(() => {
        autoPlay && setIsPlaying(true)
    }, [])

    const play = color === 'white' ? playImageWhite : playImage
    const pause = color === 'white' ? pauseImageWhite : pauseImage

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
        <div className="m-auto flex justify-center">
            <button onClick={togglePlayPause} className="focus:outline-none">
                {isPlaying ? (
                    <img className={className} src={pause} alt="" />
                ) : (
                    <img className={className} src={play} alt="" />
                )}
            </button>
            <audio ref={audioRef} src={source} autoPlay={autoPlay} loop={false}></audio>
        </div>
    );
};

export default AudioPlayer;