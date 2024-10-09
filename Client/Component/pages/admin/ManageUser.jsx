import React, { useState, useEffect } from 'react';
import MenubarAdmin from '../../layouts/MenubarAdmin';
import { Col, Row, Table, Switch, Select, Tag, Space, Modal } from 'antd';
import { DeleteFilled, EditFilled } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { getListUser, changeUserStatus, changeUserRole, deleteUser, changeUserPassword } from '../../functions/Users';
import moment from 'moment/min/moment-with-locales';


const ManageUser = () => {
  const { user } = useSelector((state) => ({ ...state }));
  // Original Data
  const [data, setData] = useState([]);
  // Selected Data
  const [selectData, setSelectData] = useState([]);
  const { Column } = Table;
  const roleData = ['admin', 'user'];
  const [value, setValue] = useState({
    id: '',
    password: '',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = (id) => {
    setIsModalOpen(true);
    setValue({...value, id:id});
  };

  const handleChangeUserPassword = (e) =>{
    setValue({...value, [e.target.name]: e.target.value});
  };

  const handleOk = () => {
    setIsModalOpen(false);
    changeUserPassword(user.token, value)
    .then(res => {
      loadData(user.token);
    }).catch(err => {
      console.log(err.response);
    })
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };


  useEffect(() => {
    if (user && user.token) {
      loadData(user.token);
    }
  }, [user]);

  const loadData = (Authorization) => {
    getListUser(Authorization)
      .then((res) => {
        const users = res.map((user, index) => ({
          ...user,
          key: index,
          enabled: user.enabled ? 'Yes' : 'No',
          createdAt: moment(user.createdAt).locale('th').format('llll'),
          updatedAt: moment(user.updatedAt).locale('th').startOf(user.updatedAt).fromNow(),
        }));
        setData(users);
        setSelectData(users);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const onChangeStatusSwitch = (checked, id) => {
    const value = {
      id: id,
      enabled: checked,
    };
    changeUserStatus(user.token, value)
      .then((res) => {
        loadData(user.token);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const onChangeRole = (role, id) => {
    const value = {
      id: id,
      role: role,
    };
    changeUserRole(user.token, value)
      .then((res) => {
        loadData(user.token);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const handleDeleteUser = (username, id) => {
    if (window.confirm(`Confirm Deletion Of " ${username} " User.`)) {
      deleteUser(user.token, id)
        .then((res) => {
          loadData(user.token);
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
  };

  const handleSelectRole = (value) =>{
    if(value === 'all'){
      setSelectData(data);
    }else{
      const filterData = data.filter(item=>{
        return item.role === value;
      });
      setSelectData(filterData);
    };
  };
  

  return (
    <>
      <Row>
        <Col span={6}>
          <MenubarAdmin />
        </Col>
        <Col span={6}>
          <h1>Manage User Page</h1>
        </Col>
      </Row>
      <Select onChange={(value)=>handleSelectRole(value)}>
        <Select.Option value='all'>All</Select.Option>
        <Select.Option value='user'>User</Select.Option>
        <Select.Option value='admin'>Admin</Select.Option>
      </Select>
      <Table dataSource={selectData}>
        <Column title="Username" dataIndex="username" key="username" />
        <Column
          title="Role"
          dataIndex="role"
          key="role"
          render={(role, record) => (
            <Select
              style={{ width: '100px' }}
              value={record.role}
              onChange={(role) => onChangeRole(role, record._id)}
            >
              {roleData.map((item, index) => (
                <Select.Option value={item} key={index}>
                  {item === 'admin' ? <Tag color="purple">{item}</Tag> : <Tag color="green">{item}</Tag>}
                </Select.Option>
              ))}
            </Select>
          )}
        />
        <Column
          title="Status"
          dataIndex="enabled"
          key="enabled"
          render={(enabled, record) => (
            <Switch
              checked={enabled === 'Yes'}
              onChange={(checked) => onChangeStatusSwitch(checked, record._id)}
            />
          )}
        />
        <Column title="Created" dataIndex="createdAt" key="createdAt" />
        <Column title="Updated" dataIndex="updatedAt" key="updatedAt" />
        <Column
          title="Action"
          dataIndex="action"
          key="action"
          render={(_, record) => (
            <Space size="middle">
              <EditFilled onClick={() => showModal(record._id)}/>
              <DeleteFilled onClick={() => handleDeleteUser(record.username, record._id)} />
            </Space>
          )}
        />
      </Table>
      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>Password</p>
        <input 
          onChange={handleChangeUserPassword}
          type="text"
          name="password"
        />
      </Modal>
    </>
  );
};

export default ManageUser;
