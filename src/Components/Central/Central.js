import React, { useEffect, useState, useContext } from "react";
import "./Central.css";
import axios from "axios";
import { AiOutlineSearch } from "react-icons/ai";
import { IconContext } from "react-icons";
import { AppContext } from "../../Store/Context";
import { ChangeSong, songArray } from "../../Store/Action";

const Central = () => {
  const { Store, StoreDispatch } = useContext(AppContext);

  const [songsList, setsong] = useState([]);
  const [searchkeyword, setsearchkeyword] = useState("newsongs");
  const inputRef = React.useRef("songs");

  const fetchingVideos = async () => {
    let KEY = process.env.REACT_APP_YOUTUBE_KEY;

    let FetchVideo = axios.create({
      baseURL: "https://youtube.googleapis.com/youtube/v3/",
    });

    let respones = await FetchVideo.get("/search", {
      params: {
        part: "snippet",
        maxResults: 20,
        q: searchkeyword,
        key: KEY,
      },
    });
    respones = respones.data.items;
    setsong(respones);
    StoreDispatch({ type: songArray, payload: respones });
  };
  useEffect(() => {
    fetchingVideos();
  }, [searchkeyword]);

  const songSelect = (id, res, index) => {
    let name = res.snippet.title.slice(0, 50);
    if (Store.currentSongsId !== id) {
      StoreDispatch({ type: ChangeSong, payload: { id, name, index } });
    }
  };

  const onInputChange = () => {
    let InpkeyWord = inputRef.current.value.trim("");
    if (InpkeyWord === "") {
      return null;
    }
    setsearchkeyword(InpkeyWord);
  };
  const handleEnterKey = (e) => {
    if (e.key == "Enter") {
      onInputChange();
    }
  };

  return (
    <div id="centraldiv">
      <div className="searchSection">
        <input
          ref={inputRef}
          className="inputFlied"
          placeholder="Search"
          onKeyDown={(e) => handleEnterKey(e)}
        />
        <IconContext.Provider value={{ color: "white", size: "2em" }}>
          <AiOutlineSearch onClick={onInputChange} className="searchBtn" />
        </IconContext.Provider>
      </div>
      <div className="songsListSection">
        {songsList.map((result, index) => {
          return (
            <div className="songsItem" key={index}>
              <div className="thumbnil">
                <img src={result.snippet.thumbnails.medium.url} alt="thumb" />
              </div>
              <div
                className="songDetails"
                onClick={() => songSelect(result.id.videoId, result, index)}
              >
                <p className="songName">
                  {result.snippet.title.slice(0, 50)}
                  {result.snippet.title.length > 50 && ".."}
                </p>

                <p className="artistName">
                  {result.snippet.channelTitle.slice(0, 15)}
                  {result.snippet.channelTitle.length > 15 && ".."}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Central;
