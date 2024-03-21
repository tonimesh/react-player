import React from "react";
import LiberySongs from "./LiberySongs";
const Libery = ({songs , setCurrentSong , audioRef ,isPlaying ,setSongs , liberyStatus , setLiberyStatus}) => {
    return(
        <div className={`libery ${liberyStatus ? "active-libery" : " " }`}>
            <h2>Library</h2>
            <div className="libery-songs">
                {songs.map(song =>(<LiberySongs  setSongs={setSongs} isPlaying={isPlaying} audioRef={audioRef} songs={songs} setCurrentSong= {setCurrentSong} song = {song} id={song.id} key={song.id} />))}  
            </div>

        </div>
       
    );
}

export default Libery;