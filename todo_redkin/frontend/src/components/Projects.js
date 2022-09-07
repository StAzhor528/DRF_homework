import React from 'react'
import {Link} from 'react-router-dom';

const ProjectItem = ({project, deleteProject}) => {
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
            <td>
                <button onClick={() => deleteProject(project.id)}
                        type='button'>
                    Delete
                </button>
            </td>
        </tr>
    )
}

const ProjectList = ({projects, deleteProject}) => {
    return (
        <div>
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
                <th></th>
                {projects.map((project) => <ProjectItem project={project} deleteProject={deleteProject}/>)}
            </table>
            <Link to="/projects/create">Create</Link>
        </div>
    )
}
export default ProjectList