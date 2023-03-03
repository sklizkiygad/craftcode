import React, {useEffect} from 'react';
import './MainPage.css';
import MainPageEditors from "../../components/MainPageEditors/MainPageEditors";
import IframeViewer from "../../components/IframeViewer/IframeViewer";
import MainTree from "../../components/MainTree/MainTree";
import CommonEditor from "../../components/CommonEditor/CommonEditor";

const MainPage = () => {

    let cur = null, directionOfMove='';



    const divResize=(e,direction)=> {
        e = e || window.event;
        let el = ( e.srcElement || e.target ).parentNode;
        directionOfMove=direction
        cur = { 'el': el, 'x':  e.clientX - el.offsetWidth, 'y': e.clientY - el.offsetHeight}
    }


    const moveDiv=(e)=> {
        if( !cur )
            return;
        e = e || window.event;

        if(directionOfMove==='horizontal'){
            let nx = e.clientX - cur.x;
            if( nx < 40 ) nx = 40;
            cur.el.style.width = nx + 'px';
        }
        else{
            let ny = e.clientY - cur.y;
            if( ny < 30 ) ny = 30;
            cur.el.style.height = ny  + 'px';
        }



        (e.preventDefault) ? e.preventDefault() : e.returnValue = false;
    }

    const unDivResize=(e)=> {
        if( cur )
            cur = null;
    }

    useEffect(()=>{
        document.onmouseup = unDivResize;
        document.onmousemove = moveDiv;
        document.ondragstart = function()
        {
            return false;
        }
    },[])

    return (
        <div className="main-page">
            <div className="main-page__tree-editors">
               <MainTree/>
                {/*<MainPageEditors/>*/}

                <CommonEditor />
                <div className="main-page__editors__resize" onMouseDown={e=>divResize(e,'vertical')}/>
            </div>
                <IframeViewer/>


        </div>
    );
};

export default MainPage;