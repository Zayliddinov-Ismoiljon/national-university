'use client';

import { useEffect, useState } from 'react';
import { Button, Divider, Form } from 'antd';
import Wrapper from '../../app/Wrapper/index';
import { Image } from 'next/image';

export default function MediaCreate() {
	const [form] = Form.useForm();
	const [spekearsImg, setSpekearsImg] = useState([]);
	const [reFtch, setReFetch] = useState(false);

	useEffect(() => {
		const options = {
			method: 'GET',
			headers: {},
		};

		fetch(
			'http://ec2-18-181-189-44.ap-northeast-1.compute.amazonaws.com:8080/api/v1/media/getAll',
			options,
		)
			.then((response) => response.json())
			.then((data) => {
				setSpekearsImg(data.body);
			});
	}, [reFtch]);

	const onSubmit = (values) => {
		console.log('values', values);
		if (typeof window !== 'undifined') {
			const token = localStorage.getItem('token');

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
				'http://ec2-18-181-189-44.ap-northeast-1.compute.amazonaws.com:8080/api/v1/media/upload',
				options,
			)
				.then((response) => response.json())
				.then((data) => {
					setReFetch((p) => !p);
					form.resetFields()
				});
		}
	};

	const imgDelete = (id) => {
		if (typeof window !== 'undifined') {
			const token = localStorage.getItem('token');
			const options = {
				method: 'DELETE',
				headers: {
					Authorization: `Bearer ${token}`,
					'My-Custom-Header': 'foobar',
				},
			};

			fetch(
				`http://ec2-18-181-189-44.ap-northeast-1.compute.amazonaws.com:8080/api/v1/media/delete/${id}`,
				options
			)
				.then((response) => response.json())
				.then((data) => {
					if (data.status == 200) {
						setReFetch((p) => !p);
					}
				});
		}
	};

	return (
		<Wrapper>
			<Divider>Rasm yuklash</Divider>
			<Form name='basic' layout='vertical' onFinish={onSubmit} form={form}>
				<Form.Item label='Fayl yuklang' name='file'>
					<input type='file' name='file' placeholder='Fayl yuklash' />
				</Form.Item>
				<Form.Item>
					<Button
						type='primary'
						style={{ backgroundColor: 'green' }}
						htmlType='submit'>
						Yuklash
					</Button>
				</Form.Item>
			</Form>
			<Divider>Barcha medialar</Divider>
			<ul className='media_list'>
				{spekearsImg.map((item, i) => (
					<li className='media_item' key={i} xs={24} sm={12} md={6} lg={6}>
						<Image className='media_img' src={item.path} alt='image' />
						<Button
							onClick={() => imgDelete(item?.id)}
							htmlType='button'
							type='primary'
							style={{ backgroundColor: 'red' }}>
							DELETE
						</Button>
					</li>
				))}
			</ul>
		</Wrapper>
	);
}
