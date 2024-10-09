import React, { useState, useEffect } from 'react';
import MenubarAdmin from '../../../layouts/MenubarAdmin';
import { useSelector } from 'react-redux';


// Antd
import { Modal, Space, Table, Col, Row, Button, Form, Input } from 'antd';
import { DeleteFilled, EditFilled } from '@ant-design/icons';

// functions
import { createCategory, getAllCategory, deleteCategory, updateCategory } from '../../../functions/Category';

// Toast
import { toast, Flip } from 'react-toastify';

const CreateCategory = () => {
    const { user } = useSelector((state) => ({ ...state }));
    const { Column } = Table;
    const [value, setValue] = useState({        
        categoryName: "",
    });
    const [valueUpdate, setValueUpdate] = useState({        
        id: "",
        categoryNameUpdate: "",
    });
    const [categoryData, setCategoryData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const loadData = () => {
        getAllCategory()
        .then(res => {
            console.log(res.data);
            setCategoryData(res.data);
        }).catch(err => {
            console.log(err);
        });
    };

    useEffect(() => {
        loadData();
    }, []);
 
    const handleSubmit = () => {
        createCategory(user.token,value)
        .then(res => {
            toast.success(value.categoryName + ' has been created. ', {
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
            loadData();
        }).catch(err => {
            console.log(err);
            toast.error('Create Category ' + value.categoryName + ' failed: ' + err.response.data, {
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
        setValue({
            ...value,
            [e.target.name]: e.target.value
        });
    };

    const handleDeleteCategory = (categoryName, id) => {
        if (window.confirm(`Confirm Deletion Of Category: ${categoryName}`)){
            deleteCategory(user.token,id)
            .then(res => {
                loadData();
                toast.success(categoryName + ' has been deleted. ', {
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
            }).catch(err => {
                console.log(err);
                toast.error('Delete Category ' + categoryName + ' failed: ' + err.response.data, {
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
    };

    const showModal = (id, name) => {
        setIsModalOpen(true);
        setValueUpdate({ id: id, categoryNameUpdate: name });
    };
    
    const handleOk = () => {
        setIsModalOpen(false);
        updateCategory(user.token,valueUpdate.id, { name: valueUpdate.categoryNameUpdate })
        .then(res => {
            loadData();
            toast.success('Category has been updated. ', {
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
        }).catch(err => {
            console.log(err.response);
            toast.error('Update Category failed: ' + err.response.data, {
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
    
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    
    const handleChangeCategoryName = (e) => {
        setValueUpdate({ ...valueUpdate, [e.target.name]: e.target.value });
    };

    return (
        <>
            <Row>
                <Col span={6}>  
                    <MenubarAdmin />
                </Col>
                <Col span={6}>  
                    <h1>Create Category</h1>
                </Col>
            </Row>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', height: '100vh', paddingTop: '50px' }}>
                <div style={{ width: '100%', maxWidth: '800px', padding: '20px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', borderRadius: '8px', backgroundColor: 'white' }}>
                    <Form onFinish={handleSubmit}>
                        <Form.Item label="Category Name">
                            <Input type="text" name="categoryName" placeholder="input name of Category" onChange={handleChange} />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                    <hr/>
                    <Table dataSource={categoryData}>
                        <Column title="Category Name" dataIndex="name" key="name" />
                        <Column
                            title="Action"
                            dataIndex="action"
                            key="action"
                            render={(_, record) => (
                                <Space size="middle">
                                    <EditFilled onClick={() => showModal(record._id, record.name)} />
                                    <DeleteFilled onClick={() => handleDeleteCategory(record.name, record._id)} />
                                </Space>
                            )}
                        />
                    </Table>
                    <Modal title="Update Category" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                        <p>Name</p>
                        <Input 
                            onChange={handleChangeCategoryName}
                            value={valueUpdate.categoryNameUpdate}
                            type="text"
                            name="categoryNameUpdate"
                        />
                    </Modal>
                </div>
            </div>
        </>
    );
};

export default CreateCategory;
