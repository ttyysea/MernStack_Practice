import React from 'react';
import { Row, Col, Typography } from 'antd';
import NewProduct from '../home/NewProduct';
import BestSellerProduct from '../home/BestSellerProduct';

const { Title } = Typography;

const Home = () => {
  return (
    <div>
      <Row justify="center" style={{ marginTop: '50px' }}>
        <Col xs={24} sm={20} md={16} lg={12} xl={10}>
          <div style={{ textAlign: 'center' }}>
            <Title level={4}>สินค้ามาใหม่</Title>
            <NewProduct />
          </div>
        </Col>
      </Row>
      <Row justify="center" style={{ marginTop: '50px' }}>
        <Col xs={24} sm={20} md={16} lg={12} xl={10}>
          <div style={{ textAlign: 'center' }}>
            <Title level={4}>สินค้าขายดี</Title>
            <BestSellerProduct />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
