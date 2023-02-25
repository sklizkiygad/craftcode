import React from 'react';
import './JsEditor.css';
import {useDispatch, useSelector} from "react-redux";
import {jsDataSelector, setJsData} from "../../redux/slices/codeSlice";


const JsEditor = () => {

    const dispatch=useDispatch();
    const jsData=useSelector(jsDataSelector);

    const addBr=(e)=>{
        if(e.keyCode === 13){
            e.preventDefault();
            document.execCommand('insertHTML', false, '<br class="brToDelete"><br class="brToDelete">');
            return false
        }
    }

    const jsFormat=(e)=>e.replace(/(<br class="brToDelete">)/g, "");


    const setJsContent=(e)=>{
        dispatch(setJsData(jsFormat(e.target.innerText)))
    }


    return (
        <div className="js-editor editor">
            <h4 className="editor__heading">JS</h4>
            <div className="editor__content" contentEditable onKeyDown={addBr} onKeyUp={setJsContent}/>
        </div>
    );
};

export default JsEditor;