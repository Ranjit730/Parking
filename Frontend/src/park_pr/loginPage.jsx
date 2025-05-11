import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './loginPage.css';
import { toast } from 'react-toastify';
import axios from 'axios';

const LoginPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleError = (msg) => toast.error(msg);
  const handleSuccess = (msg) => toast.success(msg);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      return handleError("Both fields are required");
    }

    setLoading(true);

    try {
      const res = await axios.post('https://parking-zizn.onrender.com/auth/login', { email, password });

      handleSuccess("Login successful");

      localStorage.setItem("token", res.data.token);

      setTimeout(() => {
        navigate('/');
      }, 2000);

    } catch (err) {
      handleError(err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="login-form" className="login-section  ">
      <div className="container text-center">
        <form onSubmit={handleSubmit} id="Login" class="row">
          <div className="left col-lg-6 col-sm-8 mx-auto">
            <div>
              <p>Hello, Welcome!</p>
              <a href="#">Don't have an account?</a>
              <button type="button" style={{display: "flex", justifyContent: "center", alignItems: "center",}} className="register_btn mt-2 mx-auto"onClick={() => navigate('/Signup')}>Register</button>
            </div>
          </div>
          <div className="col-lg-6 col-sm-8 mx-auto text-center my-5">
          <div className="right">
            <div className='mx-auto'>
              <h1>Login</h1>
              <input type="email"name="email"placeholder="Email"value={formData.email}onChange={handleChange}/>
              <input  type="password"name="password"placeholder="Password"value={formData.password}onChange={handleChange}/>
              {/* <a href="/forgot-password">Forgot Password?</a> */}
              <button className="mt-4 mx-auto" type="submit" disabled={loading} style={{display: "flex", justifyContent: "center", alignItems: "center",}} >
                {loading ? "Logging in..." : "Login"}
              </button>
            </div>
          </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default LoginPage;
