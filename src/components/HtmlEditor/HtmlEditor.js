import React from 'react';
import './HtmlEditor.css';
import {useDispatch, useSelector} from "react-redux";
import {htmlDataSelector, setHtmlData} from "../../redux/slices/codeSlice";

const HtmlEditor = () => {

    const dispatch=useDispatch();
    const htmlData=useSelector(htmlDataSelector);

    const addBr=(e)=>{
        if(e.keyCode === 13){
            e.preventDefault();
            document.execCommand('insertHTML', false, '<br class="brToDelete"><br class="brToDelete">');
            return false
        }
    }

    const htmlFormat=(e)=>e.replace(/(<br class="brToDelete">)/g, "");

    const setHtmlContent=(e)=>{

        dispatch(setHtmlData(htmlFormat(e.target.innerHTML)))
    }

    return (
        <div className="html-editor editor" >
            <h4 className="editor__heading">HTML</h4>
            <div className="editor__content" contentEditable onKeyDown={addBr} onKeyUp={setHtmlContent}>
            </div>
        </div>
    );
};

export default HtmlEditor;