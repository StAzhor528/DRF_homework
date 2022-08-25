import React from 'react';
import {Link} from 'react-router-dom';
//import App from '../App.js';

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
          <li>
            {this.is_authenticated() ?
            <button onClick={()=>this.logout()}>Logout</button> :
            <Link to="/login">
                Login
            </Link>}
          </li>
        </ul>

    )
}

export default Menu;