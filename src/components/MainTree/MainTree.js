import React, {useEffect} from 'react';
import './MainTree.css';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFile, faFolderBlank} from "@fortawesome/free-solid-svg-icons";
import {useDispatch, useSelector} from "react-redux";
import {
    cssDataSelector,
    htmlDataSelector,
    jsDataSelector, setTabsData,
    setTreeData, tabsDataSelector,
    treeDataSelector
} from "../../redux/slices/codeSlice";
import {faCss3, faHtml5, faJs} from "@fortawesome/free-brands-svg-icons";

const MainTree = () => {


    const htmlData=useSelector(htmlDataSelector)
    const cssData=useSelector(cssDataSelector)
    const jsData=useSelector(jsDataSelector)
    const treeData=useSelector(treeDataSelector)
    const tabsData=useSelector(tabsDataSelector)

    const dispatch=useDispatch()


    const currentDataTree = [
        {
                 id: "1",
                 name: "css",
                 children: [
                     { id: "css1", name: "style.css", type:'css', content:cssData},
                 ],
             },

        {
            id: "2",
            name: "js",
            children: [
                { id: "js1", name: "script.js",type:'js', content: jsData },
            ],
        },
        {id: "3", name: "index.html", type:'html', content:htmlData},
    ];

    // useEffect(()=>{
    //     dispatch(setTreeData(currentDataTree))
    // },[currentDataTree])

    useEffect(()=>{
        dispatch(setTreeData(currentDataTree))
    },[])

    const closeFolder=(e)=>{


       if(e.target.classList.contains('close-folder')){
           e.target.classList.remove('close-folder')
       }
       else {
          e.target.classList.add('close-folder')
       }

    }

    const addTabFile=(e)=>{
        dispatch(setTabsData(e))
    }

    const getIconForItem=(e)=>{
        switch (e) {
            case "html":
                return <FontAwesomeIcon icon={faHtml5} />

            case "css":
                return <FontAwesomeIcon icon={faCss3} />

            case "js":
               return <FontAwesomeIcon icon={faJs} />

            default:
               return <FontAwesomeIcon icon={faFile}/>


        }


    }

    return (
        <div className="main-tree">
            <ul className="main-tree__list">
                {treeData.map((item)=>{
                    if(item.children){
                        return <li className="main-tree__list__folder" onClick={closeFolder} key={item.id}>
                            <FontAwesomeIcon icon={faFolderBlank} /> {item.name}
                        <ul>{item.children.map((subItem)=>{
                            return <li className="main-tree__list__folder__file"
                                       onClick={()=>addTabFile(subItem)}
                                       key={subItem.id}>
                                {getIconForItem(subItem.type)} {subItem.name}
                            </li>
                        })}
                        </ul>
                        </li>
                    }
                    else{
                        return <li className="main-tree__list__file"
                                   onClick={()=>addTabFile(item)}
                                   key={item.id}>
                            {getIconForItem(item.type)} {item.name}
                        </li>
                    }

                })}
            </ul>
        </div>
    );
};

export default MainTree;

