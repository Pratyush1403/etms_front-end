import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { URL } from '../../config';

// Function to generate a random password
const generateRandomPassword = () => {
  const length = 10;
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
};



const Add_Employee = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [deptId, setDeptId] = useState('');
  const [designation, setDesignation] = useState('');
  const [managerId, setManagerId] = useState('');
  const [role, setRole] = useState('');
  const [password, setPassword] = useState(generateRandomPassword()); // Generate a random password

  const navigate = useNavigate();

  const save = () => {
    let body = {};
    if (name.length === 0 || email.length === 0 || phone.length === 0 || deptId.length === 0 || designation.length === 0 || role.length === 0) {
      toast.warning('Please fill in all required fields');
    } else {
      // Remove the 'empId' field from the body.
      body = {
        name,
        email,
        phone,
        deptId: deptId, // Send the department ID directly.
        designation,
        managerId,
        role,
      };
  
      const url = `${URL}/admin/add_employee`;
      axios
        .post(url, body)
        .then((response) => {
          const result = response.data;
          if (result.status === 'success') {
            toast.success('Added new employee');
            navigate('/admin_home');
          } else {
            toast.error('Failed to add employee');
          }
        })
        .catch((error) => {
          console.error('Error adding employee:', error);
          toast.error('Failed to add employee');
        });
    }
  };


  return (
    <>
      <hr />
      <h2>Add New Employee</h2>
      <hr />
      <br />
      <div className="row mb-3">
        <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
          Name
        </label>
        <div className="col-sm-10">
          <input
            onChange={(e) => {
              setName(e.target.value);
            }}
            type="text"
            className="form-control"
            id="inputEmail3"
          ></input>
        </div>
      </div>
      <div className="row mb-3">
        <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
          Email
        </label>
        <div className="col-sm-10">
          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
            className="form-control"
            id="inputPassword3"
          ></input>
        </div>
      </div>
      <div className="row mb-3">
        <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
          Phone
        </label>
        <div className="col-sm-10">
          <input
            onChange={(e) => {
              setPhone(e.target.value);
            }}
            type="text"
            className="form-control"
            id="inputEmail3"
          ></input>
        </div>
      </div>
      <div className="row mb-3">
        <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">
          Designation
        </label>
        <div className="col-sm-10">
          <input
            onChange={(e) => {
              setDesignation(e.target.value);
            }}
            type="text"
            className="form-control"
            id="inputPassword3"
          ></input>
        </div>
      </div>
      <div className="row mb-3">
        <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">
          Manager ID
        </label>
        <div className="col-sm-10">
          <input
            onChange={(e) => {
              setManagerId(e.target.value);
            }}
            type="text"
            className="form-control"
            id="inputPassword3"
          ></input>
        </div>
      </div>
      <div className="row mb-3">
        <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">
          Department ID
        </label>
        <div className="col-sm-10">
          <input
            onChange={(e) => {
              setDeptId(e.target.value);
            }}
            type="text"
            className="form-control"
            id="inputPassword3"
          ></input>
        </div>
      </div>
      <div className="row mb-3">
        <label className="col-sm-2 col-form-label">Role</label>
        <div className="col-sm-10">
          <select
            onChange={(e) => {
              setRole(e.target.value);
            }}
            className="form-select"
            aria-label="Default select example"
          >
            <option value="">Choose Role</option>
            <option value="admin">Admin</option>
            <option value="manager">Manager</option>
            <option value="employee">Employee</option>
          </select>
        </div>
      </div>
      <br />
      <br />
      <div className="mb-3">
        <button onClick={save} className="btn btn-success">
          Save
        </button>
        <Link to="/admin_home" className="btn btn-danger float-end">
          Cancel
        </Link>
      </div>
    </>
  );
};

export default Add_Employee;
