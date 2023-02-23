import React from 'react';
import './HtmlEditor.css';

const HtmlEditor = () => {
    return (
        <div className="html-editor editor" >
            <h4 className="editor__heading">HTML</h4>
            <div className="editor__content" contentEditable/>
        </div>
    );
};

export default HtmlEditor;