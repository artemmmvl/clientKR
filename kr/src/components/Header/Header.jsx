import Logo from './Logo'
import photo from './img/logo.png'
import Navigation from "./Navigation";
import React from 'react';
import classes from './style/header.module.css'

export default function Header(){
    return(
        <header className={classes.header}>
            <div className={classes.container}>
                <Logo img={photo}/>
                <Navigation/>

            </div>
        </header>

    )
}
