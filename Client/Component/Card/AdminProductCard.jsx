import React from 'react';

// Antd
import { Card } from 'antd';
import { DeleteFilled, EditOutlined,  } from '@ant-design/icons';

// Link
import { Link } from 'react-router-dom';

const AdminProductCard = ({product, handleDeleteProduct }) => {
    const { Meta } = Card;
    const { 
        _id,
        title, 
        description,
        images
    } = product

    console.log("Product",product)

  return (
    <div>
        <Card
            hoverable
            style={{
                width: 240,
            }}
            actions={[
                <Link to={'/admin/update-product/'+_id}>
                    <EditOutlined className='text-warning'/>
                </Link>,
                <DeleteFilled onClick={() => handleDeleteProduct(_id)} className='text-danger' />,
            ]}
            cover={<img 
                style={{
                    width: '100%',
                    height: '240px',
                    objectFit: 'cover'
                }}
                src={images && images.length 
                    ? images[0].url
                    : ""
                } />}
        >
            <Meta title={title} description={description} />
        </Card>
    </div>
  )
}

export default AdminProductCard;
