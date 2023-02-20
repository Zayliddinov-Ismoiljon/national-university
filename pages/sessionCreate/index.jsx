'use client';

import { useState, useEffect  } from 'react';
import { Button, Divider, Form, Input, Table } from 'antd';
import Wrapper from '../../app/Wrapper/index';

export default function ArticleCreate() {
	const [form] = Form.useForm();
	const [sessionGet, setSessionGet] = useState([]);
	const [reFetch, setReFetch] = useState(false);

  useEffect(() => {
    const options = {
			method: 'GET',
			headers: {},
		};

		fetch(
			'http://ec2-18-181-189-44.ap-northeast-1.compute.amazonaws.com:8080/api/v1/session/getAll',
			options,
		)
			.then((response) => response.json())
			.then((data) => {
				setSessionGet(data.body);
			});
  },[reFetch])

	const onSubmit = (values) => {
		console.log('values', values);
		const token = localStorage.getItem('token');
		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(values),
		};

		fetch(
			'http://ec2-18-181-189-44.ap-northeast-1.compute.amazonaws.com:8080/api/v1/session/create',
			options,
		)
			.then((response) => response.json())
			.then((data) => {
				if (data.status == 200) {
					form.resetFields();
          setReFetch(p => !p)
				}
			});
	};

	const sessionDelete = async (id) => {
    const token = localStorage.getItem('token')
		const options = {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${token}`,
				'My-Custom-Header': 'foobar',
			},
		};

		await fetch(`http://ec2-18-181-189-44.ap-northeast-1.compute.amazonaws.com:8080/api/v1/session/delete/${id}`, options)
			.then((response) => response.json())
			.then((data) => {
				console.log('deleteData', data);
        if(data.status == 200){
          setReFetch(p => !p)
        }
			});
	};

  console.log('sessionGet', sessionGet);

	const columns = [
		{
			title: "Sho'ba nomi",
			dataIndex: 'name',
			fixed:'left',
			width: 100
		},
		{
			title: 'Konferensiya',
			dataIndex: 'conference',
			width: 150,
		},
		{
			title: "O'chirib tashlash",
			dataIndex: '',
			width: 150,
      render: (_, record) => <Button style={{backgroundColor:'red', color:'white'}} onClick={()=>sessionDelete(record?.key)}>Delete</Button>,
		},
	];
	const data = sessionGet.map((item, i) => ({
		key: `${item.id}`,
		name: `${item.name}`,
		conference: `${item.conference}`,
	}));

	return (
		<Wrapper>
			<Divider>Sho&apos;ba yaratish</Divider>
			<Form form={form} onFinish={onSubmit} layout='vertical' method='POST'>
				<Form.Item label="Sho'ba nomi" name='name'>
					<Input />
				</Form.Item>
				<Form.Item label='Konferensiya' name='conference'>
					<Input />
				</Form.Item>
				<Form.Item>
					<Button
						type='primary'
						style={{ backgroundColor: 'green' }}
						htmlType='submit'>
						Yaratish
					</Button>
				</Form.Item>
			</Form>
			<Divider>Barcha Sho&apos;balar</Divider>
			<Table columns={columns} dataSource={data} scroll={{x:425}}/>
		</Wrapper>
	);
}
