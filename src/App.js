import React, { useState, useRef, useEffect } from "react";
import Player from "./components/Player";
import Song from "./components/Song";
import "./styles/app.scss";
// import data from "./data";
import Libery from "./components/Libery";
import Nav from "./components/Nav";


function App() {
  const audioRef = useRef(null);
  // const [songs,setSongs] = useState(data());
  // const [currentSong , setCurrentSong ] = useState(songs[0]);
  const [songs, setSongs] = useState(null);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [data, setData] = useState(null);
  const [songInfo, setSongInfo] = useState(
    {
      currentTime: 0,
      duration: 0,
      animationPercentage: 0,
    }
  );
  const [liberyStatus, setLiberyStatus] = useState(false);

  useEffect(() => {
    loadSongs();
  }, []);

  const loadSongs = async () => {
    let response = await fetch("/data.json");
    let json = await response.json();
    setData(json);
    setSongs(json.songs);
    setCurrentSong(json.songs[0]);
  }

  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    const roundedCurrent = Math.round(current);
    const roundedDuration = Math.round(duration);
    const animation = Math.round((roundedCurrent / roundedDuration) * 100);
    console.log(animation);
    setSongInfo({ ...songInfo, currentTime: current, duration, animationPercentage: animation })
  };

  const songEndedHandler = async ()=>{
    let currentIndex = songs.findIndex((Song) => Song.id === currentSong.id)
     await setCurrentSong(songs[(currentIndex + 1) % songs.length])
     if(isPlaying) audioRef.current.play();
    
  };

  return (
    <div className={`App ${liberyStatus ? "libery-active" : " "}` }>
      <Nav liberyStatus={liberyStatus} setLiberyStatus={setLiberyStatus} />
      {data ?
        <>
          <Song currentSong={currentSong} />
          <Player setSongs={setSongs} setCurrentSong={setCurrentSong} songs={songs} setSongInfo={setSongInfo} songInfo={songInfo} audioRef={audioRef} isPlaying={isPlaying} setIsPlaying={setIsPlaying} currentSong={currentSong} />
          <Libery liberyStatus={liberyStatus} setLiberyStatus={setLiberyStatus} setSongs={setSongs} isPlaying={isPlaying} audioRef={audioRef} songs={songs} setCurrentSong={setCurrentSong} />
          <audio
            onTimeUpdate={timeUpdateHandler}
            onLoadedMetadata={timeUpdateHandler}
            ref={audioRef} src={currentSong.audio}
            onEnded={songEndedHandler}
            ></audio>
        </>
        : "Loading"
      }
    </div>
  );
}

export default App;
