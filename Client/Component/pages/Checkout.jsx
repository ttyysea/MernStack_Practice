import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Row, Col, Input, Button } from 'antd';
import { saveOrder } from '../functions/Users';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const initialState = {
  houseNumber: "",
  subDistrict: "",
  province: "",
  zipCode: "",
  phone: "",
};

const Checkout = () => {
  const { cart, user } = useSelector((state) => state);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [orderTotal, setOrderTotal] = useState(0);
  const [address, setAddress] = useState(initialState);
  const [addressSaved, setAddressSaved] = useState(false);

  useEffect(() => {
    if (user && user.token) {
      const dataSource = Array.isArray(cart) ? cart.map((item) => ({
        key: item._id,
        name: item.title,
        price: item.price,
        count: item.count,
        quantity: item.quantity
      })) : [];
      setProducts(dataSource);
      setOrderTotal(Array.isArray(cart) ? cart.reduce((total, item) => total + item.price * item.count, 0) : 0);
    }
  }, [user, cart]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleAddressSubmit = () => {
    const { houseNumber, subDistrict, province, zipCode, phone } = address;
    if (!houseNumber || !subDistrict || !province || !zipCode || !phone) {
      toast.warning('Please fill in all the fields before submitting.');
    } else {
        setAddressSaved(true);
        toast.success('Address saved successfully!');
    };
  };

  const handleCheckout = () => {
    saveOrder(user.token, products, address, orderTotal)
      .then((res) => {
        console.log("res", res);
        dispatch({
            type: 'ADD_TO_CART',
            payload:[]
        })
        if ( window !=="undefined" ) {
            localStorage.removeItem("cart");
        };
        toast.success('Order placed successfully!');
        navigate("/user/order-history")
      })
      .catch((err) => {
        console.log(err);
        toast.error('Order failed.');
      });
  };

  return (
    <>
      <h1>Checkout</h1>
      <Row>
        <hr />
        <Col span={12}>
          <h2>Address</h2>
          {Object.keys(initialState).map((key) => (
            <div key={key}>
              <h4>{key.charAt(0).toUpperCase() + key.slice(1)}</h4>
              <Input
                type="text"
                name={key}
                value={address[key]}
                onChange={handleChange}
                placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
              />
            </div>
          ))}
          <Button onClick={handleAddressSubmit} type="primary">Submit</Button>
        </Col>
        <Col span={12}>
          <h2>Order Summary</h2>
          {products.length ? (
            products.map((item, index) => (
              <div key={index}>
                <p>{item.name}: ${item.price} x {item.count}</p>
              </div>
            ))
          ) : (
            <p>No products in the cart</p>
          )}
          <p>Total: ${orderTotal}</p>
          <Button disabled={!addressSaved} onClick={handleCheckout} type="primary">Checkout</Button>
        </Col>
      </Row>
    </>
  );
};

export default Checkout;
