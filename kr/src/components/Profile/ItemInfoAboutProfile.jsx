import React, {useState} from 'react';
import classes from "./profile.module.css";




function ItemInfoAboutProfile(props) {
    return(
        <div className={classes.item_profile_info}>
            <div className={classes.key_item}>
                <span>{props.keyItem}</span>
            </div>
            <div className={classes.value_item}>
                <span>{props.value}</span>
            </div>

        </div>
    )

}
export default ItemInfoAboutProfile;