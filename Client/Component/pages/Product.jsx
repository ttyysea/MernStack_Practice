import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Layout } from 'antd';
import { getProductById } from '../functions/Product';
import SingleProductCard from '../Card/SingleProductCard';

const { Content, Footer } = Layout;

const Product = () => {
    const params = useParams();
    const [productData, setProductData] = useState([]);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        getProductById(params.id)
            .then((res) => {
                setProductData(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <Layout className="layout">
            <Content style={{ padding: '0 50px' }}>
                <div className="site-layout-content">
                   <SingleProductCard product={productData} />
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
        </Layout>
    );
};

export default Product;
