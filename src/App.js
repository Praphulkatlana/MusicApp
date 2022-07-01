import React, { useReducer, useEffect } from "react";
import "./App.css";
import Central from "./Components/Central/Central";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import SideBar from "./Components/Header/SideBar";
import { AppContext } from "./Store/Context";
import reducer from "./Store/Reducer";

const initialState = {
  currentSongId: "",
  currentSongName: "",
  currentindex: 0,
  isLogin: false,
  userName: "",
  songsList: [],
};

const App = () => {
  const [Store, StoreDispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const handleBeforeUnload = (e) => {
    e.preventDefault();
    const message = "Are you sure you want to reload/leave?";
    e.returnValue = message;
    return message;
  };

  return (
    <div className="App">
      <AppContext.Provider value={{ Store, StoreDispatch }}>
        <Header />
        <SideBar />
        <Central />
        <Footer />
      </AppContext.Provider>
    </div>
  );
};

export default App;
