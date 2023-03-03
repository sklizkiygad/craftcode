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


const CommonEditor = () => {


    const [hint,setHint]=useState('')
    const [hintStyle,setHintStyle]=useState({top:0,left:0})
    const [currentCountLastLetter,setCurrentCountLastLetter]=useState(0)
    const [codeTextInEditor,setCodeTextInEditor]=useState('')
    const [caretPosition,setCaretPosition]=useState(null)

    const[currentCodeEditor,setCurrentCodeEditor]=useState(null)

    const [currentTypeOfDocument,setCurrentTypeOfDocument]=useState('html')




    const tabsData=useSelector(tabsDataSelector)
    const dispatch=useDispatch();





    const  emmitFormat = ()=>{
            const source = codeTextInEditor.trim();
            const data = extract(source, offset(currentCodeEditor).position);
        if(data){
            data.abbreviation? setCurrentCountLastLetter(data.abbreviation.length):setCurrentCountLastLetter(0)
            try{
                return expand(data.abbreviation)
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
       textInEditor=textInEditor.substring(0,textInEditor.length-currentCountLastLetter)
       currentCodeEditor.innerText=textInEditor+hint
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
    const setCssContent=(e)=>{
        dispatch(setCssData(cssFormat(e.target.innerHTML)))
    }
    //css

    //js
    const jsData=useSelector(jsDataSelector);


    const jsFormat=(e)=>e.replace(/(<br class="brToDelete">)/g, "");
    const setJsContent=(e)=>{
        dispatch(setJsData(jsFormat(e.target.innerText)))
    }
    //js


    //html
    const htmlData=useSelector(htmlDataSelector);
    const htmlFormat=()=>codeTextInEditor.replace(/(<br class="brToDelete">)/g, "");
    const setHtmlContent=()=>{

        console.log(codeTextInEditor)



        dispatch(setHtmlData(codeTextInEditor))
    }

    //html

    useEffect(()=>{
        console.log('dd')
    },[tabsData])


    const setCodeContent=()=>{

       // setCaretPosition(offset(editorRef.current));
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
     setCurrentCodeEditor(document.querySelector('.react-tabs__tab-panel--selected > .common-editor > .editor__content'))
    }

    return (

        // <div className="common-editor">
        //     <h4 className="editor__heading">{typeOfDocument}</h4>
        //     <div ref={editorRef}  className="editor__content" contentEditable onKeyDown={addBr} onKeyUp={e=>setCodeTextInEditor(e.target.innerText)}/>
        //
        //     {hint &&
        //     <button style={hintStyle} onClick={insertHint} className="editor__content__hint">{hint}</button>
        //     }
        //
        // </div>
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