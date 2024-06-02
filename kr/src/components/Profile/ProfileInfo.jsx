import React, {useState} from 'react';
import classes from "./profile.module.css";
import ItemInfoAboutProfile from "./ItemInfoAboutProfile";
import LiNavigation from "../Header/LiNavigation";
import {NavLink, useNavigate} from "react-router-dom";




function ProfileInfo(props) {

    const navigate=useNavigate()


    return(
        <div className={classes.container_profile_info}>
            <ItemInfoAboutProfile keyItem='Имя' value={props.data.firstname}></ItemInfoAboutProfile>
            <ItemInfoAboutProfile keyItem='Город' value={props.data.city}></ItemInfoAboutProfile>
            <ItemInfoAboutProfile keyItem='Пол' value={props.data.gender}></ItemInfoAboutProfile>
            <ItemInfoAboutProfile keyItem='Дата рождения' value={new Date(props.data.birthday*1000).toLocaleDateString("ru-RU")}></ItemInfoAboutProfile>
            <ItemInfoAboutProfile keyItem='Почта' value={props.data.email}></ItemInfoAboutProfile>
            <ItemInfoAboutProfile keyItem='Обо мне' value={props.data.aboutMe}></ItemInfoAboutProfile>
            {
                props.change?(
                <div className={classes.buttons}>



                        <div className={classes.change_button} onClick={()=>navigate('/profile/change/'+props.userId)}>
                            <NavLink to={'/profile/change/'+props.userId}>Изменить</NavLink>
                        </div>

                        <div className={classes.delete_button} onClick={()=>props.deleteProfile(props.userId)}>
                            <p>Удалить</p>
                        </div>
                </div>
                ):null
            }
        </div>

    )
}
export default ProfileInfo;