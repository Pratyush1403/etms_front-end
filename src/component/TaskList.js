import { useLocation, useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { URL } from '../config';

const TaskList = (props) => {
  const { taskId, projectId, taskName, startDate, dueDate } = props.task;
  const [status, setStatus] = useState(props.task.status);
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const markAsComplete = () => {
    const url = `${URL}/manager/markAsComplete/${taskId}`;
    axios.patch(url).then((response) => {
      const result = response.data;
      if (result.status === 'success') {
        toast.success(`${taskName} Completed!`);
        // Update the status to 'Completed'
        setStatus('Completed');
      } else {
        toast.error(result.error);
      }
    });
  };

  const markAsInProgress = () => {
    const url = `${URL}/manager/markAsInProgress/${taskId}`;
    axios.patch(url).then((response) => {
      const result = response.data;
      if (result.status === 'success') {
        toast.info(`${taskName} is now In Progress.`);
        // Update the status to 'In Progress'
        setStatus('In Progress');
      } else {
        toast.error(result.error);
      }
    });
  };

  return (
    <tr>
      <td>{taskId}</td>
      <td>{projectId}</td>
      <td>{taskName}</td>
      <td>{formatDate(startDate)}</td>
      <td>{formatDate(dueDate)}</td>
      <td>{status}</td>
      <td>
        {status === 'Completed' ? (
          <div className="mb-3">
            <button onClick={markAsInProgress} className="btn btn-warning">
              Mark as In Progress
            </button>
          </div>
        ) : status === 'In Progress' ? (
          <div className="mb-3">
            <button onClick={markAsComplete} className="btn btn-primary">
              Mark as Complete
            </button>
          </div>
        ) : (
          <div className="mb-3">
            <button onClick={markAsComplete} className="btn btn-primary">
              Mark as Complete
            </button>
          </div>
        )}
      </td>
    </tr>
  );
};

export default TaskList;
