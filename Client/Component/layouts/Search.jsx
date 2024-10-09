import React from 'react';

// DOM
import { useNavigate } from 'react-router-dom';

// Redux
import { useSelector, useDispatch } from 'react-redux';

// Antd
import { Input, Form } from 'antd';
import { SearchOutlined  } from '@ant-design/icons';

const Search = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { search } = useSelector((state)=> ({...state}));
    const { text } = search;

    const handleChange = (e) =>{
        dispatch({
            type:'SEARCH_QUERY',
            payload:{text:e.target.value}
        });
    };

    const handleSubmit = (e) =>{
        navigate('/shop?'+text);
    };

  return (
    <Form onFinish={handleSubmit}>
         <Input onChange={handleChange} placeholder="default size" prefix={<SearchOutlined />} />
    </Form>
  );
};

export default Search;