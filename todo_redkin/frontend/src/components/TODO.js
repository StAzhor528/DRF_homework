import React from 'react';
import {Link} from 'react-router-dom';

const TODOItem = ({todo, deleteTODO}) => {
    return (
        <tr>
            <td>
                {todo.project}
            </td>
            <td>
                {todo.text}
            </td>
            <td>
                {todo.date}
            </td>
            <td>
                {todo.user}
            </td>
            <td>
                <button onClick={() => deleteTODO(todo.id)}
                        type='button'>
                    Delete
                </button>
            </td>
        </tr>
    )
}

const TODOList = ({todos, deleteTODO}) => {
    return (
        <div>
            <table>
                <th>
                    Project
                </th>
                <th>
                    Text
                </th>
                <th>
                    Date
                </th>
                <th>
                    User
                </th>
                <th></th>
                {todos.map((todo) => <TODOItem todo={todo} deleteTODO={deleteTODO}/>)}
            </table>
            <Link to="/todos/create">Create</Link>
        </div>
    )
}
export default TODOList