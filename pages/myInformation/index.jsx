'use client';

import { useEffect, useState } from 'react';
import Layout from '../../app/Layout/index';
import { Button, Col, Divider, Form, Input, Row } from 'antd';
import { BASE_URL } from '../api';

export default function MyInfotmation() {
	const [form] = Form.useForm();
	const [me, setMe] = useState([]);

	useEffect(() => {
			const token = localStorage.getItem('token');
			const options = {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
			};

			fetch(
				`${BASE_URL}/api/v1/auth/me`,
				options,
			)
				.then((response) => response.json())
				.then((data) => {
					setMe(data);
					form.setFieldsValue({
						lastname: data.lastname,
						firstname: data.firstname,
						middleName: data.middleName,
						telephone: data.telephone,
						email: data.email,
						username: data.username,
						password: data.password,
					});
				});
		}, []);

	const onSubmit = (values) => {
		console.log('values', values);
		const token = localStorage.getItem('token');
		const options = {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(values),
		};

		fetch(
			`${BASE_URL}/api/v1/auth/update`,
			options,
		)
			.then((response) => response.json())
			.then((data) => {
			});
	};

	return (
		<Layout>
				<Divider>Ma&apos;lumotlarim</Divider>
				<div className='text-text'>
					<Form
						layout='vertical'
						form={form}
						className='text-text'
						onFinish={onSubmit}>
						<Row gutter={[6, 12]}>
							<Col xs={24} sm={24} md={24} lg={12}>
								<Form.Item label='Familiyangiz' name='lastname'>
									<Input />
								</Form.Item>
							</Col>
							<Col xs={24} sm={24} md={24} lg={12}>
								<Form.Item label='Ismingiz' name='firstname'>
									<Input />
								</Form.Item>
							</Col>
							<Col xs={24} sm={24} md={24} lg={12}>
								<Form.Item label='Sharifingiz' name='middleName'>
									<Input />
								</Form.Item>
							</Col>
							<Col xs={24} sm={24} md={24} lg={12}>

							<Form.Item label='Telefon Raqamingiz' name='telephone'>
								<Input />
							</Form.Item>
							</Col>
							<Col xs={24} sm={24} md={24} lg={12}>
								<Form.Item label='Elektron pochtangiz' name='email'>
									<Input />
								</Form.Item>
							</Col>
							<Col xs={24} sm={24} md={24} lg={12}>
								<Form.Item label='Loginingiz' name='username'>
									<Input disabled />
								</Form.Item>
							</Col>
							<Form.Item
								style={{ display: 'none' }}
								label='Parolingiz'
								name='password'>
								<Input />
							</Form.Item>
							<Col xs={24} sm={24} md={24} lg={12}>
								<Form.Item>
									<Button
										type='primary'
										style={{ backgroundColor: 'green', }}
										htmlType='submit'>
										Saqlash
									</Button>
								</Form.Item>
							</Col>
						</Row>
					</Form>
				</div>
		</Layout>
	);
}
