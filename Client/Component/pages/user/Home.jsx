import React from 'react';
// Antd
import { Col, Row } from 'antd';

// Layouts
import MenubarUser from '../../layouts/MenubarUser';

const Home = () => {
  return (
    <>
    <Row>
      <Col span={6}>  
      <MenubarUser />
      </Col>
      <Col span={18}> 
        <Row gutter={[16, 16]}>
          <h1>Home User</h1>
          <p>หิวข้าว</p>
        </Row>
      </Col>
    </Row>
  </>
  )
}

export default Home;
