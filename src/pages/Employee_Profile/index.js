import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { URL } from "../../config";

const Employee_Profile = () => {
  // Define state variables for employee data
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    designation: "",
    deptId: "",
  });

  const empId = sessionStorage["EmpId"];
  const navigate = useNavigate();

  useEffect(() => {
    searchEmployee();
  }, []);

  const searchEmployee = () => {
    const url = `${URL}/employeeProfile/${empId}`;
    axios.get(url).then((response) => {
      const result = response.data;
      const data = result.data;

      if (result.status === "success") {
        // Update the employee state with retrieved data
        setEmployee((prevEmployee) => ({
          ...prevEmployee,
          name: data.name,
          email: data.email,
          phone: data.phone,
          role: data.role,
          designation: data.designation,
          deptId: data.deptId,
        }));
      } else {
        toast.error(result.error);
      }
    });
  };

  const updateEmployee = () => {
    // Extract fields from the employee state
    const { name, email, phone } = employee;

    if (name.length === 0 || email.length === 0 || phone.length === 0) {
      toast.warning("Please fill in all required fields.");
    } else {
      // Prepare the request body
      const body = { name, email, phone };

      const url = `${URL}/employeeUpdate/${empId}`;
      axios
        .patch(url, body)
        .then((response) => {
          const result = response.data;

          if (result.status === "success") {
            // Update session data and show a success message
            sessionStorage["Name"] = result.data.name;
            toast.success("Employee Profile Updated.");

            // Redirect based on user role
            navigate(`/${sessionStorage["Role"]}_home`);
          } else {
            toast.error(result.error);
          }
        })
        .catch((error) => {
          console.error("Error", error);
        });
    }
  };

  const back = () => {
    // Redirect based on user role
    navigate(`/${sessionStorage["Role"]}_home`);
  };

  // Handle input changes for the form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      [name]: value,
    }));
  };

  return (
    <div>
      <h3>Employee Profile</h3>

      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          value={employee.name}
          onChange={handleInputChange}
          className="form-control"
          id="name"
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          value={employee.email}
          onChange={handleInputChange}
          className="form-control"
          id="email"
        />
      </div>

      <div className="form-group">
        <label htmlFor="phone">Phone</label>
        <input
          type="text"
          name="phone"
          value={employee.phone}
          onChange={handleInputChange}
          className="form-control"
          id="phone"
        />
      </div>

      <div className="form-group">
        <label htmlFor="role">Role</label>
        <input
          type="text"
          name="role"
          value={employee.role}
          className="form-control"
          id="role"
          disabled
        />
      </div>

      <div className="form-group">
        <label htmlFor="designation">Designation</label>
        <input
          type="text"
          name="designation"
          value={employee.designation}
          className="form-control"
          id="designation"
          disabled
        />
      </div>

      <div className="form-group">
        <label htmlFor="deptId">Department</label>
        <input
          type="text"
          name="deptId"
          value={employee.deptId}
          className="form-control"
          id="deptId"
          disabled
        />
      </div>

      <button onClick={updateEmployee} type="button" className="btn btn-primary">
        Save
      </button>

      <button onClick={back} type="button" className="btn btn-primary">
        Back
      </button>
    </div>
  );
};

export default Employee_Profile;
