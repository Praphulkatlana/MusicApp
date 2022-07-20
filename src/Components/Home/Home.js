import React, { useEffect, useState, useContext } from "react";
import "./Home.css";
import axios from "axios";
import { AppContext } from "../../Store/Context";
import { ChangeSong, songArray } from "../../Store/Action";

const Home = ({ login_tag }) => {
  if (!login_tag) {
    alert("please login");
  }
  const { Store, StoreDispatch } = useContext(AppContext);

  const [songsList, setsong] = useState([]);
  const [ErrorMsg, setErrorMsg] = useState("Laoding....");

  const fetchingVideos = async () => {
    let KEY = process.env.REACT_APP_YOUTUBE_KEY;
    let KEY_BKP = process.env.REACT_APP_YOUTUBE_KEY_BKP;

    let FetchVideo = axios.create({
      baseURL: "https://youtube.googleapis.com/youtube/v3/",
    });
    let respones = [];

    try {
      respones = await FetchVideo.get("/search", {
        params: {
          part: "snippet",
          maxResults: 18,
          q: "new movie song",
          key: KEY,
        },
      });
    } catch (error) {
      console.clear();
      caches
        .keys()
        .then((keyList) =>
          Promise.all(keyList.map((key) => caches.delete(key)))
        );
      if (error.response.status === 403) {
        respones = await FetchVideo.get("/search", {
          params: {
            part: "snippet",
            maxResults: 18,
            q: "new movie song",
            key: KEY_BKP,
          },
        });
      } else {
        console.clear();
        setErrorMsg("Somethings went wrong please try after sometime");
        console.log("Daily Limit exceed");
      }
    }
    if (respones?.data?.items) {
      respones = respones.data.items;
      setsong(respones);
      StoreDispatch({ type: songArray, payload: respones });
    } else {
    }
  };
  useEffect(() => {
    fetchingVideos();
  }, []);

  const songSelect = (id, res, index) => {
    let name = res.snippet.title.slice(0, 50);
    if (Store.currentSongsId !== id) {
      StoreDispatch({ type: ChangeSong, payload: { id, name, index } });
    }
  };

  return (
    <div id="homediv">
      <div className="home_songsListSection">
        {songsList.length === 0 && (
          <>
            <div className="NoResultDiv">
              <h1>{ErrorMsg}</h1>
            </div>
          </>
        )}
        {songsList.map((result, index) => {
          return (
            <div
              className="home_songsItem"
              key={index}
              onClick={() => songSelect(result.id.videoId, result, index)}
            >
              <div className="home_thumbnil">
                <img src={result.snippet.thumbnails.medium.url} alt="thumb" />
              </div>
              <div className="home_songDetails">
                <p className="home_songName">
                  {result.snippet.title.slice(0, 50)}
                  {result.snippet.title.length > 50 && ".."}
                </p>
                <p className="home_songName_mobile">
                  {result.snippet.title.slice(0, 20)}
                  {result.snippet.title.length > 20 && ".."}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
