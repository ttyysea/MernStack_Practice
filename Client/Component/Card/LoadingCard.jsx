import React from 'react';
import { Skeleton, Card, Row, Col } from 'antd';

const LoadingCard = ({ count }) => {
  const renderCards = () => {
    let cards = [];
    for (let i = 0; i < count; i++) {
      cards.push(
        <Col key={i} className="gutter-row" span={6}>
          <Card>
            <Skeleton active />
          </Card>
        </Col>
      );
    }
    return cards;
  };

  return (
    <Row
      gutter={{
        xs: 8,
        sm: 16,
        md: 24,
        lg: 32,
      }}
    >
      {renderCards()}
    </Row>
  );
};

export default LoadingCard;
