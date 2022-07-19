const reducer = (state, action) => {
  // console.log(action.type);
  // console.log(action.payload);
  switch (action.type) {
    case "SongChange":
      return {
        ...state,
        currentSongId: action.payload.id,
        currentSongName: action.payload.name,
        currentindex: action.payload.index,
        currentThumbNilUrl: action.payload.url,
      };
    case "songArray":
      return {
        ...state,
        songsList: [...action.payload],
      };
    case "loginout":
      return {
        ...state,
        isLogin: action.payload.isLogin,
        userName: action.payload.userName,
        userId: action.payload.userId,
      };
    default:
      return { state };
  }
};

export default reducer;
