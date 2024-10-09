import React from 'react';

// Antd
import { Card, Carousel, Row, Col, Typography, List } from 'antd';
import { ShoppingCartOutlined, HeartOutlined } from '@ant-design/icons';

// Link
import { Link } from 'react-router-dom';

// lodash
import _ from 'lodash';

// Redux
import { useSelector, useDispatch } from 'react-redux';

// functions 
import { addToWishList } from '../functions/Users';

// Toast
import { toast } from 'react-toastify';

const { Title, Paragraph } = Typography;

const contentStyle = {
    margin: 0,
    width: '100%',
    maxHeight: '600px',
    objectFit: 'contain'
};

const carouselContainerStyle = {
    maxHeight: '1000px',
    overflow: 'hidden'
};

const SingleProductCard = ({ product }) => {
    const { user } = useSelector((state)=>({...state}));
    const dispatch = useDispatch();
    const { Meta } = Card;
    const { 
        _id,
        title,
        description,
        images = [], // default to empty array if images is undefined
        price,
        quantity,
        category
    } = product || {}; // default to an empty object if product is undefined

    const handleSlideChange = () => {
        // Handle slide change if needed
    };

    const handleAddToWishList = () => {
        console.log("id",_id);
        if (user){
            addToWishList(user.token, _id)
            .then(res=>{
                console.log("res",res);
                toast.success("Add to wishlist success");
            }).catch(err=>{
                console.log("err",err);
            });
        }else{
            toast.error("Please login to add to wishlist");
        };
    };

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
        <Row style={{paddingTop:'50px'}} gutter={[16, 16]}>
            <Col xs={24} md={12}>
                <div style={carouselContainerStyle}>
                    <Carousel autoplay afterChange={handleSlideChange}>
                        {images.length > 0 ? (
                            images.map((item, index) => (
                                <div key={index}>
                                    <img src={item.url} alt={`product-${index}`} style={contentStyle} />
                                </div>
                            ))
                        ) : (
                            <div>
                                <img src="default-image-url.jpg" alt="default" style={contentStyle} />
                            </div>
                        )}
                    </Carousel>
                </div>
            </Col>
            <Col xs={24} md={12}>
                <Card
                    style={{
                        width: '100%',
                        height: 'auto',
                    }}
                    actions={[
                        <a onClick={handleAddToWishList}>
                            <HeartOutlined className='text-danger' />
                            <br />
                            Add to wishlist
                        </a>,
                        <a onClick={handleAddToCart}>
                                <ShoppingCartOutlined className='text-warning' />
                                <br />
                                Add to cart
                        </a>
                    ]}
                >
                    <Title level={2}>{title}</Title>
                    <Paragraph>{description}</Paragraph>
                    <List>
                    { category &&
                            <List.Item>
                                <List.Item.Meta
                                    title="Category"
                                    description={category.name}
                                />
                            </List.Item>
                        }
                        <List.Item>
                            <List.Item.Meta
                                title="Price"
                                description={`$${price}`}
                            />
                        </List.Item>
                        <List.Item>
                            <List.Item.Meta
                                title="Quantity"
                                description={quantity}
                            />
                        </List.Item>
                       
                        
                    </List>
                </Card>
            </Col>
        </Row>
    );
};

export default SingleProductCard;
