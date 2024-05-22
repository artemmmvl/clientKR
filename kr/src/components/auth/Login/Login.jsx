import React, { useState } from 'react';
import classes from '../registration/Registration.module.css'
import {NavLink, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import Input from "../Input/Input";
import axios from "axios";
import {dispatches} from "../../../store/reducer";


function LoginForm(props) {

    // console.log(props)

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate=useNavigate()
    const dispatch=useDispatch()

    const serverUrl =process.env.REACT_APP_SERVER_URL;


    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const responseAuth = await axios.post(serverUrl+'/authenticate', {
                "email":username,
                "password":password,

            });
            console.log(responseAuth.data.token)
            dispatch(dispatches.setToken({token: responseAuth.data.token}))
            props.setCheck(true)


            navigate('/')
        }
        catch (ErrorRes){
            console.log(ErrorRes)
            if (ErrorRes.response) {
                console.log('Ошибка! Код состояния:', ErrorRes.response.status);
                setError(ErrorRes.response.data.message)

            }
            else {
                setError('Ошибка')

            }


            setTimeout(() => {
                setError(null)
            }, 3000)


        }

    }
    return (
        <>

        {error!==null?<div className={classes.div_error}>
            <p className="error">{error}</p>
        </div>:null}


        <div className={classes.container_form}>
            <form className={classes.form} onSubmit={handleSubmit}>
                <h2>Вход</h2>
                <div>
                    <Input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)}
                           autoComplete="username"
                    ></Input>
                </div>
                <div>
                    <Input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="password"

                    ></Input>
                </div>
                <button>Вход</button>
                <div className={classes.goToReg}>
                    <p><NavLink className={classes.hrefToRegistr} to="/registration">Нет аккаунта? <span>Зарегистрироваться</span></NavLink></p>
                </div>
            </form>
        </div>
        </>
    );
}

export default LoginForm;