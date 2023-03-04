import React, {useEffect, useState} from 'react';
import './CommonEditor.css';
import {useDispatch, useSelector} from "react-redux";
import {
    cssDataSelector,
    htmlDataSelector,
    jsDataSelector,
    setCssData,
    setHtmlData,
    setJsData, tabsDataSelector, treeDataSelector
} from "../../redux/slices/codeSlice";
import expand,{extract} from 'emmet';
import {offset, position} from "caret-pos";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import {text} from "@fortawesome/fontawesome-svg-core";


const CommonEditor = () => {


    const [hint,setHint]=useState('')
    const [hintStyle,setHintStyle]=useState({top:0,left:0})
    const [currentCountLastLetter,setCurrentCountLastLetter]=useState(0)
    const [codeTextInEditor,setCodeTextInEditor]=useState('')
    const [caretPosition,setCaretPosition]=useState(null)

    const[currentCodeEditor,setCurrentCodeEditor]=useState(null)

    const [currentTypeOfDocument,setCurrentTypeOfDocument]=useState('')




    const tabsData=useSelector(tabsDataSelector)
    const dispatch=useDispatch();

    useEffect(()=>{
        console.log(currentCodeEditor)
    },[currentCodeEditor])





    const  emmitFormat = ()=>{

            const source = codeTextInEditor;
            const data =  extract(source, position(currentCodeEditor).pos);
        if(data){
            data.abbreviation? setCurrentCountLastLetter(data.abbreviation.length):setCurrentCountLastLetter(0)
            try{
                switch (currentTypeOfDocument) {
                    case "html":
                        console.log(currentTypeOfDocument)
                        return expand(data.abbreviation)

                    case "css":
                        return expand(data.abbreviation,{ type: 'stylesheet' })

                    case "js":
                        return expand(data.abbreviation,{syntax: 'script'})

                    default:
                        return expand(data.abbreviation)


                }

            }
            catch (e) {
                console.log(e)
            }
        }
        else{
            return ''
        }
    }





    const insertHint=()=>{
       let textInEditor=codeTextInEditor

        console.log(position(currentCodeEditor).pos)


        textInEditor=textInEditor.substring(0,position(currentCodeEditor).pos-currentCountLastLetter)+hint+textInEditor.substring(position(currentCodeEditor).pos)


         currentCodeEditor.innerText=textInEditor
         setCodeTextInEditor(textInEditor)
        setHint('')
    }

    const addBr=(e)=>{
        if(e.keyCode === 13){
           e.preventDefault();
           document.execCommand('insertHTML', false, '<br class="brToDelete"><br>');
           return false
       }

    }


    //css
    const cssData=useSelector(cssDataSelector);
    const cssFormat=(e)=>e.replace(/(<([^>]+)>)/gi, '');
    const setCssContent=()=>{
        dispatch(setCssData(cssFormat(codeTextInEditor)))
    }
    //css

    //js
    const jsData=useSelector(jsDataSelector);


    const jsFormat=(e)=>e.replace(/(<br class="brToDelete">)/g, "");
    const setJsContent=()=>{
        dispatch(setJsData(jsFormat(codeTextInEditor)))
    }
    //js


    //html
    const htmlData=useSelector(htmlDataSelector);
    const htmlFormat=()=>codeTextInEditor.replace(/(<br class="brToDelete">)/g, "");
    const setHtmlContent=()=>{
        dispatch(setHtmlData(codeTextInEditor))
    }

    //html

    useEffect(()=>{
        getCurrentTabPanel();
    },[tabsData])


    const setCodeContent=()=>{
        switch (currentTypeOfDocument) {
            case 'html':
                setHtmlContent();
                break;

            case 'css':
                setCssContent();
                break;

            case 'js':
                setJsContent();
                break;

            default:
                break;
        }
    }


    useEffect(()=>{


        if(currentCodeEditor){
            setHint('')
            setHintStyle({top:offset(currentCodeEditor).top+10,left:offset(currentCodeEditor).left})
            setHint(emmitFormat())
        }

        const timer = setTimeout( () => {
            setCodeContent()
        }, 1000)
        return () => clearTimeout(timer)

    },[codeTextInEditor])

    const getCurrentTabPanel=()=>{
        setHint('')
        if (!currentTypeOfDocument && tabsData.length){
           setCurrentTypeOfDocument(tabsData[0].type)
        }
        setTimeout(()=>{
            setCurrentCodeEditor(document.querySelector('.react-tabs__tab-panel--selected > .common-editor > .editor__content'))
        },0)


    }

    return (
        <div className="common-editor-tabs">
            <Tabs onSelect={() => getCurrentTabPanel()}>
                <TabList>
                    {
                        tabsData.map((item,index)=>{
                        return <Tab onClick={()=>setCurrentTypeOfDocument(item.type)} key={index}>{item.name}</Tab>
                    })}
                </TabList>

                {
                tabsData.map((item,index)=>{
                        return (<TabPanel key={index}>
                        <div className="common-editor">
                            <div  className="editor__content" contentEditable onKeyDown={addBr} onKeyUp={e=>setCodeTextInEditor(e.target.innerText)}/>
                            {hint &&
                            <button style={hintStyle} onClick={insertHint} className="editor__content__hint">{hint}</button>
                            }
                        </div>
                    </TabPanel>)
                })}


            </Tabs>


        </div>
    );
};

export default CommonEditor;