import React from 'react';
import './TemplatesSelect.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngular, faHtml5, faJs, faReact, faVuejs} from "@fortawesome/free-brands-svg-icons";
import {useDispatch} from "react-redux";
import {setIsOpenModal, setTypeOfSelectedProject} from "../../redux/slices/codeSlice";
const TemplatesSelect = () => {

    const dispatch = useDispatch();


    const selectTypeOfProject=(typeOfProject)=>{
        dispatch(setTypeOfSelectedProject(typeOfProject))
        window.localStorage.setItem('craftCodeTypeOfProject',typeOfProject)
        dispatch(setIsOpenModal(false))
    }

    return (
        <div className="templates-select">

            <h3 className="templates-select__head">Выберите шаблон проекта</h3>

            <div className="templates-select__list">
            <div className="templates-select__list__item" onClick={()=>selectTypeOfProject('static')}>
                <FontAwesomeIcon icon={faHtml5} className="html-brand"/>
                <p>Static</p>
            </div>

            <div className="templates-select__list__item" onClick={()=>selectTypeOfProject('vanilla')}>
                <FontAwesomeIcon icon={faJs} className="js-brand"/>
                <p>Vanilla</p>
            </div>

            <div className="templates-select__list__item" onClick={()=>selectTypeOfProject('react')}>
                <FontAwesomeIcon icon={faReact} className="react-brand"/>
                <p>React</p>
            </div>

            <div className="templates-select__list__item" onClick={()=>selectTypeOfProject('vue')}>
                <FontAwesomeIcon icon={faVuejs} className="vue-brand"/>
                <p>Vue</p>
            </div>

            <div className="templates-select__list__item" onClick={()=>selectTypeOfProject('angular')}>
                <FontAwesomeIcon icon={faAngular} className="angular-brand"/>
                <p>Angular</p>
            </div>
            </div>


        </div>
    );
};

export default TemplatesSelect;