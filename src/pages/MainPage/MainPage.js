import React, {useEffect} from 'react';
import './MainPage.css';

import IframeViewer from "../../components/IframeViewer/IframeViewer";
import MainTree from "../../components/MainTree/MainTree";
import CommonEditor from "../../components/CommonEditor/CommonEditor";
import useChangeDiv from "../../utils/changeDivFunction";
import TemplatesSelect from "../../components/TemplatesSelect/TemplatesSelect";
import Modal from "../../components/Modal/Modal";
import {useSelector} from "react-redux";
import {isOpenModalSelector, typeOfSelectedProjectSelector} from "../../redux/slices/codeSlice";



const MainPage = () => {

    const isOpenModal=useSelector(isOpenModalSelector)
    const typeOfSelectedProject=useSelector(typeOfSelectedProjectSelector)

    useEffect(()=>{

    },[])


    const [divResize]=useChangeDiv()

    return (
        <div className="main-page">

            {isOpenModal &&
            <Modal>
                <TemplatesSelect/>
            </Modal>
            }



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