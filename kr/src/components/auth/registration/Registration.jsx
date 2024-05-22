import React, {useRef, useState} from 'react';
import classes  from './Registration.module.css'
import {NavLink, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import Input from "../Input/Input";
import Select from "../Input/Select";
import {cities} from "../../../data/cities";
import axios from "axios";
import SelectReact from 'react-select';
import moment from 'moment';
import {dispatches} from "../../../store/reducer";




function Registration(props) {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [vk, setVk] = useState('');
    const [tg, setTg] = useState('');
    const [img, setImg] = useState(null);


    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setImg(file);
    };


    const [day, setDay] = useState(-1);

    const [month, setMonth] = useState(-1);
    const [year, setYear] = useState(-1);
    const [city, setCity] = useState(-1);
    const [aboutMe, setAboutMe] = useState(null);
    const [gender, setGender] = useState(-1);
    const [error, setError] = useState(null);

    const navigate=useNavigate()
    const dispatch=useDispatch()

    let dateDay=[{valueHtml:-1,value:"День",
        disable:true}]
    const currentYear = new Date().getFullYear();
    const years = [{valueHtml:-1,value:"Год",
        disable:true}];
    const citiesData=cities

    for (let i = 14; i <= 100; i++) {
        years.push({
            "value":currentYear - i,
            "valueHtml":currentYear - i,
        });
    }
    const serverUrl =process.env.REACT_APP_SERVER_URL;
    console.log(serverUrl)
    const months = [
        {
            valueHtml:-1,
            value:"Месяц",
            disable:true
        },
        {   valueHtml:0,
            value:"Январь"
        },
        {   valueHtml:1,
            value:"Февраль"
        }
        ,
        {   valueHtml:2,
            value:"Март"
        },
        {   valueHtml:3,
            value:"Апрель"
        },
        {   valueHtml:4,
            value:"Май"
        },
        {   valueHtml:5,
            value:"Июнь"
        },
        {   valueHtml:6,
            value:"Июль"
        },
        {   valueHtml:7,
            value:"Август"
        },
        {   valueHtml:8,
            value:"Сентябрь"
        },
        {   valueHtml:9,
            value:"Октябрь"
        },
        {   valueHtml:10,
            value:"Ноябрь"},
        {
            valueHtml:11,
            value:"Декабрь"
        }
    ];
    const genders=[{value:'Пол',valueHtml:-1,
        disable:true },{value:"М",valueHtml:'man'},{value:"Ж",valueHtml:'women'}]


    for (let i =1; i<=31; i++){
        dateDay.push({
            "value":i,
            "valueHtml":i
        })
    }
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (day===-1 || year===-1 || month===-1){
            setError("Укажите дату рождения")
            setTimeout(() => {
                setError(null)
            }, 3000)
            console.log('Нет даты')
            return;
        }
        if (gender===-1){
            setError("Укажите пол")
            setTimeout(() => {
                setError(null)
            }, 3000)
            return;
        }
        if (city===-1){
            setError("Укажите город")
            setTimeout(() => {
                setError(null)
            }, 3000)
            return;
        }
        const date = moment({ year, month: month , day });
        if (!date.isValid()) {
            setError("Некорректная дата")
            setTimeout(() => {
                setError(null)
            }, 3000)
            return;
        }


        if (city===-1){
            setError("Укажите город")
            setTimeout(() => {
                setError(null)
            }, 3000)
            return;
        }
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('password', password);
            formData.append('email', username);
            formData.append('city', city);
            formData.append('aboutMe', aboutMe);
            formData.append('gender', gender);
            formData.append('tg', tg);
            formData.append('vk', vk);
            formData.append('img', img);
            formData.append('birthday', Math.floor(new Date(year, month, day) / 1000));

            const responseAuth = await axios.post(serverUrl+'/register', formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
            console.log(responseAuth)
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
    console.log(img)
    return (
        <>
            <div >
                {error!==null?<div className={classes.div_error}>
                    <p className="error">{error}</p>
                </div>:null}
            </div>

        <div className={classes.container_form}>
            <form className={classes.form} onSubmit={handleSubmit}>
                <h2 >Регистрация</h2>
                <div>
                    <Input
                        required={true}
                        type="text" id="name" value={name} onChange={(e) => setName(e.target.value)}
                           autoComplete="name"
                           labelName="Имя:"
                    >
                    </Input>
                </div>
                <div>
                    <label>Дата рождения:</label>
                    <br/>
                    <Select required={true} onChange={(e) => setDay(e.target.value)} value={day} values={dateDay} name="day" id="day" className={classes.day_select}/>
                    <Select required={true} onChange={(e) => setMonth(e.target.value)}  value={month} values={months} name="month" id="month" className={classes.month_select}/>
                    <Select required={true} onChange={(e) => setYear(e.target.value)} value={year} values={years} name="year" id="year" className={classes.year_select}/>

                </div>
                <div>
                    <label>Пол:</label>

                    <Select
                            required={true}
                            onChange={(e) => setGender(e.target.value)}
                            value={gender}
                            values={genders}
                            name="gender"
                            id="gender"
                            className={classes.genderSelect}
                    />

                </div>
                <div>
                    <label>Город:</label>
                    <br/>
                    <br/>

                    <SelectReact
                        options={citiesData.map((city)=>
                        {
                            return {
                                value: city.valueHtml,
                                label: city.value
                            }
                        })}

                        onChange={(e) =>  setCity(e.value)}
                        placeholder="Город"
                    />

                </div>
                <div>
                    <textarea value={aboutMe} name="aboutMe" placeholder="Обо мне" onChange={(e)=>setAboutMe(e.target.value)} className={classes.aboutMe}>
                    </textarea>
                </div>
                <div>
                    <Input
                        required={true}
                        type="email" id="email" value={username} onChange={(e) => setUsername(e.target.value)}
                           autoComplete={null}
                           labelName="Почта:">
                    </Input>
                </div>
                <div>
                    <Input
                        required={false}
                        type="text" id="tg" value={tg} onChange={(e) => setTg(e.target.value)}
                        autoComplete={null}
                        labelName="Telegram:">
                    </Input>
                </div>
                <div>
                    <Input
                        required={false}
                        type="text" id="vk" value={vk} onChange={(e) => setVk(e.target.value)}
                        autoComplete={null}
                        labelName="VK:">
                    </Input>

                </div>
                <div>
                    <Input
                        required={true}
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="password"
                        labelName="Пароль:"
                        minlenght={6}
                    ></Input>
                </div>
                <div>
                    <input required type="file" onChange={handleFileChange} accept=".png, .jpeg, .jpg" />
                </div>

                <button>Зарегистрироваться</button>
                <div className={classes.goToReg}>
                    <p><NavLink className={classes.hrefToRegistr} to="/login">Уже есть аккаунт? <span>Войти</span></NavLink></p>
                </div>
            </form>


        </div>
        </>

    );
}

export default Registration;