import React, {useState} from 'react';
import classes from "./profile.module.css";
import ProfilePicture from "./ProfilePicture";
import ProfileInfo from "./ProfileInfo";
import ItemInfoAboutProfile from "./ItemInfoAboutProfile";



function ProfileSocNetLink(props) {
    return(
        <div className={classes.container_soc_net}>
            <ItemInfoAboutProfile keyItem='VK' value={props.vk} />
            <ItemInfoAboutProfile keyItem='Telegram' value={props.tg} />


        </div>
    )

}
export default ProfileSocNetLink;