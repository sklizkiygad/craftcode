import React, {useState} from 'react';
import './MainPage.css';
import ResizeFunctions from "../../components/MainPageEditors/MainPageEditors";
import IframeViewer from "../../components/IframeViewer/IframeViewer";

const MainPage = () => {
    const [htmlText,setHtmlText]=useState('');
    const [cssText,setCssText]=useState('');
    const [jsText,setJsText]=useState('');



    return (
        <div className="main-page">
                <ResizeFunctions/>
                <IframeViewer htmlContent={htmlText} cssContent={cssText} jsContent={jsText}/>
        </div>
    );
};

export default MainPage;