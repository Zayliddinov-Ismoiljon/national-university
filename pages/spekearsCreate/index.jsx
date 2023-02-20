'use client';

import { useState, useEffect } from 'react';
import { Button, Divider, Form, Input, Select, Table } from 'antd';
import Wrapper from '../../app/Wrapper/index';
import {Image} from 'next/image';
const { TextArea } = Input;

function SpekearsCreate() {
	const [spekearsGet, setSpekearsGet] = useState([]);
	const [reFetch, setReFetch] = useState(false);
	const [form] = Form.useForm();

	useEffect(() => {
		const options = {
			method: 'GET',
			headers: {},
		};

		fetch(
			'http://ec2-18-181-189-44.ap-northeast-1.compute.amazonaws.com:8080/api/v1/speaker/getAll',
			options,
		)
			.then((response) => response.json())
			.then((data) => {
				setSpekearsGet(data.body);
			});
	}, [reFetch]);

	const spekearsDelete = async (id) => {
		const token = localStorage.getItem('token');
		const options = {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${token}`,
				'My-Custom-Header': 'foobar',
			},
		};

		await fetch(
			`http://ec2-18-181-189-44.ap-northeast-1.compute.amazonaws.com:8080/api/v1/speaker/delete/${id}`,
			options,
		)
			.then((response) => response.json())
			.then((data) => {
				if (data.status == 200) {
					setReFetch((p) => !p);
				}
			});
	};

	const columns = [
		{
			title: "Ma'ruzachi nomi",
			dataIndex: 'name',
			fixed: 'left',
			width: 100
		},
		{
			title: 'Tasnif',
			dataIndex: 'conference',
			width: 150,
		},
		{
			title: 'Rasm',
			dataIndex: 'image',
			width: 150,
		},
		{
			title: "O'chirib tashlash",
			dataIndex: '',
			width: 150,
			render: (_, record) => (
				<Button
					style={{ backgroundColor: 'red', color: 'white' }}
					onClick={() => spekearsDelete(record?.key)}>
					Delete
				</Button>
			),
		},
	];

	const data = spekearsGet.map((item, i) => ({
		key: `${item.id}`,
		name: `${item.fullName}`,
		conference: `${item.description}`,
		image: <Image style={{width:'80px', height:'80px', borderRadius:'5px', objectFit:'cover'}} src={item.imagePath} alt='image' />,
		delete: item,
	}));

	const onSubmit = (values) => {
		console.log('values', values);
		const token = localStorage.getItem('token');
		const valueObj = {
			fullName: values.fullName,
			description: values.description,
			status: values.status
		};
		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(valueObj),
		};

		fetch(
			'http://ec2-18-181-189-44.ap-northeast-1.compute.amazonaws.com:8080/api/v1/speaker/create',
			options,
		)
			.then((response) => response.json())
			.then((data) => {
				console.log('SpkersData', data);
				let id = data.body;
				console.log('id==>', id);
				const formData = new FormData();
				const file = document.querySelector('input[type="file"]').files[0];
				formData.append('file', file);

				const options = {
					method: 'POST',
					headers: {
						Authorization: `Bearer ${token}`,
					},
					body: formData,
				};

				fetch(
					`http://ec2-18-181-189-44.ap-northeast-1.compute.amazonaws.com:8080/api/v1/speaker/uploadPhoto/${Number(id)}`,
					options,
				)
					.then((response) => response.json())
					.then((data) => {
						setReFetch((p) => !p);
						form.resetFields()
					});
				});
	};

	return (
		<Wrapper>
			<Divider>Spiker yaratish</Divider>
			<Form name='basic' layout='vertical' onFinish={onSubmit} form={form}>
				<Form.Item name='fullName' label='Spiker nomi'>
					<Input />
				</Form.Item>
				<Form.Item name='description' label='Tasnif'>
					<TextArea rows={4} />
				</Form.Item>
				<Form.Item name='status'>
					<Select
						defaultValue="Ma'ruzachi maqomi"
						options={[
							{
								value: 'INVITED',
								label: 'Taklif etilgan',
							},
							{
								value: 'GENERAL',
								label: 'Asosiy',
							}
						]}
					/>
				</Form.Item>
				<Form.Item label='Fayl yuklang' name='file'>
					<input type='file' name='file' placeholder='fayl yuklash' />
				</Form.Item>
				<Form.Item>
					<Button
						type='primary'
						style={{ backgroundColor: 'green' }}
						htmlType='submit'>
						Saqlash
					</Button>
				</Form.Item>
			</Form>
			<Divider>Barcha spikerlar</Divider>
			<Table columns={columns} dataSource={data} scroll={{x: 425}}/>
		</Wrapper>
	);
}

export default SpekearsCreate;
