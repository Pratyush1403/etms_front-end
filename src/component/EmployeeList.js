import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios
import { toast } from 'react-toastify'; // Import toast
import { URL } from '../config';
import TaskList from './TaskList';

const EmployeeList = (props) => {
  const { empId, name, taskList } = props.employee;
  const [unassignedTasks, setUnassignedTasks] = useState([]);
  const [taskId, setTaskId] = useState();

  const availableTasks = () => {
    const url = `${URL}/manager/unassignedTasks`;
    axios.get(url).then((response) => {
      const result = response.data;
      if (result.status === 'success') {
        setUnassignedTasks(result.data);
      } else {
        toast.error(result.error);
      }
    });
  };

  const assignTaskToEmployee = () => {
    const body = {
      status: 'In-progress',
      employee: {
        empId,
      },
    };
    const url = `${URL}/manager/assignTask/${taskId}`;
    axios.patch(url, body).then((response) => {
      const result = response.data;
      if (result.status === 'success') {
        console.log(unassignedTasks);
        console.log(typeof taskId);
        const assignedTask = unassignedTasks.find(
          (t) => t.taskId === parseInt(taskId)
        );
        console.log(assignedTask);
        toast.success(`Task ${assignedTask.taskName} assigned to ${name}`);
      } else {
        toast.error(result.error);
      }
    });
  };

  return (
    <tr key={empId}>
      <th scope="row">{empId}</th>
      <td>{name}</td>
      <td>
        <ul>
          {taskList?.map((task) => (
            <li key={task.taskId}>{task.taskName}</li>
          ))}
        </ul>
      </td>
      <td>
        <select
          onChange={(e) => {
            setTaskId(e.target.value);
          }}
          onClick={availableTasks}
          style={{ width: '150px' }}
          className="form-select"
          aria-label="Default select example"
        >
          <option value="">Select task</option>
          {unassignedTasks?.map((task) => (
            <option key={task.taskId} value={task.taskId}>
              {task.taskName}
            </option>
          ))}
        </select>
      </td>
      <td>
        <div className="mb-3">
          <button onClick={assignTaskToEmployee} className="btn btn-primary">
            Assign
          </button>
        </div>
      </td>
    </tr>
  );
};

export default EmployeeList;
