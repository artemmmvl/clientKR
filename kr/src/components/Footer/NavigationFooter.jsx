
import React from 'react';
import './footer.css'


export default function NavigationFooter() {
    return (
        <div className="naviganion-container">
            <h2 className="h-nav">Навигация</h2>
            <div className="line-h"></div>
            <div className="">
                <ul className="ul-nav">
                    <li>
                        <a href="/search-friends">Поиск друзей</a>
                    </li>
                    <li>
                        <a href="/favorites">Избранное</a>
                    </li>
                    <li>
                        <a href="/profile/me">Профиль</a>
                    </li>
                    
                </ul>
            </div>
        </div>
    )
}