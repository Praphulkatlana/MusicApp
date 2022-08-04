import React, { useEffect, useState, useContext } from "react";
import "../Central/Central.css";
import { AppContext } from "../../Store/Context";
import { ChangeSong, songArray } from "../../Store/Action";

import { db } from "../../Firebase";
import { collection, getDocs } from "firebase/firestore";

const Fav = () => {
  const { Store, StoreDispatch } = useContext(AppContext);

  const [songsList, setsong] = useState([]);
  let data = [];

  const fetchingVideos = async () => {
    if (Store.isLogin === false) {
      return;
    }

    let userId;
    userId = Store.userId;

    data = [];
    const querySnapshot = await getDocs(collection(db, userId));
    querySnapshot.forEach((doc) => {
      data.push(doc.data());
    });

    let removeDuplicateItem = new Set();
    for (let index in data) {
      if (removeDuplicateItem.has(data[index].id)) {
        delete data[index];
      } else {
        removeDuplicateItem.add(data[index].id);
      }
    }
    setsong(data);
  };
  useEffect(() => {
    fetchingVideos();
  }, []);

  const songSelect = (id, title, index, url) => {
    let name = title.slice(0, 50);
    if (Store.currentSongsId !== id) {
      StoreDispatch({
        type: songArray,
        payload: { songsList, FavListPlaying: true },
      });
      StoreDispatch({ type: ChangeSong, payload: { id, name, index, url } });
    }
  };

  return (
    <div id="centraldiv">
      <div className="songsListSection">
        {!Store.isLogin && (
          <div className="noResultText">
            <h1>please login to access your favourite list</h1>
          </div>
        )}
        {songsList.length == 0 && (
          <div className="noResultText">
            <h1>No items found in favourite list </h1>
          </div>
        )}
        {songsList.map((result, index) => {
          return (
            <div className="songsItem" key={index}>
              <div className="thumbnil">
                <img src={result.url} alt="thumb" />
              </div>
              <div
                className="songDetails"
                onClick={() =>
                  songSelect(result.id, result.name, index, result.url)
                }
              >
                <p className="songName">
                  {result.name.slice(0, 30)}
                  {result.name.length > 30 && ".."}
                </p>

                <p className="artistName">
                  {result.name.slice(0, 15)}
                  {result.name.length > 15 && ".."}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Fav;
