import {useEffect, useRef, useState} from "react";

const useChangeDiv=()=>{
    let cur = useRef('');
    const directionOfMove=useRef('')
    const [isVer,setIsVer]=useState(false)



    const divResize=(e,direction)=> {
        // e = e || window.event;
        setIsVer(prev=>!prev)
        let el = e.target.parentNode;

        directionOfMove.current=direction

        cur.current = { 'el': el, 'x':  e.clientX - el.offsetWidth, 'y': e.clientY - el.offsetHeight}
        console.log(cur.current)

    }


    const moveDiv=(e)=> {
        console.log(cur.current)
        // console.log(cur,' ', directionOfMove=='horizontal', directionOfMove)

        if( !cur.current )
            return;
        e = e || window.event;


        if(directionOfMove.current=='horizontal'){


            let nx = e.clientX - cur.current.x;
            if( nx < 220) nx = 220;
            cur.current.el.style.width = nx + 'px';
        }
        else if(directionOfMove.current=='vertical'){
            let ny = e.clientY - cur.current.y;
            if( ny < 30 ) ny = 30;
            cur.current.el.style.height = ny  + 'px';
        }



        (e.preventDefault) ? e.preventDefault() : e.returnValue = false;
    }

    const unDivResize=(e)=> {

        if( cur.current )
            cur.current = null;


    }

    useEffect(()=>{

        if(isVer){
            document.onmouseup = unDivResize;
            document.onmousemove = moveDiv;
            // document.ondragstart = function()
            // {
            //     return false;
            //
            // }
            return () => {
                document.removeEventListener("onmouseup",unDivResize);
                document.removeEventListener("onmousemove",moveDiv);
            };
        }

    },[isVer])

    return [divResize]
}
export default useChangeDiv

