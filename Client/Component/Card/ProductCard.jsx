import React from 'react';
import { Card } from 'antd';
import { ShoppingCartOutlined, EyeOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { useDispatch } from 'react-redux';

const ProductCard = ({ product }) => {
  const { Meta } = Card;
  const { _id, title, description, price, images } = product;
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    let cart = [];
    if (localStorage.getItem('cart')) {
      cart = JSON.parse(localStorage.getItem('cart'));
    }
    
    // Check if product is already in the cart
    let foundProduct = cart.find(item => item._id === _id);
    if (foundProduct) {
      // Increment the count if the product is found
      foundProduct.count += 1;
    } else {
      // Add the product to the cart if it is not found
      cart.push({
        ...product,
        count: 1,
      });
    }

    let unique = _.uniqWith(cart, _.isEqual);
    localStorage.setItem('cart', JSON.stringify(unique));
    dispatch({
      type: "ADD_TO_CART",
      payload: unique,
    });
    dispatch({
      type: "SET_DRAWER",
      payload: true,
    });
  };

  return (
    <div>
      <Card
        hoverable
        style={{ width: 240 }}
        actions={[
          <Link key="view" to={'/product/' + _id}>
            <EyeOutlined className='text-success' />
          </Link>,
          <ShoppingCartOutlined onClick={handleAddToCart} key="cart" className='text-danger' />,
        ]}
        cover={
          <img
            style={{ width: '100%', height: '240px', objectFit: 'cover' }}
            src={images && images.length ? images[0].url : ''}
            alt={title}
          />
        }
      >
        <Meta
          title={title}
          description={
            <>
              <p>{description}</p>
              <p>Price: ${price}</p>
            </>
          }
        />
      </Card>
    </div>
  );
};

export default ProductCard;
