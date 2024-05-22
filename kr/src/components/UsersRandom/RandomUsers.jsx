import React, {useEffect, useState} from 'react';
import classes from "./searchUser.module.css";
import skip from './skip.png'
import like from './like.png'
import dislike from './dislike.png'
import axios from "axios";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

export default function UserRandom(props) {
    const serverUrl =process.env.REACT_APP_SERVER_URL;
    const serverUrlImg =process.env.REACT_APP_SERVER_IMG;
    // console.log(serverUrl)
    const token=useSelector(state => state.auth.token)
    const [id, setId]=useState(null)
    const [city, setCity] = useState();
    const [position, setPosition]=useState(-1)
    const [aboutMe, setAboutMe] = useState();
    const [age, setAge]=useState()
    const [img, setImg] = useState(null);
    const [data, setData] = useState(null);
    const [name, setName] = useState('');
    const [error, setError] = useState(null);
    const [checkData, setCheck] = useState(false);


    // console.log("data")
    // console.log(data)
    useEffect(() => {
        const getData = async () => {
            try {
                const config = {
                    headers: {
                        'Authorization': "Bearer "+token
                    }
                };
                axios.get(serverUrl+'/random-users?limit=5', config)
                    .then(response => {
                        console.log('response')
                        setData(response.data)
                        setName(response.data[0].firstname)
                        setPosition(1)

                        // console.log(())
                        setAge(new Date().getFullYear()-new Date(response.data[0].birthday*1000).getFullYear())
                        // console.log(new Date(response.data.birthday*1000).getDate())


                        setAboutMe(response.data[0].aboutMe)
                        setCity(response.data[0].city)
                        setImg(response.data[0].img)
                        setId(response.data[0].id)




                    })
                    .catch(error => {
                        console.error(error);
                        setError(error)
                    });

            } catch (Error) {
                console.log(Error)

            }
        }
        getData()
        // Вызываем функцию получения данных при монтировании компонента
    }, [serverUrl, token, checkData]);
    const sendLike = async () => {
        try {

            const responseAuth = await axios.post(serverUrl+'/users/like', {
                    id:id
                },
                {
                    headers: {

                        'Authorization': "Bearer "+token
                    }
                });
            console.log(responseAuth)
            if(position===5){
                setCheck(true)
            }
            setAge(new Date().getFullYear()-new Date(data[position].birthday*1000).getFullYear())
            setName(data[position].firstname)
            setId(data[position].id)
            setCity(data[position].city)
            setAboutMe(data[position].aboutMe)
            setImg(data[position].img)

            setPosition(position+1)


        }
        catch (Error){
            console.log(Error)
        }
    }
    const sendDisLike = async () => {
        try {

            const responseAuth = await axios.post(serverUrl+'/users/skip', {
                    id:id
                },
                {
                    headers: {

                        'Authorization': "Bearer "+token
                    }
                });
            console.log(responseAuth)
            if(position===5){
                setCheck(true)
            }
            setAge(new Date().getFullYear()-new Date(data[position].birthday*1000).getFullYear())
            setName(data[position].firstname)
            setId(data[position].id)
            setCity(data[position].city)
            setAboutMe(data[position].aboutMe)
            setImg(data[position].img)

            setPosition(position+1)


        }
        catch (Error){
            console.log(Error)
        }
    }
    return(
        <>
            {
                (data===null)?<div className={classes.container}>Loading...</div>:(<div className={classes.container}>
                    <div className={classes.item}>
                        <div className={classes.div_img}>
                            <img src={serverUrlImg+img}/>
                            <div className={classes.dislike_div}>
                                <button onClick={sendDisLike}>
                                    <img src={skip}/>
                                </button>
                            </div>
                            <div className={classes.like_div}>
                                <button onClick={sendLike}>

                                    <img src={like}/>
                                </button>
                            </div>

                        </div>
                        <div className={classes.info}>
                            <div className={classes.name}>
                                <p>{name}, {age}</p>
                            </div>
                            <div className={classes.city}>
                                <p>{city}</p>
                            </div>
                            <div className={classes.aboutMe}>
                                <p>Обо мне:</p>
                                <p>{aboutMe}</p>
                            </div>

                        </div>
                    </div>
                </div>)
            }


        </>
    )
}
