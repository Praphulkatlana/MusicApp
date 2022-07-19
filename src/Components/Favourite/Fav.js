import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../Central/Central.css";
import { AppContext } from "../../Store/Context";
import { ChangeSong, songArray } from "../../Store/Action";

import { db } from "../../Firebase";
import { collection, getDocs } from "firebase/firestore";

const Fav = (props) => {
  const { Store, StoreDispatch } = useContext(AppContext);
  let navigate = useNavigate();
  if (Store.isLogin === false) {
    // navigate.push("/search");
    alert("Please Login");
  }

  const [songsList, setsong] = useState([]);
  let data = [];

  const fetchingVideos = async () => {
    console.log("fetchcall");

    let userId = "test";
    userId = Store.userId;
    userId = "prafulkatlana@gmail.com";

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
    console.log(data);
    // data = [...new Map(data.map((item, key) => [item[key], item])).values()];

    setsong(data);
  };
  useEffect(() => {
    fetchingVideos();
  }, []);

  const songSelect = (id, title, index, url) => {
    let name = title.slice(0, 50);
    if (Store.currentSongsId !== id) {
      StoreDispatch({ type: songArray, payload: songsList });
      StoreDispatch({ type: ChangeSong, payload: { id, name, index, url } });
    }
  };

  return (
    <div id="centraldiv">
      <div className="songsListSection">
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
      <button onClick={() => console.log(Store)}>state</button>
    </div>
  );
};

export default Fav;
