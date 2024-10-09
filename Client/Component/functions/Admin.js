import axios from "axios";

export const getAllOrder = async (Authorization) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/admin/get-all-order`,  {
            headers: {
                Authorization: `Bearer ${Authorization}`, 
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Failed to get all order:', error);
        throw error;
    }
};

export const updateOrderStatus = async (Authorization, orderId, orderStatus) => {
    try {
        
        const response = await axios.put(`${import.meta.env.VITE_REACT_APP_API}/admin/change-order-status`, 
            {orderId, orderStatus}, 
            {
            headers: {
                Authorization: `Bearer ${Authorization}`, // ตรวจสอบว่า token ถูกส่งใน headers อย่างถูกต้อง
                'Content-Type': 'application/json', // เพิ่ม Content-Type header
                'Cache-Control': 'no-cache'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Failed to Change Order Status:', error);
        throw error;
    }
};


