import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./Login.css";

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
      });
      const [alert,setAlert] = useState(null);
      const navigate = useNavigate();
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
      const handleLogin = async () => {
        try {
        console.log(formData);
          const response = await axios.post('http://localhost:5000/login', formData);
          console.log(response.data);
          setFormData({
            email: '',
            password: ''
          });
          setAlert({ type: 'success', message: 'Login successful' });
          setTimeout(() => {
            navigate("/home");
          }, 3000);
        } catch (error) {
          console.error('Error logging in:', error);
          setAlert({ type: 'error', message: 'Invalid Login Credentials' });
        }
      };
    
return (
    <div className="login-container">
        <h2 className="login-heading">Login</h2>
        {alert && <div className={`alert ${alert.type}`}>{alert.message}</div>}
        <div className="login-input">
        <label>
            Email:
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </label>
        </div>
        <div className="login-input">
        <label>
            Password:
            <div className="password-input-wrapper">
            <input type = 'password' name="password" value={formData.password} onChange={handleChange} />
            </div>
        </label>
        </div>
        <div>
        <button className="login-button" onClick={handleLogin}>Login</button>
        </div>
    </div>
    );
};  
  
export default Login;

