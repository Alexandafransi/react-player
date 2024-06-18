// components/VideoPlayer.js

import React, { useState, useRef, useEffect } from 'react';
import ReactPlayer from 'react-player';

const VideoPlayers = ({ url, onWatched80Percent }:any) => {
    const [played, setPlayed] = useState(0);
    const [transcriptIndex, setTranscriptIndex] = useState(0);
    const [highlightedCount, setHighlightedCount] = useState(0);
    const playerRef = useRef(null) as React.MutableRefObject<ReactPlayer | null>;

    const transcriptData = [
        { time: 0, text: "Welcome to our video." },
        { time: 5, text: "In this video, we'll explore..." },
        { time: 10, text: "React components and state." },
        // Add more transcript entries as needed
    ];

    const handleProgress = (state:any) => {
        const { playedSeconds } = state;
        setPlayed(state.played);
        updateTranscriptIndex(playedSeconds);
        if (state.played >= 0.8) {
            onWatched80Percent();
        }
    };

    const updateTranscriptIndex = (currentTime:any) => {
        for (let i = 0; i < transcriptData.length; i++) {
            // Check if current time is between the current and next transcript entry times
            if (
                currentTime >= transcriptData[i].time &&
                (i === transcriptData.length - 1 || currentTime < transcriptData[i + 1].time)
            ) {
                setTranscriptIndex(i);
                setHighlightedCount(i); // Update highlighted count based on current time
                return;
            }
        }
        // If currentTime is beyond the last transcript entry, highlight all
        setTranscriptIndex(transcriptData.length - 1);
        setHighlightedCount(transcriptData.length);
    };

    const seekToTranscriptTime = (time:any) => {
        playerRef.current?.seekTo(time, 'seconds'); // Directly accessing seekTo on the ref
    };

    useEffect(() => {
        // Reset transcript index and highlighted count when video playback is finished
        if (played === 1) {
            setTranscriptIndex(0);
            setHighlightedCount(0);
        }
    }, [played]);

    return (<>
        <div className="video-player-wrapper">
            <ReactPlayer
                ref={playerRef}
                url={url}
                controls
                onProgress={handleProgress}
                width="100%"
                height="100%"
            />
            <div className="transcript">
                {transcriptData.map((entry, index) => (
                    <span
                        key={index}
                        className={index <= highlightedCount ? 'highlighted' : ''}
                        onClick={() => seekToTranscriptTime(entry.time)}
                    >
            {entry.text}
          </span>
                ))}
            </div>
        </div>

            <div><h1>Video with Transcript Overlay</h1> </div>

            <div className="video-player-wrapper">
                <ReactPlayer
                    ref={playerRef}
                    url={url}
                    controls
                    onProgress={handleProgress}
                    width="100%"
                    height="100%"
                />
                <div className="transcript-overlay">
                    {transcriptData.map((entry, index) => (
                        <div
                            key={index}
                            className={`transcript-text ${index === transcriptIndex ? 'active' : ''}`}
                        >
                            {entry.text}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default VideoPlayers;
