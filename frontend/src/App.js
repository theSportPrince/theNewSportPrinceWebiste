import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Component/Navbar";
import BottomNavigationBar from "./Component/BottomNavigationBar";
import Body from "./Component/Body";
import Live from "./Component/Live/Live";
import News from "./Component/News/News";
import Match from "./Component/Matches/Match";
import More from "./Component/More/More";
import Login from "./Component/LoginAndRegistration/Login";
import TrendingSeries from "./Component/More/TrendingSeries";
import TeamRanking from "./Component/More/TeamRanking";
import PlayerRanking from "./Component/More/PlayerRanking";
import WomenRanking from "./Component/More/WomenRanking";
import About from "./Pages/About";
import TermAndCondition from "./Pages/Term&Condition";
import PrivacyAndPolicy from "./Pages/Privacy&Policy";
import Register from "./Component/LoginAndRegistration/Register";
import Footer from "./Component/Footer/Footer";
import "./App.css";
import ChatProvider from "./Context/ChatProvider";

import PersonalProfile from "./Component/Profile/Profile";
import Blog from "./Component/More/Blog";
import ContactUs from "./Pages/Contactus";
import Video from "./Component/Video/Video";

function App() {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);

  const [loggedinUserData, setLoggedInUserData] = useState([]);
  const [userloggedIn, setUserLoggedIn] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };

    const loggedinuser = JSON.parse(localStorage.getItem("userData"));
    if (loggedinuser) {
      setUserLoggedIn(true);
      setLoggedInUserData(loggedinuser);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Router>
      <ChatProvider>
        <div className="App">
          <Navbar />
          {isSmallScreen ? (
            <BottomNavigationBar className="BottomNavigationBar" />
          ) : null}

          <Routes>
            <Route path="/" element={<Body />} />
            <Route path="/live" element={<Live />} />
            <Route path="/news" element={<News />} />
            <Route path="/match" element={<Match />} />
            <Route path="/more" element={<More />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/trending-series" element={<TrendingSeries />} />
            <Route path="/team-ranking" element={<TeamRanking />} />
            <Route path="/player-ranking" element={<PlayerRanking />} />
            <Route path="/women-ranking" element={<WomenRanking />} />
            <Route path="/about-us" element={<About />} />
            <Route path="/term-and-condition" element={<TermAndCondition />} />
            <Route path="/privacy-policy" element={<PrivacyAndPolicy />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contactus" element={<ContactUs />} />
            <Route path="/videos" element={<Video />} />
            {userloggedIn === true ? (
              <Route path="/profile" element={<PersonalProfile />} />
            ) : (
              <Route path="/login" element={<Login />} />
            )}
          </Routes>
          {isSmallScreen === false ? <Footer /> : null}
        </div>
      </ChatProvider>
    </Router>
  );
}

export default App;
