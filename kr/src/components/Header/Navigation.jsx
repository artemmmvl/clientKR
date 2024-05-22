import React from 'react';
import classes from './style/header.module.css'
import friends from "./img/friends.png";
import search from "./img/search.png";
import profile from "./img/profile.png";
import logout from "./img/logout.png";

import LiNavigation from './LiNavigation'

export default function Navigation(){
    return(
        <nav className={classes.menu_header}>
            <ul>
                <LiNavigation name="Поиск друзей" href="/search-friends" src={search}/>
                <LiNavigation name="Избранное" href="/favorites" src={friends}/>
                <LiNavigation name="Профиль" href="/profile/me" src={profile}/>
                <LiNavigation name="Выйти" href="/logout" src={logout}/>

            </ul>
        </nav>
    )
}