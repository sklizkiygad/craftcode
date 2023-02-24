import React from 'react';
import './CssEditor.css';
import {useDispatch, useSelector} from "react-redux";
import {cssDataSelector, setCssData} from "../../redux/slices/codeSlice";

const CssEditor = () => {


    const dispatch=useDispatch();
    const cssData=useSelector(cssDataSelector);

    const cssFormat=(e)=>e.replace(/(<([^>]+)>)/gi, '');


    const setCssContent=(e)=>{

        dispatch(setCssData(cssFormat(e.target.innerHTML)))
    }

    return (
        <div className="css-editor editor">
            <h4 className="editor__heading">CSS</h4>
            <div className="editor__content" contentEditable onKeyUp={setCssContent}/>

        </div>
    );
};

export default CssEditor;