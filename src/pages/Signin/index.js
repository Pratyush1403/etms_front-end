import './index.css'
import { useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { URL } from '../../config'

const Signin = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const signinUser = async () => {
        if (email.length === 0) {
            toast.warning('Please enter email')
        } else if (password.length === 0) {
            toast.warning('Please enter password')
        } else {
            const body = {
                email,
                password,
            }
            // URL to make the signin API call
            const url = `${URL}/signin`; // Change the URL to match your server's endpoint

            try {
                const response = await axios.post(url, body);
                // Get the server result
                const result = response.data;
                console.log(result);

                if (result.result = "No User Found") {
                    toast.error('Invalid user name or password');
                }
                else {
                    toast.success('Welcome to the application');

                    // Get the data sent by the server
                    const { empId, name, deptId, role } = result;

                    // Persist the logged-in user's information for future use
                    sessionStorage['EmpId'] = empId;
                    sessionStorage['Name'] = name;
                    sessionStorage['DeptId'] = deptId;
                    sessionStorage['loginStatus'] = 1;
                    sessionStorage['Role'] = role;

                    if (role === 'admin') {
                        navigate('/admin_home');
                    } else if (role === 'manager') {
                        navigate('/managerHome');
                    } else {
                        navigate('/employee_home');
                    }
                }
            } catch (error) {
                console.error('An error occurred:', error);
            }
        }
    };

    return (
        <div>
            <br /><br />
            <h2>Signin</h2>
            <hr />
            <div className="row">
                <div className="col"></div>
                <div className="col">
                    <div className="form">
                        <div className="mb-3">
                            <label htmlFor="" className="label-control">Email address</label>
                            <input onChange={(e) => setEmail(e.target.value)} type="text" className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="" className="label-control">Password</label>
                            <input onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" />
                        </div>
                        <div id="button" className="mb-3">
                            <button onClick={signinUser} className="btn btn-primary">Login</button>
                        </div>
                    </div>
                </div>
                <div className="col"></div>
            </div>
        </div>
    );
};

export default Signin;
