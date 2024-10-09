import axios from 'axios';

export const getListUser = async (Authorization) => {
    try {
        // ไม่มีการใช้ {} ก่อน set ค่า headers เพราะเป็นคำสั่ง GET จึงไม่มีการส่งข้อมูล body อยู่แล้ว
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/user/list-users`, {
            headers: {
                Authorization: `Bearer ${Authorization}`, // ตรวจสอบว่า token ถูกส่งใน headers อย่างถูกต้อง
                'Content-Type': 'application/json', // เพิ่ม Content-Type header
                'Cache-Control': 'no-cache'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Failed to fetch list users:', error);
        throw error;
    }
};

export const changeUserStatus = async (Authorization, value) => {
    try {
        
        const response = await axios.post(`${import.meta.env.VITE_REACT_APP_API}/user/change-status`, value, {
            headers: {
                Authorization: `Bearer ${Authorization}`, // ตรวจสอบว่า token ถูกส่งใน headers อย่างถูกต้อง
                'Content-Type': 'application/json', // เพิ่ม Content-Type header
                'Cache-Control': 'no-cache'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Failed to Change User Status:', error);
        throw error;
    }
};

export const changeUserRole = async (Authorization, value) => {
    try {
        
        const response = await axios.post(`${import.meta.env.VITE_REACT_APP_API}/user/change-role`, value, {
            headers: {
                Authorization: `Bearer ${Authorization}`, 
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Failed to Change User Role:', error);
        throw error;
    }
};

export const deleteUser = async (Authorization, id) => {
    try {
        
        const response = await axios.delete(`${import.meta.env.VITE_REACT_APP_API}/user/delete-user/`+ id, {
            headers: {
                Authorization: `Bearer ${Authorization}`,
                'Content-Type': 'application/json', 
                'Cache-Control': 'no-cache'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Failed to Delete User :', error);
        throw error;
    }
};

export const changeUserPassword = async (Authorization, value) => {
    try {
        
        const response = await axios.put(`${import.meta.env.VITE_REACT_APP_API}/user/change-password/`, value, {
            headers: {
                Authorization: `Bearer ${Authorization}`,
                'Content-Type': 'application/json', 
                'Cache-Control': 'no-cache'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Failed to Change User Password :', error);
        throw error;
    }
};

export const saveOrder = async (Authorization, products, address, orderTotal) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_REACT_APP_API}/user/order`, {products, address, orderTotal}, {
            headers: {
                Authorization: `Bearer ${Authorization}`, 
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Failed to save Order:', error);
        throw error;
    }
};

export const getOrder = async (Authorization) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/user/get-order`,  {
            headers: {
                Authorization: `Bearer ${Authorization}`, 
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Failed to get user order:', error);
        throw error;
    }
};

export const getWishList = async (Authorization) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/user/get-wishlist`,  {
            headers: {
                Authorization: `Bearer ${Authorization}`, 
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Failed to get Wishlist:', error);
        throw error;
    }
};

export const addToWishList = async (Authorization, productId) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_REACT_APP_API}/user/add-wishlist`, { productId }, {
            headers: {
                Authorization: `Bearer ${Authorization}`, 
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Failed to get Wishlist:', error);
        throw error;
    }
};


// ใช้ PUT แทน DELETE เนื่องจากเป็นการอัพเดตข้อมูลแทนการลบ
export const deleteWishList = async (Authorization, productId) => {
    try {
        const response = await axios.put(`${import.meta.env.VITE_REACT_APP_API}/user/delete-wishlist/` + productId , {}, {
            headers: {
                Authorization: `Bearer ${Authorization}`, 
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Failed to get Wishlist:', error);
        throw error;
    }
};