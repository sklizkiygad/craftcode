import React from 'react';
import './IframeViewer.css';

const IframeViewer = ({htmlContent='',cssContent='',jsContent=''}) => {


    const getBlobURL = (code, type) => {
        const blob = new Blob([code], { type })
        return URL.createObjectURL(blob)
    }

    console.log(getBlobURL('<p>My webpage</p>', 'text/html'))

    return (
        <iframe src={getBlobURL('<p>My webpage</p>', 'text/html')} className="iframe-viewer">
        </iframe>
    );
};

export default IframeViewer;