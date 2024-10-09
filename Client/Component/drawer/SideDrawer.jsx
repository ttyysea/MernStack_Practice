import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Drawer, Row, Col, Button } from 'antd';

const SideDrawer = () => {
    const dispatch = useDispatch();
    const { cart, drawer } = useSelector((state) => ({...state}));

    const onCloseDrawer = () =>{
        dispatch({
            type: "SET_DRAWER",
            payload: false,
          });
    };

    console.log(cart)

  return (
    <Drawer title={"Cart "+cart.length+" products"} placement='right' onClose={onCloseDrawer} open={drawer}>
        {cart.map((item)=>
            <Row key={item.key}>
                <Col>
                    <img src={item.images[0].url} style={{width:'100%', height:'60px', objectFit:'cover'}}/>
                    {item.title} x {item.count} = ${item.count * item.price}
                </Col>   
            </Row>
            
        )}
        <hr/>
        <Link to='/cart'>
            <Button onClick={onCloseDrawer}>
                Go to cart
            </Button>
        </Link>
         
    </Drawer>
  )
}

export default SideDrawer
