import React from 'react'

class TODOForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {text:'', user: props.users[0].id, project: props.projects[0].id}
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        );
    }

    handleSubmit(event) {
        this.props.createTODO(this.state.text, this.state.user, this.state.project)
        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={(event)=>this.handleSubmit(event)}>
                <div className='form-group'>
                    <label for='text'>
                        text
                    </label>
                    <input type='text' className='form-control'
                            name='text' value={this.state.text}
                            onChange={(event)=>this.handleChange(event)} />
                </div>

                <div className='form-group'>
                    <label for='user'>
                        user
                    </label>
                    <select name='user' className='form-control'
                            onChange={(event)=>this.handleChange(event)}>
                        {this.props.users.map((item)=><option value={item.id}>{item.username}</option>)}
                    </select>
                </div>

                <div className='form-group'>
                    <label for='project'>
                        project
                    </label>
                    <select name='project' className='form-control'
                            onChange={(event)=>this.handleChange(event)}>
                        {this.props.projects.map((item)=><option value={item.id}>{item.name}</option>)}
                    </select>
                </div>
                <input type='submit' className='btn btn-primary' value='Save' />
            </form>
        );
    }
}

export default TODOForm