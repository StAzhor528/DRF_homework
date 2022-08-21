import React from 'react'
import {Link} from 'react-router-dom';
const Menu = () => {
    return (
        <ul class="navbar">
          <li>
            <Link to="/">
                Пользователи
            </Link>
          </li>
          <li>
            <Link to="/projects">
                Проекты
            </Link>
          </li>
          <li>
            <Link to="/todos">
                Заметки
            </Link>
          </li>
        </ul>

    )
}

export default Menu