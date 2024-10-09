import React from 'react';
import { Menu, Badge } from 'antd';
import { EyeOutlined, RobotOutlined, ShoppingCartOutlined, ShopOutlined, MailOutlined, HomeOutlined, LoginOutlined, LogoutOutlined, UserOutlined  } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';

// Toast
import { toast, Flip } from 'react-toastify';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import Search from './Search';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, cart } = useSelector((state) => ({...state}));

  const logout = () => {
    dispatch({ type: 'LOGOUT', payload: null });
    navigate('/');
    toast.success('Logout Success ', {
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
  };

 

  return (
<Menu mode="horizontal" defaultSelectedKeys={['home']} style={{ display: 'flex' }}>
  <Menu.Item key="home" icon={<HomeOutlined />} >
    <Link to="/">Home</Link>
  </Menu.Item>
  <Menu.Item key="shop" icon={<ShopOutlined />} >
    <Link to="/shop">Shop</Link>
  </Menu.Item>
  <Menu.Item key="cart" icon={<ShoppingCartOutlined />}>
    <Link to="/cart">
      <Badge count={cart.length} offset={[9,0]}>
        Cart
      </Badge>
    </Link>
  </Menu.Item>
  <Menu.Item>
    <Search/>
  </Menu.Item>
 

  
  {user ? (
    <>
     
      <Menu.SubMenu key="SunMenu" icon={<UserOutlined />} style={{ marginLeft: 'auto', marginRight: '50px'}} title={user.username}>
        {user.role === 'admin' ? (
          <Menu.Item key="AdminDashboard" icon={<RobotOutlined />}>
            <Link to="/admin/index">
                DashBoard
            </Link>
          </Menu.Item>
        ) : (
          <Menu.Item key="UserDashboard" icon={<EyeOutlined />}>
            <Link to="/user/index">
                DashBoard
            </Link>
          </Menu.Item>
        )}
        <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={logout} style={{ marginLeft: 'auto', marginRight: '50px'}}>
          Logout
        </Menu.Item>
      </Menu.SubMenu>
    </>
    
    
  ) : (
    <>
      
      <Menu.Item key="login" icon={<LoginOutlined />} style={{ marginLeft: 'auto'}}>
        <Link to="/login">Login</Link>
      </Menu.Item>
      <Menu.Item key="register" icon={<MailOutlined />}>
        <Link to="/register">Register</Link>
      </Menu.Item>
    </>
  )}
</Menu>
  );
};

export default Navbar;
