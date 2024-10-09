import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Space, Table, Col, Row, Button, Input } from 'antd';
import { EditFilled, DeleteFilled } from '@ant-design/icons';
import { toast, Flip } from 'react-toastify';

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart, user } = useSelector((state) => state);

  const dataSource = Array.isArray(cart) 
    ? cart.map((item) => ({
        key: item._id,
        name: item.title,
        price: item.price,
        count: item.count,
        quantity: item.quantity
      })) 
    : [];

  const handleEdit = (id) => {
    console.log(`Edit product with ID: ${id}`);
  };

  const handleDelete = (id) => {
    const updatedCart = cart.filter((product) => product._id !== id);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    dispatch({ type: 'UPDATE_CART', payload: updatedCart });
  };

  const handleChangeCount = (id, value) => {
    const updatedCart = cart.map((product) =>
      product._id === id ? { ...product, count: parseInt(value) || 0 } : product
    );

    const productToUpdate = updatedCart.find((product) => product._id === id);
    if (productToUpdate && productToUpdate.count > productToUpdate.quantity) {
      toast.warning('Insufficient product stock for ordering', {
        position: 'top-right',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: 'light',
        transition: Flip,
      });
      return;
    }

    localStorage.setItem('cart', JSON.stringify(updatedCart));
    dispatch({ type: 'UPDATE_CART', payload: updatedCart });
  };

  const calculateTotal = () => {
    return Array.isArray(cart) 
      ? cart.reduce((total, item) => total + item.price * item.count, 0) 
      : 0;
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  const columns = [
    {
      title: 'Product Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price) => `$${price}`,
    },
    {
      title: 'Count',
      dataIndex: 'count',
      key: 'count',
      render: (count, record) => (
        <Input
          onChange={(e) => handleChangeCount(record.key, e.target.value)}
          value={record.count}
          type="number"
        />
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <EditFilled onClick={() => handleEdit(record.key)} />
          <DeleteFilled onClick={() => handleDelete(record.key)} />
        </Space>
      ),
    },
  ];

  return (
    <>
      <Row>
        <Col span={24}>
          <h1>Cart</h1>
        </Col>
        <Col span={24}>
          <div className="cart-container">
            <Table dataSource={dataSource} columns={columns} pagination={false} />
          </div>
        </Col>
      </Row>
      <Row style={{ paddingTop: '20px' }}>
        <Col span={24} className="summary-container">
          <h1>Summary</h1>
          {dataSource.map((item) => (
            <p key={item.key}>
              {item.name} x {item.count} = ${item.count * item.price}
            </p>
          ))}
          <p>Total: ${calculateTotal()}</p>
          {user ? (
            <Button onClick={handleCheckout} disabled={!cart.length}>
              Checkout
            </Button>
          ) : (
            <Button>
              <Link to="/login" state={{ from: 'checkout' }}>
                Login
              </Link>
            </Button>
          )}
        </Col>
      </Row>
    </>
  );
};

export default Cart;
