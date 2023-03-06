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
import Editor from "react-simple-code-editor";






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


    const  emmitFormat = ()=>{
        let source = codeTextInEditor.replace('<br class="brToDelete">', ' ');
        source = source.replace('<br>', ' ');
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
        currentCodeEditor.innerHTML=''
         currentCodeEditor.append(textInEditor)
        console.log(textInEditor)
         setCodeTextInEditor(textInEditor)
        setHint('')
    }

    const addBr=(e)=>{
        if(e.keyCode === 13){
            e.preventDefault()
            document.execCommand('insertHTML', true, '\n');
       }
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


    const lang = {
        js: {
            equa: /(\b=\b)/g,
            quot: /(`|'|"|&#39;|&#34;)/g,
            comm: /((\/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*+\/)|(\/\/.*))/g,
            logi: /(%=|%|\-|\+|\*|&amp;{1,2}|\|{1,2}|&lt;=|&gt;=|&lt;|&gt;|!={1,2}|={2,3})/g,
            numb: /(\d+(\.\d+)?(e\d+)?)/g,
            func: /(?<=^|\s*)(async|console|alert|Math|Object|Array|String|class(?!\s*\=)|function|(?<=\.)\D\w*)(?=\b)/g,
            decl: /(?<=^|\s*)(var|let|const)/g, // Declarations
            pare: /(\(|\))/g,
            squa: /(\[|\])/g,
            curl: /(\{|\})/g,
        },
        // Props order matters! Here I rely on "tags:"
        // being already applied in the previous iteration
        html: {
            tags: /(?<=&lt;(?:\/)?)(\w+)(?=\s|\&gt;)/g,
            angl: /(&lt;\/?|&gt;)/g,
            attr: /((?<=<i class=html_tags>\w+<\/i>)[^<]+)/g,
        }
    };

    const highLite = el => {
        const dataLang = el.dataset.lang; // Detect "js", "html", "py", "bash", ...
        const langObj = lang[dataLang]; // Extract object from lang regexes dictionary
        let html = el.innerHTML;
        Object.keys(langObj).forEach(function(key) {
            html = html.replace(langObj[key], `<i class=${dataLang}_${key}>$1</i>`);
        });
        el.previousElementSibling.innerHTML = html; // Finally, show highlights!
    };

    const editors = document.querySelectorAll(".highLite_editable");
    editors.forEach(el => {
        el.contentEditable = true;
        el.spellcheck = false;
        el.autocorrect = "off";
        el.autocapitalize = "off";
        el.addEventListener("input", highLite.bind(null, el));
        el.addEventListener("input", highLite.bind(null, el));
        highLite(el); // Init!
    });

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

                            <div className="highLite">
                                <div className="highLite_colors"></div>
                                <div className="highLite_editable" data-lang="html" onKeyUp={e=>setCodeTextInEditor(e.target.innerText)}>&lt;h2 class="head"&gt;
                                    TODO: HTML is for &lt;b&gt;homework&lt;/b&gt;
                                    &lt;/h2&gt;</div>
                            </div>





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