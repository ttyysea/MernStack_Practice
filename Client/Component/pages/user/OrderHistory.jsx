import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Col, Row, Card, Table, Button } from 'antd';
const { Column } = Table;
import MenubarUser from '../../layouts/MenubarUser';
import { getOrder } from '../../functions/Users';
import { PDFDownloadLink } from '@react-pdf/renderer';

import Invoice from '../../Order/Invoice';


const OrderHistory = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await getOrder(user.token);
        setOrders(res);
      } catch (err) {
        console.error(err);
      }
    };

    loadData();
  }, [user.token]);

  return (
    <>
      <Row gutter={16}>
        <MenubarUser />
        <Col span={24}>
          <h1>User History</h1>
          {orders.length > 0 ? (
            orders.map((order, orderIndex) => (
              <div>
                <Card key={orderIndex} title={`Order ${orderIndex + 1}`} bordered={false}>
                  <Table dataSource={order.products} rowKey="_id" pagination={false}>
                    <Column title="Product" dataIndex="name" key="name" />
                    <Column title="Quantity" dataIndex="count" key="count" />
                    <Column title="Price" dataIndex="price" key="price" />
                  </Table>
                  <p>Order Created At: {new Date(order.createdAt).toLocaleString()}</p>
                  <p>Order Total: ${order.orderTotal.toFixed(2)}</p>
                  <p>Status: {order.status}</p>
                  <br />
                </Card>
                <Row>
                  <Col>
                    <PDFDownloadLink
                      document={
                          <Invoice order={order}/>
                      }
                    >
                      PDF Download
                    </PDFDownloadLink>
                  </Col>
                </Row>
              </div>
              
            ))
          ) : (
            <p>No orders found</p>
          )}
        </Col>
      </Row>
    </>
  );
};

export default OrderHistory;
