import React from "react";
import {Routes,Route} from "react-router-dom";
import router from "./router/router";
import './components/css/style.css'
import MainPage from "./pages/MainPage/MainPage";
import LoginPage from "./pages/LoginPage/LoginPage";


function App() {
  return (
    <div className="App">

        <MainPage/>
      {/*<Routes>*/}
      {/* <Route path="/" element={<MainPage />}/>*/}
      {/* <Route path="/login" element={<LoginPage />}/>*/}
      {/*</Routes>*/}
    </div>
  );
}

export default App;
