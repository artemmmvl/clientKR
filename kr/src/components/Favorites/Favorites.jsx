import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useSelector} from "react-redux";
import classes from "./favorites.module.css";
import {useNavigate} from "react-router-dom";





function Favorites(props) {
    const serverUrl =process.env.REACT_APP_SERVER_URL;
    const serverUrlImg =process.env.REACT_APP_SERVER_IMG;
    // console.log(serverUrl)
    const token=useSelector(state => state.auth.token)
    const [data, setData]=useState(null)
    const [error, setError]=useState(null)
    const navigate=useNavigate()
    const favoritesDelete = async (id) => {
        try {

            const responseAuth = await axios.delete(serverUrl+'/favorites/'+id,
                {
                    headers: {

                        'Authorization': "Bearer "+token
                    }
                });
            console.log(responseAuth)
            setData(responseAuth.data)

        }
        catch (Error){
            console.log(Error)
        }
    }

    useEffect(() => {
        const getData = async () => {
            try {
                const config = {
                    headers: {
                        'Authorization': "Bearer "+token
                    }
                };
                axios.get(serverUrl+'/favorites', config)
                    .then(response => {
                        console.log('response')
                        console.log(response.data)
                        setData(response.data)




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
    }, [serverUrl, token]);
    return(
        <>
        {
        (data===null)?(<div className={classes.container}>
            Loading...
        </div>):
            (<div className={classes.container}>
                {
                    data.map(
                        (item)=>(
                            <div className={classes.item}  key={item.id} onClick={(event)=>
                            {
                                navigate('/profile/'+item.id)
                            }}>
                                <div className={classes.img_div}>
                                    <img src={serverUrlImg+item.img}/>
                                </div>
                                <div className={classes.info}>
                                    <div className={classes.name}>
                                        <p>{item.firstname}</p>
                                    </div>
                                    <div className={classes.city}>
                                        <p>{item.city}</p>

                                    </div >
                                    <div className={classes.delete_div}>
                                        <button onClick={

                                            (event)=>{ event.stopPropagation();
                                                favoritesDelete(item.id)}}>удалить</button>
                                    </div>


                                </div>

                            </div>
                        )

                    )
                }

            </div>)
        }
        </>

    )
}
export default Favorites;