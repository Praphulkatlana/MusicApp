import React, { useReducer, useEffect } from "react";
import "./App.css";
import Central from "./Components/Central/Central";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import SideBar from "./Components/Header/SideBar";
import Fav from "./Components/Favourite/Fav";
import Home from "./Components/Home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppContext } from "./Store/Context";
import reducer from "./Store/Reducer";

const initialState = {
  currentSongId: "",
  currentSongName: "",
  currentThumbNilUrl: "",
  currentindex: 0,
  isLogin: false,
  userName: "",
  userId: "",
  songsList: [],
  FavListPlaying: false,
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
        <Router>
          <Header />
          <SideBar />
          <Routes>
            <Route path="/favourite" element={<Fav />} />
            <Route exact path="/search" element={<Central />} />
            <Route path="/" element={<Home />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </Router>
        <Footer />
      </AppContext.Provider>
    </div>
  );
};

export default App;
