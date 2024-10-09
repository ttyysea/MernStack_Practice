import React from 'react';
import { useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';

// Antd
import { Button, Form, Input, Spin} from 'antd';

// redux
import { useDispatch } from 'react-redux';

// functions
import { login } from '../../functions/Auth';

// Toast
import { toast, Flip } from 'react-toastify';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  console.log("lo",location.state)
  const [loading, setLoading] = useState(false);

  const roleBaseRedirect = (role) => {
    let intended = location.state?.from;
    if (intended) {
      navigate(`/${intended}`);
    } else {
      if (role === 'admin') {
        navigate('/admin/index');
      } else {
        navigate('/user/index');
      };
    };
  };

  const [value, setValue] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) =>{
    setValue({
        ...value,
        [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) =>{
    setLoading(true);
    console.log(value);
    login(value)
      .then(res=>{
        setLoading(false);
        console.log(res.data.payload.user.username);
        
        toast.success(res.data.payload.user.username + ' Login Success ', {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "light",
          transition: Flip,
          });
        dispatch({
          type:'LOGIN',
          payload: {
            token: res.data.token,
            username: res.data.payload.user.username,
            role: res.data.payload.user.role
          }
        });
        localStorage.setItem('token',res.data.token);
        roleBaseRedirect(res.data.payload.user.role);
      }).catch((err) => { 
        setLoading(false);
        console.log(err.response.data);
        toast.error('Login Failed : '+ err.response.data, {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "light",
          transition: Flip,
          });
      });
};

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', height: '100vh', paddingTop: '50px', }}>
      <div style={{ width: '100%', maxWidth: '800px', padding: '20px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', borderRadius: '8px', backgroundColor: 'white' }}>
        {loading
        ? <h1 style={{ textAlign: 'center' }}>Login Page<Spin/></h1>
        :<h1 style={{ textAlign: 'center' }}>Login Page</h1>
        }
        <Form onFinish={handleSubmit}>
          <Form.Item label="Username">
            <Input type="text" name="username" placeholder="input username" onChange={handleChange} />
          </Form.Item>
          <Form.Item label="Password">
            <Input type="password" name="password" placeholder="input password" onChange={handleChange} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" disabled={value.password.length < 6} style={{ width: '100%' }}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Login;
