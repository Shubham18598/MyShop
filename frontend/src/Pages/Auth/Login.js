import React, { useState } from "react";
import Layout from "../../components/Layout";
import "../../styles/AuthStyles.css";
import toast from "react-hot-toast";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/login`,
        { email, password }
      );

      if (res && res.data.success) {
        setTimeout(() => {
          toast.success(res.data && res.data.message);
        }, 500);

        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });

        localStorage.setItem("auth", JSON.stringify(res.data));

        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Somthing went wrong");
    }
  };

  return (
    <Layout title={"Login- Ecomm app"}>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h4 className="title">Login FORM</h4>
          <div className="mb-3">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your email"
              required
            />
          </div>
          <div className="mb-3">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter password"
              required
            />
          </div>
          <div className="mb-3">
            <button
              type="button"
              className="btn btn-primary"
              onClick={()=>navigate("/forgot-password")}
            >
              Forgot Password
            </button>
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
