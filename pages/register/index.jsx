'use client';

import { useState } from 'react';
import { Form, message } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { BASE_URL } from '../api';

const Register = () => {
	const [register, setRegister] = useState([]);
	const router = useRouter();

	const onSubmit = (values) => {
		const token = localStorage.getItem('token');
		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				accessToken: `${token}`,
			},
			body: JSON.stringify(values),
		};

		fetch(
			`${BASE_URL}/api/v1/auth/register`,
			options,
		)
			.then((response) => {
				return  response.json();
			})
			.then((data) => {
				if (data.status == 200) {
					setRegister(data);
					router.push('/login');
				} else {
					message.error(data?.friendlyMessage)
				}
			}).catch((error) => {
				console.log(error);
				message.error(error.friendlyMessage);
			});
	};

	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};


	return (
		<>
			<div class='register-main'>
				<div class='register-container'>
					<div id='square'>
						<div class='front'>
							<h1>Sign In</h1>

							<Form
								name='basic'
								initialValues={{
									remember: true,
								}}
								onFinish={onSubmit}
								onFinishFailed={onFinishFailed}
								autoComplete='off'
								method='POST'
								className='register-sigin'>
								<Form.Item name='lastname' required>
									<input
										name='lastname'
										type='text'
										placeholder='Familiyangiz'
										required
									/>
								</Form.Item>
								<Form.Item name='firstname' required>
									<input name='name' type='text' placeholder='Ismingiz'  required/>
								</Form.Item>
								<Form.Item name='middleName' required>
									<input type='text' placeholder='Otangizni ismi' required/>
								</Form.Item>
								<Form.Item name='telephone' required>
									<input type='text' placeholder='Telefon raqamingiz' required/>
								</Form.Item>
								<Form.Item name='email' required>
									<input type='email' placeholder='Email' required/>
								</Form.Item>
								<Form.Item name='username' required>
									<input type='text' placeholder='Login' required/>
								</Form.Item>
								<Form.Item name='password' required>
									<input type='password' placeholder='Parol' required />
								</Form.Item>
								<Form.Item>
									<button id='rightSide' type='submit'>
										Saqlash
									</button>
								</Form.Item>
							</Form>
						</div>
						
					</div>
					<div class='actions'>
						<span>Allaqchon ro&apos;yxatdan o&apos;tganmisiz?</span><br />
						<Link style={{color:'red'}} href='/login'>Tizimga kirish</Link>
					</div>
				</div>
			</div>
		</>
	);
};

export default Register;
