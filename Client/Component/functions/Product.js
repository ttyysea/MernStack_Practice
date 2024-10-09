import axios from 'axios';

const baseURL = import.meta.env.VITE_REACT_APP_API;

export const createProduct = async (Authorization, value) => {
    try {
        return await axios.post(`${baseURL}/product/create-product`, value,{
            headers: {
                Authorization: `Bearer ${Authorization}`,
                'Content-Type': 'application/json', 
                'Cache-Control': 'no-cache'
            }
        });
    } catch (error) {
        console.error('Failed to create Product: ', error);
        throw error;
    };
};

export const productCount = async (count) =>{
    try{
        return await axios.get(`${baseURL}/product/count/`+count)
    }catch(err){
        console.error('Failed to get '+count+' product');
        throw err;
    };
};

export const getProductByFilter = async (sort, order, limit) =>{
    try{
        return await axios.post(`${baseURL}/product/get-product-filter`,{
            sort, order, limit
        });
    }catch(err){
        console.error('Failed to get '+count+' product');
        throw err;
    };
};
    
export const deleteProduct = async (Authorization, id) =>{
    try {
        return await axios.delete(`${baseURL}/product/delete-product/`+id,{
            headers: {
                Authorization: `Bearer ${Authorization}`,
                'Content-Type': 'application/json', 
                'Cache-Control': 'no-cache'
            }
        });
    }catch(err){
        console.error('Failed to delete Product: ', err);
        throw err;
    };
};

export const getProductById = async (id) =>{
    try{
        return await axios.get(`${baseURL}/product/`+id);
    }catch(err){
        console.error('Failed to get Product By Id');
        throw err;
    };
};

export const updateProduct = async (Authorization, id, value) =>{
    try{
        return await axios.put(`${baseURL}/product/update-product/`+id, value,{
            headers:{
                Authorization: `Bearer ${Authorization}`,
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache'
            }
        })
    }catch(err){
        console.error('Failed to Update Product');
        throw err;
    };
};

export const searchProduct = async(arg)=>{
    try{
        return await axios.post(`${baseURL}/search/product/`, arg,{   
        });
    }catch(err){
        console.error('Failed to Search Product');
        throw err;
    };
};
    