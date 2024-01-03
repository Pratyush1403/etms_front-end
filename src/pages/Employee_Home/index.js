import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import TaskList from '../../component/TaskList';
import { URL } from '../../config';
import { useNavigate } from 'react-router';

const Employee_Home = () => {
  const [employeeTasks, setEmployeeTasks] = useState([]);
  const id = sessionStorage['EmpId'];
  const username = sessionStorage['Name'];
  const navigate = useNavigate();

  const searchTasks = () => {
    const url = `${URL}/employee/${id}`;
    axios.get(url).then((response) => {
      const result = response.data;
      if (result['status'] === 'success') {
        setEmployeeTasks(result['data']);
      } else {
        toast.error(result['error']);
      }
    });
  };

  useEffect(() => {
    searchTasks();
  }, []);

  const logoutUser = () => {
    sessionStorage.removeItem('empId');
    sessionStorage.removeItem('name');
    sessionStorage.removeItem('deptId');
    sessionStorage.removeItem('loginStatus');
    navigate('/signin');
  };

  const myProfile = () => {
    navigate('/employee_profile');
  };

  const changePassword = () => {
    navigate('/change_password');
  };

  return (
    <div>
      <div id="headerRow" className="row">
        <div className="col">
          <h2>Employee Home Page</h2>
        </div>
        <div className="col"></div>
        <div className="col"></div>
        <div className="col">
          <div className="btn-group">
            <button
              type="button"
              className="btn btn-primary dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Welcome, {username}
            </button>
            <ul className="dropdown-menu">
              <li>
                <a className="dropdown-item">
                  <button onClick={myProfile} className="dropdown-item">
                    My Profile
                  </button>
                </a>
              </li>
              <li>
                <a className="dropdown-item">
                  <button onClick={changePassword} className="dropdown-item">
                    Change Password
                  </button>
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <a className="dropdown-item">
                  <button onClick={logoutUser} className="dropdown-item">
                    Logout
                  </button>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <hr />
      </div>

      <div id="btnRow" className="row">
        <div className="col"></div>
        <div className="col"></div>
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
              {employeeTasks.map((tempTask, index) => (
                <TaskList key={index} task={tempTask} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Employee_Home;
