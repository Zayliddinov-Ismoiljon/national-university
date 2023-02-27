'use client';

import { useEffect, useState } from "react";
import { Form, message } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { BASE_URL } from "../api";


function Login () {
	const router = useRouter();
	const [me, setMe] = useState([]);

	const onSubmit = (values) => {

		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			body: JSON.stringify(values),
		};

		fetch(
			`${BASE_URL}/api/v1/auth/login`,
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
			`${BASE_URL}/api/v1/auth/me`,
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
				src='https://static.vecteezy.com/system/resources/previews/014/326/974/original/laboratorium-with-conducting-research-scientific-experimentation-and-measurement-in-a-lab-in-flat-cartoon-hand-drawn-templates-illustration-vector.jpg'
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
