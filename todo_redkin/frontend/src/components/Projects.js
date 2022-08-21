import React from 'react'
import {Link} from 'react-router-dom';

const ProjectItem = ({project}) => {
    return (
        <tr>
            <td>
                <Link to={`/projects/${project.name}`}>{project.name}</Link>
            </td>
            <td>
                {project.users}
            </td>
            <td>
                {project.link}
            </td>
        </tr>
    )
}

const ProjectList = ({projects}) => {
    return (
        <table>
            <th>
                Name
            </th>
            <th>
                Users
            </th>
            <th>
                Link
            </th>
            {projects.map((project) => <ProjectItem project={project} />)}
        </table>
    )
}
export default ProjectList