import React, { useState, useEffect } from 'react';
import MenubarAdmin from '../../layouts/MenubarAdmin';
import { Col, Row, Card, Table, Select } from 'antd';
import { useSelector } from 'react-redux';
import { getAllOrder, updateOrderStatus } from '../../functions/Admin';

// Toast
import { toast, Flip } from 'react-toastify';

// Moment
import moment from 'moment/min/moment-with-locales';

const { Column } = Table;

const OrderAdmin = () => {
    const { user } = useSelector((state) => ({ ...state }));
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        getAllOrder(user.token)
            .then((res) => {
                setOrders(res);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    console.log("orders",orders);

    const handleChangeStatus = (id, value) =>{
        console.log('change status id ',id, "Value ",value );
        updateOrderStatus(user.token, id, value)
        .then((res) =>{
            loadData();
            toast.success('Update Order Success ', {
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
        }).catch((err)=>{
            console.log(err);
            toast.success('Update Order Failed ', {
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
        <>
            <Row>
                <Col span={6}>
                    <MenubarAdmin />
                </Col>
                <Col span={18}>
                    <h1>Order Admin</h1>
                    {orders && orders.length > 0 ? (
                        orders.map((order, orderIndex) => (
                            <Card key={orderIndex} title={`Order ${orderIndex + 1}`} bordered={false}>
                                <h4>Order by : {order.orderBy ? order.orderBy.username : 'Unknown'}</h4>
                                <h4>Order Date : {moment(order.createdAt).locale('th').format('llll')}</h4>
                                <Select value={order.status} onChange={(value)=>handleChangeStatus(order._id, value)} style={{width:'100%'}}>
                                    <Select.Option value="Not Process">Not Process</Select.Option>
                                    <Select.Option value="Processing">Processing</Select.Option>
                                    <Select.Option value="Cancelled">Cancelled</Select.Option>
                                    <Select.Option value="Completed">Completed</Select.Option>
                                </Select>
                                <Table dataSource={order.products} rowKey="_id" pagination={false}>
                                    <Column title="Product" dataIndex="name" key="name" />
                                    <Column title="Quantity" dataIndex="count" key="count" />
                                    <Column title="Price" dataIndex="price" key="price" />
                                </Table>
                                <p>Order Created At: {new Date(order.createdAt).toLocaleString()}</p>
                                <p>Order Total: ${order.orderTotal.toFixed(2)}</p>
                                <br />
                            </Card>
                        ))
                    ) : (
                        <p>No orders found</p>
                    )}
                </Col>
            </Row>
        </>
    );
};

export default OrderAdmin;
