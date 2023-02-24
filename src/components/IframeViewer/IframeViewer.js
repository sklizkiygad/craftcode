import React, {useEffect, useRef, useState} from 'react';
import './IframeViewer.css';
import {useDispatch, useSelector} from "react-redux";
import {cssDataSelector, htmlDataSelector, jsDataSelector} from "../../redux/slices/codeSlice";
import parse from 'html-react-parser';


const IframeViewer = () => {

    const iframeRef=useRef();

    const dispatch=useDispatch();
    const htmlData=useSelector(htmlDataSelector);
    const cssData=useSelector(cssDataSelector);
    const jsData=useSelector(jsDataSelector);



    useEffect(()=>{
       insertPageToIframe()
    },[htmlData,cssData,jsData])


    const insertPageToIframe=()=>{

        // insert styles
        const iframeHead=iframeRef.current.contentWindow.document.head;
        iframeHead.innerHTML='<style>'+cssData+'</style>';
        // insert styles

        // insert js
        const iframeScript=iframeRef.current.contentWindow.document.head;
        iframeScript.innerHTML+='<script>'+jsData+'</script>'
        // insert js

        // insert content
        const iframeBody=iframeRef.current.contentWindow.document.body;
         iframeBody.innerHTML=parse(htmlData)
        // insert content


    }





    return (
        <iframe ref={iframeRef}  className="iframe-viewer">
        </iframe>
    );
};

export default IframeViewer;


