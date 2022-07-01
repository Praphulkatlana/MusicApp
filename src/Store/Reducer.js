const reducer = (state, action) => {
  switch (action.type) {
    case "SongChange":
      return {
        ...state,
        currentSongId: action.payload.id,
        currentSongName: action.payload.name,
        currentindex: action.payload.index,
      };
    case "songArray":
      return {
        ...state,
        songsList: [...action.payload],
      };
    case "loginout":
      return {
        ...state,
        islogin: action.payload.islogin,
        userName: action.payload.user,
      };
    default:
      return { state };
  }
};

export default reducer;
