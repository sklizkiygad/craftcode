import React from 'react';
import './MainPage.css';
import MainPageEditors from "../../components/MainPageEditors/MainPageEditors";
import IframeViewer from "../../components/IframeViewer/IframeViewer";

const MainPage = () => {

    return (
        <div className="main-page">
                <MainPageEditors/>
                <IframeViewer/>
        </div>
    );
};

export default MainPage;