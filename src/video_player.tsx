import React, { useState, useRef } from 'react';
import ReactPlayer from 'react-player';

const VideoPlayer = ({ videoUrl }:any) => {
    const [played, setPlayed] = useState(0);
    const [buffering, setBuffering] = useState(false);
    const [watched80Percent, setWatched80Percent] = useState(false);
    const playerRef = useRef(null);

    const handleProgress = (state:any) => {

        setPlayed(state.played);

        if (state.played >= 0.8 && !watched80Percent) {
            setWatched80Percent(true);
        }
    };

    const handleBuffer = () => {
        setBuffering(true);
    };

    const handleBufferEnd = () => {
        setBuffering(false);
    };

    return (
        <div>
            <ReactPlayer
                ref={playerRef}
                url={videoUrl}
                playing
                controls
                onProgress={handleProgress}
                onBuffer={handleBuffer}
                onBufferEnd={handleBufferEnd}
            />
            {/*<div>*/}
            {/*    {buffering ? <p>Buffering...</p> : <p>Not Buffering</p>}*/}
            {/*</div>*/}
            <div>

                <p>Progress: {(played * 100).toFixed(2)}%</p>
            </div>
            <div>
                <label>
                    <input type="checkbox" checked={watched80Percent} readOnly />
                    Watched 80% of the video
                </label>
            </div>
        </div>
    );
};

export default VideoPlayer;
