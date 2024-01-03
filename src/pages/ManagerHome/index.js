import './index.css'
import { useNavigate } from 'react-router'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import TaskList from '../../component/TaskList'
import { URL } from '../../config'

const ManagerHome = () => {

    const [employeeTasks, setEmployeeTasks] = useState([])
    const id = sessionStorage['EmpId']
    const username = sessionStorage['Name']


    const searchTasks = () => {
        const url = `${URL}/employee/${id}`;
        axios.get(url)
            .then((response) => {
                const result = response.data;
                if (result['status'] === 'success') {
                    setEmployeeTasks(result['data']); // Update with the fetched data
                } else {
                    toast.error(result['error']);
                }
            })
            .catch((error) => {
                console.error("Error fetching employee tasks:", error);
            });
    }



    useEffect(() => {
        searchTasks()
    }, [])

    const navigate = useNavigate()

    const logoutUser = () => {
        // remove the logged users details from session storage
        sessionStorage.removeItem('empId')
        sessionStorage.removeItem('name')
        sessionStorage.removeItem('deptId')
        sessionStorage.removeItem('loginStatus')

        navigate('/signin')
    }

    const goToProfile = () => {
        navigate('/employee_profile')
    }
    const changePassword = () => {
        navigate('/change_password')
    }
    const viewProject = () => {
        navigate('/projectsList')
    }
    const createProject = () => {
        navigate('/createProject')
    }
    const assignTask = () => {
        navigate('/taskAssign')
    }


    return (
        <div>
            <div id="headerRow" className="row">
                <div className="col">
                    <h2>Manager Home Page</h2>
                </div>
                <div className="col"></div>
                <div className="col"></div>
                <div className="col">
                    <div className="btn-group">
                        <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                            Welcome, {username}
                        </button>
                        <ul className="dropdown-menu">
                            <li><a className="dropdown-item">
                                <button onClick={goToProfile} className="dropdown-item">
                                    My profile
                                </button></a></li>
                            <li><a className="dropdown-item">
                                <button onClick={changePassword} className="dropdown-item">
                                    Change password
                                </button></a></li>
                            <li><hr className="dropdown-divider" /></li>
                            <li><a className="dropdown-item">
                                <button onClick={logoutUser} className="dropdown-item">
                                    Logout
                                </button></a></li>
                        </ul>
                    </div>
                </div>
                <hr />
            </div>

            <div id="btnRow" className="row">
                <div className="col"></div>
                <div className="col">
                    <div className="mb-3">
                        <button onClick={viewProject} id="ManageBtn" className="btn btn-primary">View Projects</button>
                    </div>
                    <div className="mb-3">
                        <button onClick={createProject} id="ManageBtn" className="btn btn-primary">Create Projects</button>
                    </div>
                    <div className="mb-3">
                        <button onClick={assignTask} id="ManageBtn" className="btn btn-primary">Assign Tasks</button>
                    </div>
                </div>
                <div className="col"></div>
                <div>
                    <br />
                    <h3>Task List</h3>
                    <hr />
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Project ID</th>
                                <th scope="col">Task name</th>
                                <th scope="col">Start date</th>
                                <th scope="col">Due date</th>
                                <th scope="col">Status</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {employeeTasks.map((tempTask) => (
                                <TaskList key={tempTask.taskId} task={tempTask} />
                            ))}

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ManagerHome
