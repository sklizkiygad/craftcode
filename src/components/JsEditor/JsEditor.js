import React from 'react';
import './JsEditor.css';
import {useDispatch, useSelector} from "react-redux";
import {jsDataSelector, setJsData} from "../../redux/slices/codeSlice";


const JsEditor = () => {

    const dispatch=useDispatch();
    const jsData=useSelector(jsDataSelector);


    const setJsContent=(e)=>{
        dispatch(setJsData(e.target.innerHTML))
    }


    return (
        <div className="js-editor editor">
            <h4 className="editor__heading">JS</h4>
            <div className="editor__content" contentEditable onKeyUp={setJsContent}/>
        </div>
    );
};

export default JsEditor;