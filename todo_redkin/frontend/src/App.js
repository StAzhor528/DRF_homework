import React from 'react';
import logo from './logo.svg';
import './App.css';
import UserList from './components/User.js';
import ProjectList from './components/Projects.js';
import TODOList from './components/TODO.js';
import LoginForm from './components/Auth.js';
import NotFound404 from './components/NotFound404.js';
import Menu from './components/Menu.js';
import Footer from './components/Footer.js';
import axios from 'axios';
import {BrowserRouter, Route, Routes, Link} from 'react-router-dom';
import Cookies from 'universal-cookie';


class App extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
           'users': [],
           'projects': [],
           'todos': [],
           'token': '',
        }
    }

    set_token(token) {
        const cookies = new Cookies()
        cookies.set('token', token)
        this.setState({'token': token}, () => this.load_data())
    }

    is_authenticated() {
        return !!this.state.token
    }

    logout() {
        this.set_token('')
    }

    get_token_from_storage() {
        const cookies = new Cookies()
        const token = cookies.get('token')
        this.setState({'token': token}, () => this.load_data())
    }

    get_token(username, password) {
        axios.post('http://127.0.0.1:8000/api-token-auth/', {username: username, password: password})
        .then(response => {
            this.set_token(response.data['token'])
        }).catch(error => alert('Неверный логин или пароль'))
    }

    load_data() {
    const headers = this.get_headers()
        axios.get('http://127.0.0.1:8000/api/users', {headers})
            .then(response => {
                const users = response.data.results
                    this.setState(
                    {
                        'users': users
                    }
                )
            }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/projects', {headers})
            .then(response => {
                const projects = response.data.results
                    this.setState(
                    {
                        'projects': projects
                    }
                )
            }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/todo', {headers})
            .then(response => {
                const todos = response.data.results
                    this.setState(
                    {
                        'todos': todos
                    }
                )
            }).catch(error => console.log(error))
    }

    get_headers(){
        let headers = {
            'Content-Type': 'application/json'
        }
        if (this.is_authenticated()) {
            headers['Authorization'] = 'Token ' + this.state.token
        }
        return headers
    }

    componentDidMount() {
        this.get_token_from_storage()
        this.load_data()
    }

    render () {
        return (
        <div>
        <BrowserRouter>
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

            <Routes>
                <Route exact path='/' element={<UserList users={this.state.users} />} />
                <Route exact path='/projects' element={<ProjectList projects={this.state.projects} />} />
                <Route exact path='/todos' element={<TODOList todos={this.state.todos} />} />
                <Route exact path='/login' element={<LoginForm get_token={(username, password) => this.get_token(username, password)} />} />
                <Route path='*' element={<NotFound404 />} />
            </Routes>
            <Footer />
            </BrowserRouter>
        </div>
        )
    }
}

export default App;
