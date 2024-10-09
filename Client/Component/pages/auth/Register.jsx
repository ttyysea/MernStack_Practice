import { useState } from "react";
// functions
import { register } from '../../functions/Auth';

// Toast
import { toast, Flip } from 'react-toastify';

// Antd
import { Button, Form, Input, Spin} from 'antd';

const Register = () => {
    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState({
        username: "",
        password: "",
        confirmPassword: ""
    });

    const handleChange = (e) =>{
        setValue({
            ...value,
            [e.target.name]: e.target.value
        });
    };
    
    const handleSubmit = (e) =>{
        setLoading(true);
        if (value.password !== value.confirmPassword){
            toast.error('Password Not Match', {
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
            
        }else{
            register(value)
            .then(res=>{
                setLoading(false);
                console.log(res.data);
                toast.success(value.username + ' Register Success ', {
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
            }).catch((err) => {
                setLoading(false);
                console.log(err);
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
    };


  return (
    <div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', height: '100vh', paddingTop: '50px', }}>
            <div style={{ width: '100%', maxWidth: '800px', padding: '20px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', borderRadius: '8px', backgroundColor: 'white' }}>
            {loading
            ? <h1 style={{ textAlign: 'center' }}>Register Page  <Spin/></h1>
            :<h1 style={{ textAlign: 'center' }}>Register Page </h1>
            }
                <Form onFinish={handleSubmit}>
                <Form.Item label="Username">
                    <Input type="text" name="username" placeholder="input username" onChange={handleChange} />
                </Form.Item>
                <Form.Item label="Password">
                    <Input type="password" name="password" placeholder="input password" onChange={handleChange} />
                </Form.Item>
                <Form.Item label="Confirm Password">
                    <Input type="password" name="confirmPassword" placeholder="input confirm password" onChange={handleChange} />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" disabled={value.password.length < 6} style={{ width: '100%' }}>
                    Submit
                    </Button>
                </Form.Item>
                </Form>
            </div>
        </div>
    </div>
  )
};

export default Register;
