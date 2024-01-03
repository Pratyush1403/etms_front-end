import axios from 'axios'
import { toast } from 'react-toastify'
import { URL } from '../config'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AddTask from '../pages/AddTask'

const ProjectList = (props) => {

    const { projectId, projectName, startDate, dueDate, status } = props.project
    const [inProgress, setInProgress] = useState('')
    const [completed, setCompleted] = useState('')
    const [currentStatus, setCurrentStatus] = useState()

    useEffect(() => {
        setInProgress("In-progress")
        setCompleted("Completed")
        setCurrentStatus(status)
    }, [])

    const dropdown2ndOption = completed
    const changeStatus = () => {
        console.log("Changing status");
        console.log(projectId);

        const url = `${URL}/manager/projectList/${projectId}`
        const body = {
            "status": "Completed"
        }
        axios.patch(url, body).then((response) => {
            const result = response.data
            if (result['status'] == 'success') {
                toast.success('Status Changed..')
                //console.log("Status Changed..")
            } else {
                toast.error(result['error'])
            }
        })
        //setCurrentStatus(completed)
        window.location.reload(true);
    }


    return (

        <tr>
            <td>{projectId}</td>
            <td>{projectName}</td>
            <td>{startDate}</td>
            <td>{dueDate}</td>
            <td>
                <select onChange={changeStatus}>
                    <option value={status} defaultValue>{status}</option>
                    {status === inProgress && <option value={dropdown2ndOption}>{dropdown2ndOption}</option>}
                </select>
            </td>
            <td>
                {status == inProgress && <div className="mb-3">
                <Link to="/addTask" class="btn btn-primary">Add Task</Link>
                </div>}
            </td>
        </tr>

    )
}

export default ProjectList