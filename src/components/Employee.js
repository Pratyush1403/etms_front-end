import { useLocation, Link, useNavigate } from 'react-router';
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { URL } from '../config';

const Employee = (props) => {
  const { empId, name, email, phone, password, deptId, managerId } = props.employee;
  const navigate = useNavigate();
  const emp = sessionStorage['EmpId'];

  const updateEmployee = () => {
    console.log('Clicked Update with empId:', empId);
    sessionStorage['toUpdateEmp'] = empId;
    navigate(`/update_employee/${empId}`);
  };

  const deleteEmployee = () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this employee?');
    if (!confirmDelete) {
      return;
    }

    const url = `${URL}/admin/deleteEmployee/${empId}`;
    axios.delete(url)
      .then((response) => {
        const result = response.data;
        toast.success('Employee record deleted');
        navigate('/admin_home');
      })
      .catch((error) => {
        console.error('Error deleting employee:', error);
      });
  };

  return (
    <tr key={empId}>
      <td>{empId}</td>
      <td>{name}</td>
      <td>{email}</td>
      <td>{phone}</td>
      <td>{deptId}</td>
      <td>{managerId}</td>
      <td>
        <div className="mb-3">
          <button onClick={updateEmployee} className="btn btn-primary">
            Update
          </button>
        </div>
      </td>
      <td>
        <div className="mb-3">
          <button onClick={deleteEmployee} className="btn btn-danger">
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
};

export default Employee;
