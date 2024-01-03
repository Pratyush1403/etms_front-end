import axios from 'axios'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { URL } from '../../config'

const AddTask = () => {
    const [taskId, setTaskId] = useState('')
    const [projectId, setProjectId] = useState('')
    const [taskName, setTaskName] = useState('')
    const [deptId, setDeptId] = useState('')
    const [startDate, setStartDate] = useState('')
    const [dueDate, setDueDate] = useState('')
    const [description, setDescription] = useState('')

    const navigate = useNavigate()

    const save = () => {
        if (taskId.length == 0) {
            toast.warning('please enter task id')
        } else if (projectId.length == 0) {
            toast.warning('please enter project id')
        } else if (taskName.length == 0) {
            toast.warning('please enter task name')
        } else if (deptId.length == 0) {
            toast.warning('please enter dept Id')
        } else if (startDate.length == 0) {
            toast.warning('please enter start date')
        } else if (dueDate.length == 0) {
            toast.warning('please enter due date')
        } else if (description.length == 0) {
            toast.warning('please enter description')
        } else {
            const body = {
                taskId,
                projectId,
                taskName,
                deptId,
                startDate,
                dueDate,
                description,
                userId: sessionStorage['projectId'],
                userId: sessionStorage['empId'],
            }

            const url = `${URL}/manager/addTask`
            axios.post(url, body).then((response) => {
                const result = response.data
                if (result['status'] == 'success') {
                    toast.success('New task added..')

                    navigate('/managerHome')

                } else {
                    toast.error(result['error'])
                }
            })
        }
    }
    return (
        <div>
            <div id="headerRow" className="row">
                <div className="col">
                    <h2>Add Task</h2>
                </div>
                <hr class="dropdown-divider" />

                <form>
                    <div class="row g-3">
                        <div class="col">
                            <label for="colFormLabel" class="col-form-label">Task ID</label>
                            <div class="col-sm-10">
                                <input
                                    onChange={(e) => {
                                        setTaskId(e.target.value)
                                    }}
                                    type="text" class="form-control" id="colFormLabel"></input>
                            </div>
                        </div>
                        <div class="col">
                            <label for="colFormLabel" class="col-form-label">Project ID</label>
                            <div class="col-sm-10">
                                <input
                                    onChange={(e) => {
                                        setProjectId(e.target.value)
                                    }} type="text" class="form-control" id="colFormLabel">
                                </input>
                            </div>
                        </div>
                    </div>
                    <div class="row g-3">
                        <div class="col">
                            <label for="colFormLabel" class="col-form-label">Task Name</label>
                            <div class="col-sm-10">
                                <input
                                    onChange={(e) => {
                                        setTaskName(e.target.value)
                                    }} type="text" class="form-control" id="colFormLabel"></input>
                            </div>
                        </div>

                        <div class="col">
                            <label for="colFormLabel" class="col-form-label">Department ID</label>
                            <div class="col-sm-10">
                                <input
                                    onChange={(e) => {
                                        setDeptId(e.target.value)
                                    }} type="text" class="form-control" id="colFormLabel">
                                </input>
                            </div>
                        </div>
                    </div>
                    <div class="row g-3">
                        <div class="col">
                            <label for="colFormLabel" class="col-form-label">Start Date</label>
                            <div class="col-sm-10">
                                <input onChange={(e) => {
                                    setStartDate(e.target.value)
                                }} type="date" class="form-control" id="colFormLabel">
                                </input>
                            </div>
                        </div>
                        <div class="col">
                            <label for="colFormLabel" class="col-form-label">Due Date</label>
                            <div class="col-sm-10">
                                <input
                                    onChange={(e) => {
                                        setDueDate(e.target.value)
                                    }} type="date" class="form-control" id="colFormLabel">
                                </input>
                            </div>
                        </div>
                    </div>

                    <div class="mb-3">
                        <label for="colFormLabel" class="col-form-label">Description</label>
                        <div class="col-sm-11">
                            <textarea
                                onChange={(e) => {
                                    setDescription(e.target.value)
                                }} class="form-control" id="colFormLabel" rows="5"></textarea>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col"></div>
                        <div className="col">
                            <button onClick={save} type="button" class="btn btn-primary">Save</button>

                        </div>
                        <div className="col">
                            <Link to="/projectsList" class="btn btn-secondary">Back</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>

    )
}
export default AddTask;