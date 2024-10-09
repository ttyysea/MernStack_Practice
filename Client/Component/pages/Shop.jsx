import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ProductCard from '../Card/ProductCard';
import { Row, Col, Typography, Slider, Checkbox } from 'antd';

const { Title } = Typography;

import { getAllCategory } from '../functions/Category';
import { productCount, searchProduct } from '../functions/Product';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { search } = useSelector((state) => ({ ...state }));
  const { text } = search;
  const [priceFilter, setPriceFilter] = useState([0, 10000]);
  const [category, setCategory] = useState([]);
  const [categorySelect, setCategorySelect] = useState([]);

  useEffect(() => {
    loadInitialProducts();
    loadCategories();
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (text) {
        fetchFilteredProducts({ query: text });
      } else {
        loadInitialProducts();
      }
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [text]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (priceFilter[0] !== 0 || priceFilter[1] !== 10000) {
        fetchFilteredProducts({ price: priceFilter });
      }
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [priceFilter]);

  useEffect(() => {
    if (categorySelect.length > 0) {
      fetchFilteredProducts({ category: categorySelect });
    }
  }, [categorySelect]);

  const loadInitialProducts = () => {
    setLoading(true);
    productCount(12)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  const loadCategories = () => {
    getAllCategory()
      .then((res) => {
        setCategory(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const fetchFilteredProducts = (filters) => {
    setLoading(true);
    searchProduct(filters)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  const onChangeFilterPrice = (value) => {
    setPriceFilter(value);
  };

  const onCategoryChange = (checkedValues) => {
    if (checkedValues.length <1){
      loadInitialProducts();
    } else{
      setCategorySelect(checkedValues);
    }
  };

  return (
    <Row justify="center" gutter={[16, 16]}>
      <Col xs={24} sm={6} md={6} lg={6} xl={6}>
        <div>Filter / Search</div>
        <Slider
          value={priceFilter}
          onChange={onChangeFilterPrice}
          range
          max={10000}
        />
        <div style={{ marginTop: 20 }}>
          <Checkbox.Group
            options={category.map((item) => ({ label: item.name, value: item._id }))}
            onChange={onCategoryChange}
          />
        </div>
      </Col>
      <Col xs={24} sm={18} md={18} lg={18} xl={18}>
        {loading ? (
          <Title level={2}>Loading...</Title>
        ) : (
          <Title level={2}>Products</Title>
        )}

        {products.length < 1 && !loading && <p>No products found</p>}

        <Row gutter={[16, 16]}>
          {products.map((item, index) => (
            <Col key={index} xs={24} sm={12} md={8} lg={6} xl={6}>
              <ProductCard product={item} />
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  );
};

export default Shop;
