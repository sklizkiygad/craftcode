import React from "react";
import {Routes,Route} from "react-router-dom";

import './components/css/style.css'
import MainPage from "./pages/MainPage/MainPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import {ProtectedRoutes} from "./components/ProtectedRoutes/ProtectedRoutes";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
import WelcomePage from "./pages/WelcomePage/WelcomePage";

function App() {

  return (
    <div className="App">
      <Routes>

          <Route element={<ProtectedRoutes/>}>
              <Route element={<MainPage/>} path="/" exact/>
          </Route>




       <Route path="/login" element={<LoginPage />}/>
          <Route path="/registration" element={<RegistrationPage />}/>
          <Route path="/welcome" element={<WelcomePage />}/>
      </Routes>

    </div>
  );
}

export default App;
