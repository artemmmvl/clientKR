import React, {useEffect, useState} from 'react';
import classes from "./profile.module.css";
import ProfilePicture from "./ProfilePicture";
import ProfileInfo from "./ProfileInfo";
import ProfileSocNetLink from "./ProfileSocNetLink";
import axios from "axios";

import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {dispatches} from "../../store/reducer";



 function Profile(props) {
     const { id } = useParams();
     console.log(id)
     const serverUrl =process.env.REACT_APP_SERVER_URL;
     const token=useSelector(state => state.auth.token)
     const [data, setData]=useState(null)
     const [error, setError]=useState(null)
     const navigate=useNavigate()
     const role=useSelector(state => state.auth.role)
     useEffect(() => {
         const getData = async () => {
             try {
                 const config = {
                     headers: {
                         'Authorization': "Bearer "+token
                     }
                 };
                 axios.get(serverUrl+'/users/'+id, config)
                     .then(response => {
                         console.log('response')
                         console.log(response.data);
                        setData(response.data)
                         // return [true, response];
                         // Действия с данными из ответа
                     })
                     .catch(error => {
                         console.error(error);
                         setError(error)
                         // Обработка ошибки
                     });

             } catch (Error) {
                 console.log(Error)

             }
         }
            getData()
          // Вызываем функцию получения данных при монтировании компонента
     }, [serverUrl, token, id]);

    if(error!==null){

    }
    console.log(data)

     const deleteProfile = async () => {
         try {

             const responseAuth = await axios.delete(serverUrl+'/users/'+id,
                 {
                     headers: {

                         'Authorization': "Bearer "+token
                     }
                 });
             console.log(responseAuth)
             if(role!=="ROLE_ADMIN"&& id!=="me"){
                 dispatches.deleteToken()
             }
             dispatches.deleteToken()
             navigate('/profile/me')

         }
         catch (Error){
             console.log(Error)
         }

     }


     return (
        <>
            {data ? (
                <div className={classes.container}>
                    {/* Здесь можно использовать данные из переменной data */}
                    <ProfilePicture img={data.img} name={data.firstname} city={data.city}/>
                     <ProfileInfo data={data} change={id==='me' || role==="ROLE_ADMIN" } userId={id} deleteProfile={deleteProfile}/>
                    <ProfileSocNetLink tg={data.tg} vk={data.vk}/>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </>
    )
}
export default Profile;