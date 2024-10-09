import React, { useState, useEffect } from 'react';
import MenubarAdmin from '../../layouts/MenubarAdmin';

// Antd
import { Col, Row } from 'antd';

// toast
import { toast, Flip } from 'react-toastify';

// Redux
import { useSelector } from 'react-redux';

// functions
import { productCount, deleteProduct } from '../../functions/Product';
import AdminProductCard from '../../Card/AdminProductCard';

const Home = () => {
  const { user } = useSelector((state)=>({...state}))
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadData(10);
  }, []);

  const loadData = (count) => {
    setLoading(true);
    productCount(count)
      .then(res => {
        setProduct(res.data); // Update the state with the product data
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        console.log(err);
        toast.error('Get Product failed: ' + err.response, {
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

  const handleDeleteProduct = (id) =>{
    if(window.confirm("Are You Sure for Delete")){
      setLoading(true);
      deleteProduct(user.token, id)
      .then(res=>{
        setLoading(false);
        console.log(res);
        loadData(10);
      }).catch(err=>{
        setLoading(false);
        console.log(err);
      });
    };
  };

  return (
    <>
      <Row>
        <Col span={6}>  
          <MenubarAdmin />
        </Col>
        <Col span={18}> {/* Change span to 18 to fill the space */}
          {
            loading
              ? <h1>Loading...</h1>
              : <h1>Home Admin</h1>
          }
          <Row gutter={[16, 16]}>
            {
              product.map((item) => (
                <Col key={item._id} span={8}>
                  <AdminProductCard handleDeleteProduct={handleDeleteProduct} product={item} />
                </Col>
              ))
            }
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default Home;
