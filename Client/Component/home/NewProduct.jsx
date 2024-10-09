import React, { useState, useEffect } from 'react'

// function
import {getProductByFilter} from '../functions/Product';
import ProductCard from '../Card/ProductCard';
import LoadingCard from '../Card/LoadingCard';

// Antd
import { Col, Row } from 'antd';

const NewProduct = () => {
  const [ loading, setLoading ] = useState(false);
  const [ product, setProduct ] = useState([]);

  useEffect(()=>{
    loadData()
  },[])

  const loadData = () =>{
    setLoading(true);
    getProductByFilter("createdAt","desc",3)
    .then(res=>{
      setProduct(res.data)
      setLoading(false);
    }).catch(err=>{
      console.log(err);
      setLoading(false);
    });
  };

  return (
       <>
        <Row>
          <Col span={18}> 
            {
              loading
                ? <LoadingCard count={4}/>
                : (
                  <Row gutter={[16, 16]}>
                    { product.map((item, index)=>
                      <div key={index}>
                        <ProductCard product={item}/>
                      </div>
                    )}
                  </Row>
                )
            }
            
          </Col>
        </Row>
      </>
  );
};

export default NewProduct;
