import React from 'react';
import logo from './logo.svg';
import './App.css';
import UserList from './components/User.js';
import ProjectList from './components/Projects.js';
import ProjectForm from './components/ProjectForm.js';
import TODOList from './components/TODO.js';
import TODOForm from './components/TODOForm.js';
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

    deleteProject(id) {
        const headers = this.get_headers()
        axios.delete(`http://127.0.0.1:8000/api/projects/${id}`, {headers, headers})
            .then(response => {
                this.setState({projects: this.state.projects.filter((item) => item.id !== id)})
                }).catch(error => console.log(error))
    }

    deleteTODO(id) {
        const headers = this.get_headers()
        axios.delete(`http://127.0.0.1:8000/api/todo/${id}`, {headers, headers})
            .then(response => {
                this.setState({todos: this.state.todos.filter((item) => item.id !== id)})
                }).catch(error => console.log(error))
    }

    createTODO(text, user, project) {
        const headers = this.get_headers()
        const data = {text: text, user: user, project: project}
        axios.post('http://127.0.0.1:8000/api/todos/', data, {headers, headers})
            .then(response => {
                let new_todo = response.data
                const user = this.state.users.filter((item) => item.id === new_todo.user)[0]
                const project = this.state.projects.filter((item) => item.id === new_todo.project)[0]
                new_todo.user = user
                new_todo.project = project
                this.setState({todos: [...this.state.todos, new_todo]})
            }).catch(error => console.log(error))
    }

    createProject(name, users) {
        const headers = this.get_headers()
        const data = {name: name, users: users}
        axios.post('http://127.0.0.1:8000/api/projects/', data, {headers})
            .then(response => {
                this.load_data()
            }).catch(error => {
                console.log(error)
                this.setState({projects: []})
            })
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

        axios.get('http://127.0.0.1:8000/api/todos', {headers})
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
        console.log(this.state)
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
                <Route exact path='/projects'
                    element={<ProjectList projects={this.state.projects} deleteProject={(id) => this.deleteProject(id)} />} />
                <Route exact path='/projects/create'
                    element={<ProjectForm users={this.state.users}
                    createProject={(name, users) => this.createProject(name, users)}/>} />

                <Route exact path='/todos'
                    element={<TODOList todos={this.state.todos} deleteTODO={(id) => this.deleteTODO(id)}/>} />
                <Route exact path='/todos/create'
                    element={<TODOForm users={this.state.users} projects={this.state.projects}
                    createTODO={(text, user, project) => this.createTODO(text, user, project)}/>} />
                <Route exact path='/login'
                    element={<LoginForm get_token={(username, password) => this.get_token(username, password)} />} />
                <Route path='*' element={<NotFound404 />} />
            </Routes>
            <Footer />
            </BrowserRouter>
        </div>
        )
    }
}

export default App;
