import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { deleteWishList, getWishList } from '../../functions/Users';
import { Col, Row } from 'antd';
import MenubarUser from '../../layouts/MenubarUser';

// dom
import { Link } from 'react-router-dom';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const { user } = useSelector((state) => ({...state}));

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    getWishList(user.token)
      .then((res) => {
        console.log("Wishlist data loaded:", res);
        if (res && res.wishlist) {
          setWishlist(res.wishlist);
        } else {
          setWishlist([]);
          console.log("No wishlist data found");
        }
      })
      .catch((err) => {
        console.log("Error loading wishlist:", err);
      });
  };

  const handleDeleteWishlist = (productId) => {
    deleteWishList(user.token, productId)
      .then((res) => {
        console.log("Wishlist item deleted:", res);
        loadData(); // Reload wishlist after deletion
      })
      .catch((err) => {
        console.log("Error deleting wishlist item:", err);
      });
  };

  return (
    <Row>
      <Col span={6}>
        <MenubarUser />
      </Col>
      <Col span={18}>
        <h1>Wishlist Page</h1>
        {wishlist.length > 0 ? (
          wishlist.map((item, index) => (
            <div key={index}>
              <Link to={"/product/"+item._id}>
                <h3>{item.title}</h3>
              </Link>
              <span onClick={() => handleDeleteWishlist(item._id)}>
                ลบ
              </span>
            </div>
          ))
        ) : (
          <p>No items in wishlist</p>
        )}
      </Col>
    </Row>
  );
};

export default Wishlist;
