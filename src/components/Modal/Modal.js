import React from 'react';
import './Modal.css'
import {useDispatch, useSelector} from "react-redux";
import {setIsOpenModal} from "../../redux/slices/codeSlice";

const Modal = ({children}) => {

    const dispatch = useDispatch()


   const closeModal = () =>{
        dispatch(setIsOpenModal(false))
   }

    return  (
        <div className="modal"  onClick={closeModal}>
            <div className="modal-content" onClick={e=>e.stopPropagation()}>
                {children}
            </div>

        </div>
    );
};

export default Modal;