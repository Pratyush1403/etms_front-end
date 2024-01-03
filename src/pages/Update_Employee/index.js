import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { URL } from "../../config";
import { useParams } from 'react-router';

const Update_Employee = () => {
  const { empId } = useParams();
  const navigate = useNavigate();

  const [employeeData, setEmployeeData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    deptId: '',
    designation: '',
    managerId: '',
    role: '',
  });
  

  useEffect(() => {
    searchEmployee();
  }, []);

  const searchEmployee = () => {
    const url = `${URL}/admin/employeeProfile/${empId}`;
    axios.get(url).then((response) => {
      const result = response.data;
      if (result.status === 'success') {
        const { password, ...employeeWithoutPassword } = result.data;
        setEmployeeData(employeeWithoutPassword);
      }
    });
  };

  const updateEmployee = () => {
    const { name, email, phone, password, deptId, designation, managerId, role } = employeeData;

    if (!name || !email || !phone || !password || !deptId || !designation || !role) {
      toast.warning('Please fill in all fields');
    } else {
      const body = {
        name,
        email,
        phone,
        password,
        deptId,
        designation,
        managerId,
        role,
      };

      const url = `${URL}/admin/editEmployee/${empId}`;
      axios.put(url, body).then((response) => {
        const result = response.data;
        if (result.status === 'success') {
          toast.success('Employee updated successfully');
          navigate('/admin_home');
        } else {
          toast.error(result.error);
        }
      });
    }
  };

  const backToAdminHome = () => {
    navigate('/admin_home');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData({ ...employeeData, [name]: value });
  };
  

  return (
    <>
      <hr />
      <h2>Update Employee Details</h2>
      <hr />
      <br />
      <div className="row mb-3">
        <label htmlFor="inputName" className="col-sm-2 col-form-label">Name</label>
        <div className="col-sm-10">
          <input
            type="text"
            className="form-control"
            id="inputName"
            name="name"
            value={employeeData.name}
            onChange={handleInputChange}
          />

        </div>
      </div>
      <div className="row mb-3">
        <label className="col-sm-2 col-form-label">Email</label>
        <div className="col-sm-10">
          <input
            type="text"
            className="form-control"
            name="email"
            value={employeeData.email}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="row mb-3">
        <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Password</label>
        <div className="col-sm-10">
          <input
            type="password"
            className="form-control"
            name="password"
            value={employeeData.password}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="row mb-3">
        <label className="col-sm-2 col-form-label">Designation</label>
        <div className="col-sm-10">
          <input
            type="text"
            className="form-control"
            name="designation"
            value={employeeData.designation}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="row mb-3">
        <label htmlFor="inputPhone" className="col-sm-2 col-form-label">Phone</label>
        <div className="col-sm-10">
          <input
            type="text"
            className="form-control"
            name="phone"
            value={employeeData.phone}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="row mb-3">
        <label className="col-sm-2 col-form-label">Manager ID</label>
        <div className="col-sm-10">
          <input
            type="text"
            className="form-control"
            name="managerId"
            value={employeeData.managerId}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="row mb-3">
        <label className="col-sm-2 col-form-label">Department ID</label>
        <div className="col-sm-10">
          <input
            type="text"
            className="form-control"
            name="deptId"
            value={employeeData.deptId}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="row mb-3">
        <label className="col-sm-2 col-form-label">Role</label>
        <div className="col-sm-10">
          <input
            type="text"
            className="form-control"
            name="role"
            value={employeeData.role}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <br />
      <br />
      <div className="row">
        <div className="col"></div>
        <div className="col">
          <button onClick={updateEmployee} type="submit" className="btn btn-primary">Submit</button>
        </div>
        <div className="col">
          <button onClick={backToAdminHome} type="submit" className="btn btn-primary">Back</button>
        </div>
      </div>
    </>
  );
};

export default Update_Employee;
