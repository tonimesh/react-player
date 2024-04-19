import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faAngleLeft, faAngleRight, faPause } from "@fortawesome/free-solid-svg-icons";

const Player = ({ tryToPlay ,audioRef, activeLiberyHandler, currentSong, isPlaying, setIsPlaying, songInfo, setSongInfo, songs, setCurrentSong, setSongs }) => {

  const playSongHandler = () => {
    console.log(audioRef.current);
    //  audioRef.current.play();
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
    }
    else {
      audioRef.current.play();
      setIsPlaying(!isPlaying);
    }

  };

  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    )
  };
  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });

  };

  const skipTrackHandler = async (direction) => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    if (direction === "skip-forward") {
      await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
      activeLiberyHandler(songs[(currentIndex + 1) % songs.length]);
    }
    if (direction === "skip-back") {
      if ((currentIndex - 1) % songs.length === -1) {
        await setCurrentSong(songs[songs.length - 1]);
        activeLiberyHandler(songs[songs.length - 1]);
        tryToPlay();
        return;

      }
      await setCurrentSong(songs[(currentIndex - 1) % songs.length]);
      activeLiberyHandler(songs[(currentIndex - 1) % songs.length]);
    }
    tryToPlay();
  };

  const trackAnim = {
    transform: `translateX(${songInfo.animationPercentage}%)`
  }


  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <div style={{ background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})` }} className="track">
          <input 
            type="range"
            onChange={dragHandler}
            min={0}
            max={songInfo.duration || 0}
            value={songInfo.currentTime}
          />
          <div style={trackAnim} className="animate-track"></div>
        </div>
        <p>{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon onClick={() => skipTrackHandler("skip-back")} className="skip-back" size="2x" icon={faAngleLeft} />
        <FontAwesomeIcon onClick={playSongHandler} className="play" size="2x" icon={isPlaying ? faPause : faPlay} />
        <FontAwesomeIcon onClick={() => skipTrackHandler("skip-forward")} className="skip-forward" size="2x" icon={faAngleRight} />

      </div>

    </div>
  );
};

export default Player