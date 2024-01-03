import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import ProjectList from '../../component/ProjectList';
import { URL } from '../../config';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

const ProjectsList = () => {
  const [employeeProjects, setEmployeeProjects] = useState([]);
  const deptId = sessionStorage['DeptId'];
  const navigate = useNavigate();

  const searchProjects = () => {
    const url = `${URL}/manager/projectList/${deptId}`;
    axios.get(url).then((response) => {
      const result = response.data;
      if (result['status'] === 'success') {
        setEmployeeProjects(result['data']);
      } else {
        toast.error(result['error']);
      }
    });
  };

  useEffect(() => {
    searchProjects();
  }, []);

  const createProject = () => {
    navigate('/createProject');
  };

  const updateProjectStatus = (projectId, newStatus) => {
    const url = `${URL}/manager/projectList/${projectId}`;
    axios.patch(url, { status: newStatus }).then((response) => {
      const result = response.data;
      if (result['status'] === 'success') {
        toast.success('Project status updated');
        searchProjects();
      } else {
        toast.error(result['error']);
      }
    });
  };

  const addTaskToProject = (projectId) => {
    navigate(`/addTask?projectId=${projectId}`);
  };

  return (
    <div>
      <div id="headerRow" className="row">
        <div className="col">
          <h2>Project List</h2>
        </div>
        <hr className="dropdown-divider" />
        <br />
        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
          <button onClick={createProject} className="btn btn-primary me-md-2" type="button">
            + Create New Project
          </button>
        </div>
      </div>
      <br />

      <div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Project</th>
              <th scope="col">Start Date</th>
              <th scope="col">Due Date</th>
              <th scope="col">Status</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employeeProjects.map((tempProject) => {
              // Format the date strings to display only the date portion
              const formattedStartDate = new Date(tempProject.startDate).toLocaleDateString();
              const formattedDueDate = new Date(tempProject.dueDate).toLocaleDateString();

              return (
                <tr key={tempProject.projectId}>
                  <td>{tempProject.projectId}</td>
                  <td>{tempProject.projectName}</td>
                  <td>{formattedStartDate}</td>
                  <td>{formattedDueDate}</td>
                  <td>
                    <select
                      value={tempProject.status}
                      onChange={(e) => updateProjectStatus(tempProject.projectId, e.target.value)}
                    >
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </td>
                  <td>
                    <button
                      onClick={() => addTaskToProject(tempProject.projectId)}
                      className="btn btn-primary"
                    >
                      Add Task
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
          <button className="btn btn-primary me-md-2" type="button">
            Save
          </button>
          <Link to="/managerHome" className="btn btn-secondary">
            Back
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectsList;
