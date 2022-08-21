import React from 'react';
import logo from './logo.svg';
import './App.css';
import UserList from './components/User.js';
import ProjectList from './components/Projects.js';
import TODOList from './components/TODO.js';
import NotFound404 from './components/NotFound404.js';
import Menu from './components/Menu.js';
import Footer from './components/Footer.js';
import axios from 'axios';
import {BrowserRouter, Route, Routes, Link} from 'react-router-dom';



class App extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
           'users': [],
           'projects': [],
           'todos': []
        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/users')
            .then(response => {
                const users = response.data.results
                    this.setState(
                    {
                        'users': users
                    }
                )
            }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/projects')
            .then(response => {
                const projects = response.data.results
                    this.setState(
                    {
                        'projects': projects
                    }
                )
            }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/todo')
            .then(response => {
                const todos = response.data.results
                    this.setState(
                    {
                        'todos': todos
                    }
                )
            }).catch(error => console.log(error))
    }

    render () {
        return (
        <div>
        <BrowserRouter>
            <Menu />
            <Routes>
                <Route exact path='/' element={<UserList users={this.state.users} />} />
                <Route exact path='/projects' element={<ProjectList projects={this.state.projects} />} />
                <Route exact path='/todos' element={<TODOList todos={this.state.todos} />} />
                <Route path='*' element={<NotFound404 />} />
            </Routes>
            <Footer />
            </BrowserRouter>
        </div>
        )
    }
}

export default App;
