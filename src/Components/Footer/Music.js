import React, { useEffect, useState, useContext, createRef } from "react";
import ReactPlayer from "react-player/youtube";
import { GrCaretPrevious } from "react-icons/gr";
import { GrCaretNext } from "react-icons/gr";
import { AiOutlinePlayCircle } from "react-icons/ai";
import { AiOutlinePauseCircle } from "react-icons/ai";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { MdOutlineFavorite } from "react-icons/md";

import { IconContext } from "react-icons";
import { AppContext } from "../../Store/Context";
import { ChangeSong } from "../../Store/Action";

import "./Footer.css";

const Music = ({ rotationtoggle }) => {
  const { Store, StoreDispatch } = useContext(AppContext);
  const player = createRef();
  const [url, seturl] = useState("");
  const [isPlaying, setisPlaying] = useState(true);
  const [played, setplayed] = useState(0);
  const [duration, setduration] = useState(0);
  const [volume, setvolume] = useState(0.5);
  const [Fav, setFav] = useState(false);

  const onPlayPause = () => {
    setisPlaying(!isPlaying);
    rotationtoggle(!isPlaying);
    if (played === 0) {
      setduration(duration);
      handleDuration();
    }
  };

  useEffect(() => {
    if (Store.currentSongId) {
      seturl(`https://www.youtube.com/watch?v=${Store.currentSongId}`);
      setisPlaying(true);
      rotationtoggle(true);
      setplayed(0);
      handleProgressTime();
    } else {
      seturl(null);
    }
  }, [Store.currentSongId]);

  useEffect(() => {
    setTimeout(() => {
      handleProgressTime();
    }, 1000);
  }, [played]);

  const handleDuration = (val) => {
    setduration(val);
  };

  const handleSeekChange = (e) => {
    let playedTime = e.target.value;
    setplayed(parseFloat(playedTime));
    player.current.seekTo(playedTime);
  };

  const handleVolumeChange = (e) => {
    setvolume(parseFloat(e.target.value));
  };
  const handleProgressTime = () => {
    let playedTime = player.current.getCurrentTime();
    setplayed(parseFloat(playedTime));
  };

  const bufferEnd = () => {
    handleProgressTime();
  };
  const handleEndMedia = () => {
    setisPlaying(false);
    rotationtoggle(false);
    if (Store.currentindex === Store.songsList.length - 1) {
      return;
    } else {
      let id = Store.songsList[Store.currentindex + 1].id.videoId;
      let name = Store.songsList[Store.currentindex + 1].snippet.title;
      StoreDispatch({
        type: ChangeSong,
        payload: { id, name, index: Store.currentindex + 1 },
      });
      setisPlaying(true);
      rotationtoggle(true);
    }
  };

  const prvSong = () => {
    if (Store.currentindex === 0) {
      return;
    } else {
      console.log(Store);
      let id = Store.songsList[Store.currentindex - 1].id.videoId;
      let name = Store.songsList[Store.currentindex - 1].snippet.title;
      StoreDispatch({
        type: ChangeSong,
        payload: { id, name, index: Store.currentindex - 1 },
      });
    }
  };
  const nxtSong = () => {
    if (Store.currentindex === Store.songsList.length - 1) {
      return;
    } else {
      let id = Store.songsList[Store.currentindex + 1].id.videoId;
      let name = Store.songsList[Store.currentindex + 1].snippet.title;
      StoreDispatch({
        type: ChangeSong,
        payload: { id, name, index: Store.currentindex + 1 },
      });
    }
  };
  const AddToFav = () => {
    setFav(!Fav);
  };
  return (
    <div>
      <div className="player-top">
        <div className="playerButton">
          <div className="volumeBar">
            <input
              type="range"
              min={0}
              max={1}
              step="any"
              value={volume}
              onChange={handleVolumeChange}
            />
          </div>
          <IconContext.Provider value={{ color: "white", size: "2em" }}>
            {Fav ? (
              <MdOutlineFavorite onClick={AddToFav} className="AddToFavBtn" />
            ) : (
              <MdOutlineFavoriteBorder
                onClick={AddToFav}
                className="AddToFavBtn"
              />
            )}
            <GrCaretPrevious onClick={prvSong} id="whiteColor" />
            {url && (
              <div onClick={onPlayPause}>
                {isPlaying ? <AiOutlinePauseCircle /> : <AiOutlinePlayCircle />}
              </div>
            )}

            <GrCaretNext onClick={nxtSong} />
          </IconContext.Provider>
        </div>
      </div>
      <div className="player-bottom">
        <input
          className="progessBar"
          type="range"
          min={0}
          max={100}
          step="any"
          value={played}
          onMouseDown={(e) => {}}
          onChange={(e) => handleSeekChange(e)}
        />
      </div>
      <ReactPlayer
        width="0px"
        height="0px"
        ref={player}
        url={url}
        volume={volume}
        playing={isPlaying}
        onBufferEnd={bufferEnd}
        onDuration={handleDuration}
        onSeek={(e) => console.log("onSeek", e)}
        onEnded={handleEndMedia}
      />
    </div>
  );
};

export default Music;
