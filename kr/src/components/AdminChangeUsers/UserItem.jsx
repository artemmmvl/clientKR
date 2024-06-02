import React from 'react';
import classes from "./admin.module.css";
import {NavLink, useNavigate} from "react-router-dom";

export default function UserItem(props){

    const serverUrl =process.env.REACT_APP_SERVER_IMG;
    const navigate=useNavigate()
    return(

            <tr>
                <td className={classes.id} onClick={()=>navigate('/profile/'+props.user.id)}>
                    <NavLink to={'/profile/'+props.user.id}>{props.user.id}</NavLink>
                </td>
                <td className={classes.img}>
                    <img width={50} height={50} src={serverUrl+props.user.img}/>
                </td>
                <td className={classes.firstname}>
                    {props.user.firstname}
                </td>
                <td className={classes.birhtday}>
                    {new Date(props.user.birthday*1000).toLocaleDateString("ru-RU")}
                </td>
                <td className={classes.gender}>
                    {props.user.gender}
                </td>
                <td className={classes.email}>
                    {props.user.email}
                </td>
                <td className={classes.aboutMe}>
                    {props.user.aboutMe}
                </td>
                <td className={classes.city}>
                    {props.user.city}
                </td>
                <td className={classes.tg}>
                    {props.user.tg}
                </td>
                <td className={classes.vk}>
                    {props.user.vk}
                </td>
                <td className={classes.role}>
                    {props.user.role}
                </td>

            </tr>


    )

}

