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

import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-javascript';
//import 'prismjs/components/prism-css';
import 'prismjs/themes/prism-twilight.css'; //Example style, you can use another






const CommonEditor = () => {
    const [hint,setHint]=useState('')
    const [hintStyle,setHintStyle]=useState({top:0,left:0})
    const [currentCountLastLetter,setCurrentCountLastLetter]=useState(0)
    const [codeTextInEditor,setCodeTextInEditor]=useState('')
    const [caretPosition,setCaretPosition]=useState(null)
    const [currentCodeEditor,setCurrentCodeEditor]=useState(null)
    const [currentTypeOfDocument,setCurrentTypeOfDocument]=useState('')

    const tabsData=useSelector(tabsDataSelector)
    const dispatch=useDispatch();


    const  emmitFormat = ()=>{

        let source = codeTextInEditor;
          const  data =  extract(source, position(currentCodeEditor).pos);

        if(data){
            setCurrentCountLastLetter(data.abbreviation.length)
            try{
                switch (currentTypeOfDocument) {
                    case "html":

                        return expand(data.abbreviation)

                    case "css":
                        return expand(data.abbreviation,{ type: 'stylesheet' })

                    case "js":
                        return ''

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
        textInEditor=textInEditor.substring(0,position(currentCodeEditor).pos-currentCountLastLetter)+hint+textInEditor.substring(position(currentCodeEditor).pos)

         setCodeTextInEditor(textInEditor)
        setHint('')
    }

    const addBr=(e)=>{
       //  if(e.keyCode === 13){
       //      e.preventDefault()
       //      document.execCommand('insertHTML', true, '\n');
       // }
        if(e.keyCode === 9){
            e.preventDefault();
            insertHint();
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
            setHintStyle({top:offset(currentCodeEditor).top+10,left:offset(currentCodeEditor).left})
            setHint(emmitFormat())

        }

        const timer = setTimeout( () => {
            setCodeContent()
        }, 1000)
        return () => clearTimeout(timer)

    },[codeTextInEditor])

    const getCurrentTabPanel=(e)=>{
        if (!currentTypeOfDocument && tabsData.length){
           setCurrentTypeOfDocument(tabsData[0].type)
        }
        setTimeout(()=>{
            setCurrentCodeEditor(document.querySelector('.npm__react-simple-code-editor__textarea'))
        },0)

        switch (e) {
            case "html":
                return languages.markup
                break;
            case "css":
                return languages.css
                break;
            case "js":
                return languages.js
                break;
            default:
                return languages.markup
                break;


        }

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

                            {/*<pre  className="editor__content" contentEditable onKeyDown={addBr} onKeyUp={e=>setCodeTextInEditor(e.target.innerText)}>*/}

                            {/*</pre>*/}

                            {/*<div className="highLite">*/}
                            {/*    <div className="highLite_colors"></div>*/}
                            {/*    <div className="highLite_editable" data-lang="html" onKeyUp={e=>setCodeTextInEditor(e.target.innerText)}>&lt;h2 class="head"&gt;*/}
                            {/*        TODO: HTML is for &lt;b&gt;homework&lt;/b&gt;*/}
                            {/*        &lt;/h2&gt;</div>*/}
                            {/*</div>*/}





                            <Editor
                                value={codeTextInEditor}
                                onKeyDown={addBr}
                                onValueChange={code => setCodeTextInEditor(code)}
                                highlight={code => highlight(code,getCurrentTabPanel(item.type))}
                                padding={10}
                                style={{
                                    fontFamily: '"Fira code", "Fira Mono", monospace',
                                    fontSize: 15,
                                    background: "#222222",
                                    color:"white",
                                    height:"100%",

                                    wordBreak:"break-all"
                                }}
                            />

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