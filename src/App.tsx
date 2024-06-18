import React from 'react';
import './App.css';
import VideoPlayer from "./video_player";

function App() {
  const videoUrl = '/test.mp4';
    // const videoUrl = 'https://www.youtube.com/watch?v=LXb3EKWsInQ';


    return (
      <div>
        <h1>Yuyah Video Player</h1>
        <VideoPlayer videoUrl={videoUrl} />
      </div>
  );
}

export default App;
