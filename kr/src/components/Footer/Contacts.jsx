import React from 'react';
import './footer.css'
import mail from './img/mail.jpeg'
import geo from './img/geo.png'
import tg from './img/tg1.0.png'
import vk from './img/vk1.0.png'




export default function Contacts() {
    return (
        <div className="cont-container">
            <h2 className="h-cont">Контакты</h2>
            <div className="line-h"></div>
            <div className="cont">
                <div className="cont-footer">
                    <div>
                        <a href="mailto:  cvlastyk@mail.ru">
                            <img src={mail} height="12"/>
                            cvlastyk@mail.ru
                        </a>
                    </div>
                    <div>
                        <a href="https://yandex.ru/maps/157/minsk/house/Zk4YcwJjSUMDQFtpfXR4dHprYA==/?ll=27.552777%2C53.895596&amp;z=17.45">
                            <img src={geo} height="12"/>
                            г. Москва, Проспект Вернадского 78
                        </a>
                    </div>
                </div>
                <div className="soc-net-footer">

                    <div><a href="https://vk.com/artemvlastyuk"><img src={vk} height="30"
                                                                   width="30"/></a>
                    </div>

                    <div><a href="https://t.me/artemvlastyuk"><img src={tg} height="30"
                                                                width="30"/></a>
                    </div>
                </div>
                <div className="about-developer">
                    <a href="https://instagram.com/artem.vlastyuk">Разработано</a>
                </div>
            </div>
        </div>

    )
}