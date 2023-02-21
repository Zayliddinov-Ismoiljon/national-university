'use client';

import { useEffect, useState } from 'react';
import { Divider, Table } from 'antd';
import moment from 'moment';
import Wrapper from '../../app/Wrapper/index';
import { BASE_URL } from '../api';

function ArticleCheck() {
	const [articleCheck, setArticleCheck] = useState([]);
	const [reFetch, setReFetch] = useState(false);

	const columns = [
		{
			title: 'Maqola nomi ',
			dataIndex: 'name',
			fixed: 'left',
			width: 100,
		},
		{
			title: 'Maqola fayli',
			dataIndex: 'file',
			width: 150,
		},
		{
			title: "Sho'ba nomi",
			dataIndex: 'session',
			width: 150,
		},
		{
			title: 'Yaratuvchi',
			dataIndex: 'creator',
			width: 150,
		},
		{
			title: 'Topshirilgan vaqti',
			dataIndex: 'date',
			width: 150,
		},
		Table.SELECTION_COLUMN,
		{
			title: 'Holati',
			dataIndex: 'status',
			width: 150,
		},
	];

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
				`${BASE_URL}/api/v1/article/getAll`,
				options,
			)
				.then((response) => response.json())
				.then((data) => {
					setArticleCheck(data.body);
				});
		}, [reFetch]);

	const data = articleCheck?.map((item, i) => {
		let session = '';
		if (item.articleSession === null) {
			session = '-';
		} else {
			session = item.articleSession.name;
		}

		let status = '';
		if (item.status === 'UNDER_CONSIDERATION') {
			status = (<span style={{color:'red', fontWeight:'medium'}}>Tasdiqlanmagan</span>);
		} else {
			status = (<span style={{color:'green', fontWeight:'medium'}}>Tasdiqlangan</span>);
		}
		return {
			key: `${item.id}`,
			name: `${item.name}`,
			file: (
				<a style={{ color: 'blue' }} href={item.filePath}>
					Yuklab olish
				</a>
			),
			session: session,
			creator: `${item.authUser.username}`,
			date: `${moment(item.regDate).format('DD.MM.YYYY hh:mm:ss')}`,
			status: status,
		};
	});

	const acceptFunc = (id) => {
		const token = localStorage.getItem('token');
		const options = {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: `Bearer ${token}`,
			},
		};

		fetch(
			`${BASE_URL}/api/v1/article/check/${id}`,
			options,
		)
			.then((response) => response.json())
			.then((data) => {
				setReFetch((p) => !p);
			});
	};

	return (
		<Wrapper>
			<Divider>Maqolalar</Divider>
			<Table
				columns={columns}
				rowSelection={{
					onSelect(value) {
						console.log(value);
						acceptFunc(value.key);
					},
				}}
				dataSource={data}
				scroll={{ x: 425 }}
			/>
		</Wrapper>
	);
}

export default ArticleCheck;
