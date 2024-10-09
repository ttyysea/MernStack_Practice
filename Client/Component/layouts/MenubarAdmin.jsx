import React from 'react';
import { Link } from 'react-router-dom';

const MenubarAdmin = () => {
  return (
    <nav>
        <ul className='nav flex-column'>
            <li className='nav-item'>
              <Link to="/admin/index">แดชบอร์ด</Link>
            </li>
            <li className='nav-item'>
              <Link to="/admin/manage-user">จัดการผู้ใช้งาน</Link>
            </li>
            <li className='nav-item'>
              <Link to="/admin/create-category">จัดการหมวดหมู่สินค้า</Link>
            </li>
            <li className='nav-item'>
              <Link to="/admin/create-product">จัดการสินค้า</Link>
            </li>
            <li className='nav-item'>
              <Link to="/admin/order">จัดการคำสั่งซื้อ</Link>
            </li>
        </ul>
    </nav>
  )
}

export default MenubarAdmin