import React, {useEffect, useState} from 'react';
import classes from "./admin.module.css";
import {useSelector} from "react-redux";
import axios, {get} from "axios";
import UserItem from "./UserItem";




export default  function AdminChangeUsers(props) {
    console.log('adminChangeUsers')
    const role=useSelector(state => state.auth.role)
    const token=useSelector(state => state.auth.token)
    const serverUrl =process.env.REACT_APP_SERVER_URL;
    const [data, setData]=useState(null)

    const [error, setError]=useState(null)

    useEffect(() => {
        const getData = async () => {

                const config = {
                    headers: {
                        'Authorization': "Bearer "+token
                    }
                };
                axios.get(serverUrl+'/admin/users', config)
                    .then(response => {
                        console.log('response')
                        console.log(response.data)
                        setData(response.data)




                    })
                    .catch(Error => {
                        console.log('error')
                        console.error(Error);
                        setError(Error)
                    });


        }
        getData()
        // Вызываем функцию получения данных при монтировании компонента
    }, [serverUrl, token]);
    console.log(data)
    console.log(error)
    return(
        <>


            {role === "ROLE_ADMIN" ?
                <div className={classes.container}>
                    {
                        (data!==null)?(
                            <table>

                                {/*<tr>*/}
                                {/*    <th>id</th>*/}
                                {/*    <th>обо мне</th>*/}

                                {/*</tr>*/}
                                <tbody>
                                {
                                    data.map((user) =>
                                        (
                                            <UserItem user={user} key={user.id}>

                                            </UserItem>
                                        )
                                    )
                                }
                                </tbody>
                            </table>
                        ): (<div className={classes.container}>Loading...</div>)
                    }

                </div>
                :
                <div className={classes.container}>
                    Страница недоступна
                </div>
        }

    </>
    )

}