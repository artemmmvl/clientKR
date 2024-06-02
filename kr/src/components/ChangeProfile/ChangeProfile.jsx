import React, {useEffect, useState} from 'react';
import classes  from '../auth/registration/Registration.module.css'
import {NavLink, useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Input from "../auth/Input/Input";
import Select from "../auth/Input/Select";
import {cities} from "../../data/cities";
import axios from "axios";
import SelectReact from 'react-select';
import moment from 'moment';
import {dispatches} from "../../store/reducer";




export default function ChangeProfile(props) {
    const { id } = useParams();

    const [data, setData] = useState(undefined);
    const role=useSelector(state =>state.auth.role)
    console.log(role)
    const navigate=useNavigate()
    console.log('id '+id)

    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [vk, setVk] = useState('');
    const [tg, setTg] = useState('');
    const [img, setImg] = useState(null);
    const serverUrl =process.env.REACT_APP_SERVER_URL;
    const token=useSelector(state => state.auth.token)
    const [day, setDay] = useState(-1);
    const [month, setMonth] = useState(-1);
    const [year, setYear] = useState(-1);
    const [city, setCity] = useState();
    const [aboutMe, setAboutMe] = useState();
    const [gender, setGender] = useState(1);
    console.log("name"+name)
    console.log("email"+username)
    console.log(data)
    const [error, setError] = useState(null);

    useEffect(() => {
        const getData = async () => {
                if(role!=="ROLE_ADMIN" && id!=="me"){
                    console.log("AAA")
                    navigate('/profile/me')
                    return;
                }

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
                        setName(response.data.firstname)
                        setUsername(response.data.email)

                        console.log(new Date(response.data.birthday*1000).toDateString())
                        setDay(new Date(response.data.birthday*1000).getDate())
                        // console.log(new Date(response.data.birthday*1000).getDate())

                        setMonth(new Date(response.data.birthday*1000).getMonth())
                        setYear(new Date(response.data.birthday*1000).getFullYear())
                        setAboutMe(response.data.aboutMe)
                        setTg(response.data.tg)
                        setVk(response.data.vk)


                        setName(response.data.firstname)


                    })
                    .catch(error => {
                        console.log("Error 1")
                        console.log(error)
                        // console.error(error);
                        // setError(error)
                        // Обработка ошибки
                    });


        }
        getData()
        // Вызываем функцию получения данных при монтировании компонента
    }, [serverUrl, token]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setImg(file);
    };







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
            formData.append('gender', gender);
            formData.append('tg', tg);
            formData.append('vk', vk);
            if(img!==null){
                formData.append('img', img);
            }
            if(aboutMe!==null){
                formData.append('aboutMe', aboutMe);

            }
            formData.append('birthday', Math.floor(new Date(year, month, day) / 1000));
            console.log(formData)

            const responseAuth = await axios.patch(serverUrl+'/users/'+id, formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': "Bearer "+token
                    }
                });
            console.log(responseAuth)
            // dispatch(dispatches.setToken({token: responseAuth.data.token}))
            // props.setCheck(true)
            navigate('/profile/'+id)



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
    console.log(day)
    console.log(month)
    console.log(year)
    return (

        <>
            <div >
                {error!==null?<div className={classes.div_error}>
                    <p className="error">{error}</p>
                </div>:null}
            </div>
            {data!==undefined ? (
            <div className={classes.container_form}>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <h2 >Изменение профиля</h2>
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
                            required={true} disabled={true}
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
                            required={false}
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="password"
                            labelName="Пароль: (укажите, если хотите изменить)"
                            minlenght={6}
                        ></Input>
                    </div>
                    <div>
                        <input  type="file" onChange={handleFileChange} accept=".png, .jpeg, .jpg" />
                    </div>

                    <button>Зарегистрироваться</button>
                    <div className={classes.goToReg}>
                        <p><NavLink className={classes.hrefToRegistr} to="/login">Уже есть аккаунт? <span>Войти</span></NavLink></p>
                    </div>
                </form>


            </div>
        ): (
                <p>Loading...</p>
                )}
        </>
    );
}

