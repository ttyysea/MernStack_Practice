import React, { useState, useEffect } from 'react';
import MenubarAdmin from '../../../layouts/MenubarAdmin';
import { Col, Row, Button, Form, Input, Select } from 'antd';
import { useSelector } from 'react-redux';
import { createProduct } from '../../../functions/Product';
import { getAllCategory } from '../../../functions/Category';
import { toast, Flip } from 'react-toastify';
import FileUpload from './FileUpload';

const initialState = {
  title: "",
  description: "",
  category: "Select a Category",
  price: "",
  quantity: "",
};

const CreateProduct = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [value, setValue] = useState(initialState);
  const [categories, setCategories] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    getAllCategory()
      .then(res => {
        setCategories(res.data);
      }).catch(err => {
        console.log(err);
      });
  };

  console.log("Value images ", images)
  console.log("filelist  ", fileList)

  const handleSubmit = async () => {
    const productData = { ...value, images: images }; // Ensure that only URLs are sent

    await createProduct(user.token, productData)
      .then(res => {
        toast.success(value.title + ' has been created.', {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "light",
          transition: Flip,
        });
        setValue(initialState); 
        setFileList([]); 
        setImages([]);
      }).catch(err => {
        console.log(err);
        toast.error('Create Product ' + value.title + ' failed: ' + err.response.data, {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "light",
          transition: Flip,
        });
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValue(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleCategoryChange = (value) => {
    setValue(prevState => ({
      ...prevState,
      category: value
    }));
  };



  return (
    <>
      <Row>
        <Col span={6}>
          <MenubarAdmin />
        </Col>
        <Col span={6}>
          <h1>Create Product</h1>
        </Col>
      </Row>
      <Form onFinish={handleSubmit}>
        <Form.Item label="Title">
          <Input type="text" name="title" placeholder="input title" value={value.title} onChange={handleChange} />
        </Form.Item>
        <Form.Item label="Description">
          <Input type="text" name="description" placeholder="input description" value={value.description} onChange={handleChange} />
        </Form.Item>
        <Form.Item label="Category">
          <Select value={value.category} name="category" onChange={handleCategoryChange}>
            {categories.length > 0 && categories.map((category, index) =>
              <Select.Option key={index} value={category._id}>
                {category.name}
              </Select.Option>
            )}
          </Select>
        </Form.Item>
        <Form.Item label="Price">
          <Input type="number" name="price" placeholder="input price" value={value.price} onChange={handleChange} />
        </Form.Item>
        <Form.Item label="Quantity">
          <Input type="number" name="quantity" placeholder="input quantity" value={value.quantity} onChange={handleChange} />
        </Form.Item>
        <Form.Item>
          <FileUpload images={images} setImages={setImages} fileList={fileList} setFileList={setFileList} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default CreateProduct;
