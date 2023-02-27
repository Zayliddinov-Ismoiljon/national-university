'use client';

import React,{ useEffect, useState } from 'react';
import Layout from '../../app/Layout/index';
import { Divider, Table } from 'antd';
import { Form, Button, Input, Select } from 'antd';
import moment from 'moment';
import { BASE_URL } from '../api';

export default function Article() {
	const [ form ] = Form.useForm();
	const [article, setArticle] = useState([]);
	const [reFetch, setReFetch] = useState(false);
	const [session, setSession] = useState([]);
	const columns = [
		{
			title: 'Maqola nomi ',
			dataIndex: 'name',
			fixed: "left",
			width: 150
		},
		{
			title: 'Maqola fayli',
			dataIndex: 'file',
		},
		{
			title: "Sho'ba nomi",
			dataIndex: 'session',
		},
		{
			title: 'Topshirilgan vaqti',
			dataIndex: 'date',
		},
		{
			title: 'Holati',
			dataIndex: 'status',
		},
		{
			title: "O'chirib tashlash",
			dataIndex: 'delete',
		},
	];



	useEffect(() => {
		const options = {
			method: 'GET',
			headers: {},
		};

		fetch(
			`${BASE_URL}/api/v1/session/getAll`,
			options,
		)
			.then((response) => response.json())
			.then((data) => {
				setSession(data.body);
			});
	}, []);

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
				`${BASE_URL}/api/v1/article/getAllByUser`,
				options,
			)
				.then((response) => response.json())
				.then((data) => {
					setArticle(data.body)
				});
		}, [reFetch]);

	const onSubmit = (values) => {
		const token = localStorage.getItem('token');

		const formdata = {};

		const valueObj = {
			name: values.name,
			sessionId: values.sessionId,
		};

		Object.entries(values)?.forEach(([key, value]) => {
			if (key === 'file') {
				formdata[key] = value?.file?.originFileObj;
			} else {
				formdata[key] = value;
			}
		});

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
			`${BASE_URL}/api/v1/article/create`,
			options,
		)
			.then((response) => response.json())
			.then((data) => {
				let id = data.body;
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
					`${BASE_URL}/api/v1/article/upload/${Number(
						id,
					)}`,
					options,
				)
					.then((response) => response.json())
					.then((data) => {
						setReFetch((p) => !p);
						form.resetFields()
					});
			});
	};

	const error = (error) => {
		console.log('error', error);
	};

	const articleDelete = (id) =>{
		const token = localStorage.getItem('token')
		const options = {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${token}`,
				'My-Custom-Header': 'foobar',
			},
		};

		fetch(`${BASE_URL}/api/v1/article/delete/${id}`, options)
			.then((response) => response.json())
			.then((data) => {
        if(data.status == 200){
          setReFetch(p => !p)
        }
			});
	}

	const data = article.map((item, i)=>{
		let session = '';
		if (item.articleSession === null) {
			session = '-';
		} else {
			session = item.articleSession.name;
		}

		let status = '';
		if (item.status === 'UNDER_CONSIDERATION') {
			status = 'Tasdiqlanmagan';
		} else {
      status = 'Tasdiqlangan'
		}
		return	{
				key: `${item.id}`,
				name: `${item.name}`,
				file: (<a style={{ color: 'blue' }} download href={item.filePath}>Yuklab olish</a>),
				session: session,
				date: `${moment(item.regDate).format("DD.MM.YYYY hh:mm:ss")}`,
				status: status,
				delete: <button style={{ color: 'red'}} onClick={() => articleDelete(item?.id)}>Delete</button>,
			}

	});


	return (
		<Layout>
			<Divider>Maqola yaratish</Divider>
			<Form
				name='basic'
				form={form}
				layout='vertical'
				style={{ padding: '20px' }}
				onFinish={onSubmit}
				onFinishFailed={error}
				autoComplete='off'>
				<Form.Item label='Maqola nomi' name='name'>
					<Input />
				</Form.Item>
				<Form.Item label='Maqola shobasi' name='sessionId'>
					<Select>
						{session.map((item, i) => (
							<Select.Option key={i} value={item.id}>
								{item.name}
							</Select.Option>
						))}
					</Select>
				</Form.Item>
				<Form.Item label='Fayl yuklang' name='file'>
					<input type='file' placeholder='Fayl yuklang' name='file' />
				</Form.Item>
				<Form.Item>
					<Button type='primary' className='save-btn' htmlType='submit'>
						Saqlash
					</Button>
				</Form.Item>
			</Form>

			<Divider>Mening maqolalarim</Divider>
			<Table columns={columns} dataSource={data} scroll={{
      x: 1500,
      y: 300,
    }}/>
		</Layout>
	);
}
