import React from 'react';
import {Link} from "react-router-dom";
import classes from './style/header.module.css'


// eslint-disable-next-line import/no-anonymous-default-export
export default function Logo({img}){
    return(
        <div className={classes.img_logo}>
            <Link to="/">
                <img src={img}  alt="logo" />
            </Link>
        </div>

    )
}