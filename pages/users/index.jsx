'use client';

import { useEffect, useState  } from 'react';
import { Divider, Table } from 'antd'
import Wrapper from '../../app/Wrapper/index'
import { BASE_URL } from '../api';

function Users(){

  const [users, setUsers] = useState([])

  const columns = [
		{
			title: 'Ismi ',
			dataIndex: 'firstname',
			fixed: "left",
			width: 100
		},
		{
			title: 'Familiyasi',
			dataIndex: 'lastname',
			width: 150
		},
		{
			title: "Otasining ismi",
			dataIndex: 'middleName',
			width: 150
		},
		{
			title: 'Login',
			dataIndex: 'username',
			width: 150
		},
		{
			title: 'Email',
			dataIndex: 'email',
			width: 150
		},
		{
			title: "Telefon",
			dataIndex: 'telephone',
			width: 150
		},
	];

	useEffect(() => {
			const token = localStorage.getItem('token')
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
        },
      };

      fetch(
        `${BASE_URL}/api/v1/auth/getAll`,
        options,
      )
        .then((response) => response.json())
        .then((data) => {
          setUsers(data.body);
        });
    }, []);

  const data = users.map((item, i)=>{

		return	{
				key: `${item.id}`,
				firstname: `${item.firstname}`,
				lastname: `${item.lastname}`,
				middleName: `${item.middleName}`,
				username: `${item.username}`,
				email: `${item.email}`,
				telephone: `${item.telephone}`
			}

	})


  return(
    <Wrapper>
      <Divider>Foydalanuvchilar</Divider>
      <Table columns={columns} dataSource={data} scroll={{x: 425}}/>
    </Wrapper>
  )
}

export default Users