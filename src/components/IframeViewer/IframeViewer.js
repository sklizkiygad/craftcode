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



        // insert content
        const iframeBody=iframeRef.current.contentWindow.document.body;
         iframeBody.innerHTML=htmlData
        // insert content


        // // insert js
        // const iframeScript=iframeRef.current.contentWindow.document.body;
        // iframeScript.append('<script>'+jsData+'</script>')
        // // insert js

// insert js
        let script = iframeRef.current.contentWindow.document.createElement('script');
         script.innerHTML=jsData;
         script.onload = function() {
            alert("Script loaded and ready");
        };

        iframeRef.current.contentWindow.document.getElementsByTagName('body')[0].appendChild(script);
    }
    // insert js





    return (
        <iframe ref={iframeRef}  className="iframe-viewer">
        </iframe>
    );
};

export default IframeViewer;


