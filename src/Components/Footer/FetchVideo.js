import axios from "axios";

const KEY = "AIzaSyDH6cnT-6UgKTABtBadvT7bwNyhzodGkHQ";

let FetchVideo = axios.create({
  baseURL: "https://youtube.googleapis.com/youtube/v3/",
});

const resultvideos = await FetchVideo.get("/search", {
  params: {
    part: "snippet",
    maxResults: 2,
    q: "reactjs",
    key: KEY,
  },
});
export default resultvideos;
