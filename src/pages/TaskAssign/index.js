import './index.css'
import { useNavigate } from 'react-router'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import EmployeeList from '../../component/EmployeeList'
import { URL } from '../../config'

const TaskAssign = () => {

    const [employees, setEmployees] = useState([])
    const id = sessionStorage['EmpId']
    const navigate = useNavigate()
    const deptId = sessionStorage['DeptId']

    const searchEmployees = () => {
        const url = `${URL}/manager/assignTask/${deptId}`
        axios.get(url).then((response) => {
            const result = response.data
            if (result['status'] == 'success') {
                setEmployees(result['data'])
            } else {
                toast.error(result['error'])
            }
        })
    }

    useEffect(() => {
        searchEmployees()
    }, [])

    
    const save = () => {
        window.location.reload()
    }
    const back = () => {
        navigate('/managerHome')
    }

    return (
        <div>
            <div id="headerRow" className="row">
                <div className="col">
                    <h2>Task Assignment</h2>
                </div>
                <div className="col"></div>
                <div className="col"></div>
                <hr />
            </div>
            <br />
            <h3>Employees' List</h3>
            <div>
                <br />
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Employee Name</th>
                            <th scope="col">Ongoing tasks</th>
                            <th scope="col">Available tasks</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((tempEmployee) => {
                                return <EmployeeList employee={tempEmployee} />
                        })}
                    </tbody>
                </table>
            </div>
            <div className="mb-3">
                <div className="row">
                    <div className="col"></div>
                    <div className="col"></div>
                    <div className="col"></div>
                    <div className="col"></div>
                    <div className="col"></div>
                    <div className="col"></div>
                    <div className="col">
                        <button onClick={save} id="SaveBtn" className="btn btn-primary">Save</button>
                    </div>
                    <div className="col">
                        <button onClick={back} id="SaveBtn" className="btn btn-secondary">Back</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TaskAssign