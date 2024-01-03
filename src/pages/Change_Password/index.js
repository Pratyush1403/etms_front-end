import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { URL } from "../../config";

const Change_Password = () => {
  const empId = sessionStorage['EmpId'];
  const navigate = useNavigate();

  useEffect(() => {
    searchEmployees();
  }, []);

  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");

  const searchEmployees = () => {
    const url = `${URL}/admin/employeeProfile/${empId}`;
    axios.get(url).then((response) => {
      const result = response.data;
      setOldPassword(result.data.password);
    });
  }

  const updatePassword = () => {
    if (password.trim() === "") {
      toast.warning("Please enter a new password");
    } else {
      const body = { password };

      const url = `${URL}/employeeUpdate/${empId}`; // Use the correct API endpoint
      axios.patch(url, body).then((response) => {
        const result = response.data;

        if (result.status === "success") {
          switch (sessionStorage["Role"]) {
            case "employee":
              navigate('/employee_home');
              break;
            case "manager":
              navigate('/managerHome');
              break;
            case "admin":
              navigate('/admin_home');
              break;
            default:
              break;
          }
          toast.success('Password changed');
        } else {
          toast.error('Failed to change password');
        }
      });
    }
  }

  return (
    <>
      <hr />
      <h2>Change Password</h2>
      <hr />

      <div className="row g-3 align-items-center">
        <div className="col"></div>
        <div className="col-auto">
          <label htmlFor="inputPassword6" className="col-form-label">Old Password</label>
        </div>
        <div className="col-auto">
          <input
            type="password"
            id="inputPassword5"
            defaultValue={oldPassword}
            className="form-control"
            aria-describedby="passwordHelpInline"
          />
        </div>
        <div className="col-auto"></div>
        <div className="col"></div>
      </div>
      <br />
      <div className="row g-3 align-items-center">
        <div className="col"></div>
        <div className="col-auto">
          <label htmlFor="inputPassword6" className="col-form-label">New Password</label>
        </div>
        <div className="col-auto">
          <input
            type="password"
            onChange={e => setPassword(e.target.value)}
            id="inputPassword6"
            className="form-control"
            aria-describedby="passwordHelpInline"
          />
        </div>
        <div className="col-auto"></div>
        <div className="col"></div>
      </div>
      <br />

      <div className="row">
        <div className="col"></div>
        <div className="col">
          <button onClick={updatePassword} className="btn btn-primary">Submit</button>
        </div>
      </div>
    </>
  );
}

export default Change_Password;
