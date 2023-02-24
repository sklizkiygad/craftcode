import React from 'react';
import './HtmlEditor.css';
import {useDispatch, useSelector} from "react-redux";
import {htmlDataSelector, setHtmlData} from "../../redux/slices/codeSlice";

const HtmlEditor = () => {

    const dispatch=useDispatch();
    const htmlData=useSelector(htmlDataSelector);


    const setHtmlContent=(e)=>{
        dispatch(setHtmlData(e.target.innerHTML))
    }

    return (
        <div className="html-editor editor" >
            <h4 className="editor__heading">HTML</h4>
            <div className="editor__content" contentEditable onKeyUp={setHtmlContent}/>
        </div>
    );
};

export default HtmlEditor;