import axios from 'axios';

const baseURL = import.meta.env.VITE_REACT_APP_API;

export const createCategory = async (Authorization, value) => {
    try {
        return await axios.post(`${baseURL}/category/create-category`, value,{
            headers: {
                Authorization: `Bearer ${Authorization}`,
                'Content-Type': 'application/json', 
                'Cache-Control': 'no-cache'
            }
        });
    } catch (error) {
        console.error('Failed to create Category: ', error);
        throw error;
    };
};

export const getAllCategory = async () => {
    try {
        return await axios.get(`${baseURL}/category/category-list`, {});
    } catch (error) {
        console.error('Failed to fetch Category list : ', error);
        throw error;
    };
};

export const deleteCategory = async (Authorization, id) => {
    try {
        return await axios.delete(`${baseURL}/category/delete-category/`+ id, {
            headers: {
                Authorization: `Bearer ${Authorization}`,
                'Content-Type': 'application/json', 
                'Cache-Control': 'no-cache'
            }
        });
    } catch (error) {
        console.error('Failed to Delete Category : ', error);
        throw error;
    };
};

export const updateCategory = async (Authorization, id, value) => {
    try {
        return await axios.put(`${baseURL}/category/update-category/`+ id, value,{
            headers: {
                Authorization: `Bearer ${Authorization}`,
                'Content-Type': 'application/json', 
                'Cache-Control': 'no-cache'
            }
        });
    } catch (error) {
        console.error('Failed to Update Category : ', error);
        throw error;
    };
};
