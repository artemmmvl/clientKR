import React, {useState} from 'react';
import classes from './style/header.module.css'
import friends from "./img/friends.png";
import search from "./img/search.png";
import profile from "./img/profile.png";
import logoutImg from "./img/logout.png";

import LiNavigation from './LiNavigation'
import {useDispatch, useSelector} from "react-redux";
import {dispatches} from "../../store/reducer";
import {Link, useNavigate} from "react-router-dom";

export default function Navigation(){
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const role=useSelector(state => state.auth.role)
    const logout=()=>
    {

        dispatch(dispatches.deleteToken())

        navigate('/login')
    }
    return(
        <nav className={classes.menu_header}>
            <ul>
                <LiNavigation name="Поиск друзей" href="/search-friends" src={search}/>
                <LiNavigation name="Избранное" href="/favorites" src={friends}/>
                <LiNavigation name="Профиль" href="/profile/me" src={profile}/>
                {role==="ROLE_ADMIN"?
                    <LiNavigation name="Пользователи" href="/admin" src={profile}/>
                    :null
                }

                <li>

                    <Link onClick={logout}>
                        <img src={logoutImg}/>
                        Выйти
                    </Link>
                </li>


            </ul>
        </nav>
    )
}