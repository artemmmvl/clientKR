import React, {useEffect, useState} from 'react';
import classes from "./profile.module.css";





function ProfilePicture(props) {

    return(
        <div className={classes.container_profile_img}>
            <div className={classes.div_img_profile}>
                <img src={process.env.REACT_APP_SERVER_IMG+props.img}/>
            </div>
            <div className={classes.profile_name}><p>{props.name}</p></div>
            <div className={classes.profile_city}><p>{props.city}</p></div>



        </div>
    )
}
export default ProfilePicture;