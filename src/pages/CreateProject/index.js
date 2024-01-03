import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { URL } from '../../config';

const CreateProject = () => {
  const [projectName, setProjectName] = useState('');
  const [projectId, setProjectId] = useState('');
  const [deptId, setDeptId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [projectDescription, setProjectDescription] = useState('');

  const navigate = useNavigate();

  const save = () => {
    if (projectName.length === 0) {
      toast.warning('please enter project name');
    } else if (projectId.length === 0) {
      toast.warning('please enter project id');
    } else if (deptId.length === 0) {
      toast.warning('please enter dept id');
    } else if (startDate.length === 0) {
      toast.warning('please enter start date');
    } else if (dueDate.length === 0) {
      toast.warning('please enter due date');
    } else if (projectDescription.length === 0) {
      toast.warning('please enter description');
    } else {
      const body = {
        projectName,
        projectId,
        deptId,
        startDate,
        dueDate,
        projectDescription,
        userId: sessionStorage['projectId'],
        status: 'In-Progress',
      };
      console.log(body.deptId);

      const url = `${URL}/manager/createProject`;
      axios.post(url, body).then((response) => {
        const result = response.data;
        if (result.status === 'success') {
          toast.success('New project created..');
          navigate('/managerHome');
        } else {
          toast.error(result.error);
        }
      });
    }
  };

  return (
    <div>
      <div id="headerRow" className="row">
        <div className="col">
          <h2>Create Project</h2>
        </div>
        <hr className="dropdown-divider" />
        <form>
          <div className="row g-3">
            <div className="col">
              <label htmlFor="colFormLabel" className="form-label">
                Project Name
              </label>
              <div className="col-sm-10">
                <input
                  onChange={(e) => {
                    setProjectName(e.target.value);
                  }}
                  type="text"
                  className="form-control"
                  id="colFormLabel"
                />
              </div>
            </div>
            <div className="col">
              <label htmlFor="colFormLabel" className="form-label">
                Project ID
              </label>
              <div className="col-sm-10">
                <input
                  onChange={(e) => {
                    setProjectId(e.target.value);
                  }}
                  type="text"
                  className="form-control"
                  id="colFormLabel"
                />
              </div>
            </div>
          </div>
          <div className="col-sm-5">
            <label htmlFor="colFormLabel" className="form-label">
              Department ID
            </label>
            <input
              onChange={(e) => {
                setDeptId(e.target.value);
              }}
              type="text"
              className="form-control"
              id="colFormLabel"
            />
          </div>
          <div className="row g-3">
            <div className="col">
              <label htmlFor="colFormLabel" className="form-label">
                Start Date
              </label>
              <div className="col-sm-10">
                <input
                  onChange={(e) => {
                    setStartDate(e.target.value);
                  }}
                  type="date"
                  className="form-control"
                  id="colFormLabel"
                />
              </div>
            </div>
            <div className="col">
              <label htmlFor="colFormLabel" className="form-label">
                Due Date
              </label>
              <div className="col-sm-10">
                <input
                  onChange={(e) => {
                    setDueDate(e.target.value);
                  }}
                  type="date"
                  className="form-control"
                  id="colFormLabel"
                />
              </div>
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="colFormLabel" className="form-label">
              Description
            </label>
            <div className="col-sm-11">
              <textarea
                onChange={(e) => {
                  setProjectDescription(e.target.value);
                }}
                className="form-control"
                id="colFormLabel"
                rows="5"
              ></textarea>
            </div>
          </div>

          <div className="row">
            <div className="col"></div>
            <div className="col">
              <button onClick={save} type="button" className="btn btn-primary">
                Save
              </button>
            </div>
            <div className="col">
              <Link to="/managerHome" className="btn btn-secondary">
                Back
              </Link>
            </div>
          </div>
          <br />
          <br />
          <br />
          <br />
        </form>
      </div>
    </div>
  );
};

export default CreateProject;
