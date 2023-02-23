import React from 'react';
import './JsEditor.css';


const JsEditor = () => {
    return (
        <div className="js-editor editor">
            <h4 className="editor__heading">JS</h4>
            <div className="editor__content" contentEditable/>
        </div>
    );
};

export default JsEditor;