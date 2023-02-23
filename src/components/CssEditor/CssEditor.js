import React from 'react';
import './CssEditor.css';

const CssEditor = () => {
    return (
        <div className="css-editor editor">
            <h4 className="editor__heading">CSS</h4>
            <div className="editor__content" contentEditable/>

        </div>
    );
};

export default CssEditor;