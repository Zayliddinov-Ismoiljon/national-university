'use client';

import Link from 'next/link';
import { MdArticle } from 'react-icons/md';
import { GrArticle } from 'react-icons/gr';
import { RiFileUserFill, RiArticleLine } from 'react-icons/ri';
import { BiLogOutCircle } from 'react-icons/bi';
import { HiUsers } from 'react-icons/hi';
import { Button } from 'antd';
import { MdAdminPanelSettings } from 'react-icons/md';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useState } from 'react';

function AppBar() {
	const exit = () => {
		localStorage.clear('token');
	};

	const menuData = [
		{
			id: 1,
			label: "Sho'ba yaratish",
			link: '/sessionCreate',
			icon: <GrArticle size={30} />,
		},
		{
			id: 2,
			label: 'Media yaratish',
			link: '/mediaCreate',
			icon: <MdArticle size={30} />,
		},
		{
			id: 3,
			label: "Ma'ruzachi yaratish",
			link: '/spekearsCreate',
			icon: <RiFileUserFill size={30} />,
		},
		{
			id: 4,
			label: 'Foydalanuvchilar',
			link: '/users',
			icon: <HiUsers size={30} />,
		},
		{
			id: 5,
			label: 'Maqolalar',
			link: '/articleCheck',
			icon: <RiArticleLine size={30} />,
		},
		{
			id: 6,
			label: (
				<Button
					style={{
						width: '100%',
						border: 'none',
						fontSize: '18px',
						color: 'rgb(89, 89, 89)',
						fontWeight: '500',
					}}
					onClick={exit}>
					Chiqish
				</Button>
			),
			link: '/',
			icon: <BiLogOutCircle size={30} />,
		},
	];
	const [burgerToggle, setBurgerToggle] = useState(false);
	return (
		<>
			<div className='appbar-inner'>
				<h3>Admin</h3>
				<MdAdminPanelSettings size={60} color='white' />
				<button
					className='wrapper-burger'
					onClick={() => setBurgerToggle((p) => !p)}>
					<GiHamburgerMenu size={30} color='white' />
				</button>
			</div>
			<ul className={`appbar-list ${burgerToggle ? 'active' : ''}`}>
				{menuData.map((item, i) => {
					return (
						<li key={i} className='appbar-item'>
							<div style={{ marginRight: '10px' }} className='appbar-icon'>
								{item.icon}
							</div>
							<Link
								style={{ color: 'rgb(89, 89, 89)', width: '100%' }}
								href={item.link}>
								{item.label}
							</Link>
						</li>
					);
				})}
			</ul>
		</>
	);
}

export default AppBar;
