import React from 'react';
import {Link} from "react-router-dom";


export default function LiNavigation(props){
    return(
        <li>

            <Link to={props.href}>
                <img src={props.src}/>
                {props.name}</Link>
        </li>
    )
}