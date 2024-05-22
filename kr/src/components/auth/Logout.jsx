import React from 'react';
import {useDispatch} from "react-redux";
import {dispatches} from "../../store/reducer";
import {useNavigate} from "react-router-dom";

export default function Logout(props){
    const dispatch=useDispatch()
    dispatch(dispatches.deleteToken())
    const navigate=useNavigate()
    props.setCheck(false)
    navigate('/login')

}