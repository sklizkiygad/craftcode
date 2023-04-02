

import React, {useEffect, useState} from "react";


import {Navigate} from "react-router-dom";
import {Outlet} from "react-router-dom";
import {useNavigate} from "react-router-dom";



export const ProtectedRoutes = () => {

    const navigate=useNavigate();
    const[isUserAuth,setIsUserAuth]=useState(false);

    const checkIsUserAuth=()=>{
        if(window.localStorage.getItem('craftCodeUser')){
            setIsUserAuth(true)
            navigate('/')

        }
        else{
            setIsUserAuth(false)
        }
    }
    useEffect(()=>{
        checkIsUserAuth()
    },[])
    return(

            isUserAuth? <Outlet/>: <Navigate to="/login"/>

    )




};