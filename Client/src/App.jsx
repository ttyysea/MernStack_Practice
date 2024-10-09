import React,{useState, useEffect} from "react";


// Layouts
import Navbar from "../component/layouts/Navbar";

// pages
import Home from "../component/pages/Home";
import Login from "../component/pages/auth/Login";
import Register from "../component/pages/auth/Register"
import HomeAdmin from "../component/pages/admin/Home";
import HomeUser from "../component/pages/user/Home";
import ManageUserAdmin from "../component/pages/admin/ManageUser";
import CreateCategory from "../component/pages/admin/Category/CreateCategory";
import CreateProduct from "../component/pages/admin/Product/CreateProduct";
import UpdateProductPage from "../component/pages/admin/Product/UpdateProductPage";
import Product from "../component/pages/Product";
import Shop from "../component/pages/Shop";
import Cart from "../component/pages/Cart";
import Checkout from "../component/pages/Checkout";
import Wishlist from "../component/pages/user/Wishlist";
import OrderHistory from "../component/pages/user/OrderHistory";
import OrderAdmin from "../component/pages/admin/OrderAdmin";

// Routes
import { Routes, Route } from 'react-router-dom';
import UserRoute from "../component/routes/userRoute";
import AdminRoute from "../component/routes/adminRoute";

// functions
import { currentUser } from "../component/functions/Auth";

// redux
import { useDispatch } from 'react-redux';

// Toast
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

// Component
import SideDrawer from "../component/drawer/SideDrawer";

function App() {
  const dispatch = useDispatch();
  const idToken = localStorage.token;
  if (idToken){
    console.log("idToken in App page",idToken)
    currentUser(idToken)
    .then(res=>{
      dispatch({
        type:'LOGIN',
        payload: {
          token: idToken,
          username: res.username,
          role: res.role
        }
      });
    }).catch(err=>{
      console.log("App page check current user :",err);
    });
  };


  return (
    <>
      <ToastContainer/>
      <Navbar />
      <SideDrawer/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/product/:id" element={<Product/>} />
        <Route path="/shop" element={<Shop/>} />
        <Route path="/cart" element={<Cart/>} />
        <Route 
          path="/admin/index" 
          element={
            <AdminRoute>
              <HomeAdmin/>
            </AdminRoute>
          
          } 
        />
        <Route 
          path="/admin/manage-user" 
          element={
            <AdminRoute>
              <ManageUserAdmin/>
            </AdminRoute>
          
          } 
        />
        <Route 
          path="/admin/create-category" 
          element={
            <AdminRoute>
              <CreateCategory/>
            </AdminRoute>
          
          } 
        />
        <Route 
          path="/admin/create-product" 
          element={
            <AdminRoute>
              <CreateProduct/>
            </AdminRoute>
          
          } 
        />
        <Route 
          path="/admin/update-product/:id" 
          element={
            <AdminRoute>
              <UpdateProductPage/>
            </AdminRoute>
          
          } 
        />
        <Route 
          path="/admin/order" 
          element={
            <AdminRoute>
              <OrderAdmin/>
            </AdminRoute>
          
          } 
        />
        <Route 
          path="/user/index" 
          element={
            <UserRoute>
                <HomeUser/>
            </UserRoute>  
          } 
        />
        <Route 
          path="/user/wishlist" 
          element={
            <UserRoute>
                <Wishlist/>
            </UserRoute>  
          } 
        />
        <Route 
          path="/user/order-history" 
          element={
            <UserRoute>
                <OrderHistory/>
            </UserRoute>  
          } 
        />
        <Route 
          path="/checkout" 
          element={
            <UserRoute>
                <Checkout/>
            </UserRoute>  
          } 
        />
      </Routes>
    </>
  )
}

export default App;
