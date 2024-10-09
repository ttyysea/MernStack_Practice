import React, { useState, useEffect } from 'react';
import { Upload, Button, Spin } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import axios from 'axios';

const FileUpload = (props) => {
  const { images, setImages, fileList, setFileList } = props;
  const { user } = useSelector((state) => ({ ...state }));
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log("Images have been updated:", images);
  }, [images]);

  const handleChange = async ({ fileList: newFileList }) => {
    setFileList(newFileList);
    if (newFileList.length) {
      await handleUpload(newFileList);
    }
  };

  const handleDelete = async (file) => {
    try {
      setIsLoading(true);
      const { public_id } = file;
      const { data } = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API}/delete-images`,
        { public_id },
        { headers: { Authorization: user.token } }
      );
      // Remove the file from fileList
      const updatedFileList = fileList.filter(f => f !== file);
      setFileList(updatedFileList);
  
      console.log("Images before delete:", images);
      
      // Remove the image from images
      const updatedImages = images.filter(img => img.public_id !== public_id);
      console.log("Images after delete:", updatedImages);
      
      setImages(updatedImages);
  
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };

  const handleUpload = async (newFileList) => {
    const promises = [];
  
    for (let file of newFileList) {
      if (!file.url && file.public_id === undefined) {
        try {
          setIsLoading(true);
          const reader = new FileReader();
          reader.readAsDataURL(file.originFileObj);
  
          const base64data = await new Promise((resolve, reject) => {
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
          });
  
          const res = await axios.post(
            `${import.meta.env.VITE_REACT_APP_API}/create-images`,
            { image: base64data },
            { headers: { Authorization: user.token } }
          );
  
          file.public_id = res.data.public_id;
          promises.push(res.data);
        } catch (err) {
          setIsLoading(false);
          console.log(err);
        }
      }
    }
  
    Promise.all(promises)
      .then((responses) => {
        setImages(prevImages => [...prevImages, ...responses]);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  };

  return (
    <div>
      <Spin spinning={isLoading}>
        <Upload
          listType="picture"
          fileList={fileList}
          onChange={handleChange}
          onRemove={handleDelete}
          beforeUpload={() => false} // Prevent auto-upload
        >
          <Button icon={<UploadOutlined />}>Select File</Button>
        </Upload>
      </Spin>
    </div>
  );
};

export default FileUpload;
