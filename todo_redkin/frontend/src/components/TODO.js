import React from 'react';

const TODOItem = ({todo}) => {
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
        </tr>
    )
}

const TODOList = ({todos}) => {
    return (
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
            {todos.map((todo) => <TODOItem todo={todo} />)}
        </table>
    )
}
export default TODOList