'use client';

import { useState } from "react";
import { Form, message } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";


function Login () {
	const router = useRouter();
	const [me, setMe] = useState([]);

	const onSubmit = (values) => {
		console.log('Success:', values);

		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			body: JSON.stringify(values),
		};

		fetch(
			'http://ec2-18-181-189-44.ap-northeast-1.compute.amazonaws.com:8080/api/v1/auth/login',
			options,
		)
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				if(data?.status == 200 && data?.body?.accessToken ){
					localStorage.setItem('token', data?.body?.accessToken);
					getMe(data?.body?.accessToken)
				} else {
					message.error(data.friendlyMessage)
				}
			}).catch((error) => {
				console.log(error);
				message.error(error.friendlyMessage);
			});
	};

	const getMe = async (token) => {
		const checkMe = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: `Bearer ${token}`,
			},
		};

		await fetch(
			'http://ec2-18-181-189-44.ap-northeast-1.compute.amazonaws.com:8080/api/v1/auth/me',
			checkMe,
		)
			.then((response) => {
				return response.json();
			})
			.then((data) => {
					if ( data?.roles?.length && data?.roles[0].code === 'ADMIN') {
						router.push('/sessionCreate');
					}else router.push('/myInformation');
					setMe(data);
			})
	}

	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};

	return (
		<div class='vid-container'>
			<img
				src='https://i.pinimg.com/originals/5a/c8/f7/5ac8f72faa2c8a7b37ab20acdf9b8d0f.jpg'
				alt='image'
				className='bgvid back'
			/>
			<div class='inner-container'>
				<div class='box'>
					<h1>Tizimga Kirish</h1>
					<Form
						layout='vertical'
						name='basic'
						style={{width:'80%', margin:'0 auto'}}
						initialValues={{
							remember: true,
						}}
						onFinish={onSubmit}
						onFinishFailed={onFinishFailed}
						autoComplete='off'
						className='login-form'>
						<Form.Item name='username'>
							<input width={'100vh'} type='text' placeholder='Login' required/>
						</Form.Item>

						<Form.Item name='password'>
							<input width={'100%'} type='password' required/>
						</Form.Item>

						<Form.Item>
							<button type='primary' htmlType='submit'>
								Yuborish
							</button>
						</Form.Item>
					</Form>
					<p>
						Akkauntingiz mavjud emasmi?{' '}
						<Link href='/register' className='register-link'>
							Ro&apos;yxatdan o&apos;ting
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}

export default Login;
