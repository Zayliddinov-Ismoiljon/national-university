'use client';

import { Button } from 'antd';
import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';
import { FaUserAlt, FaUserTie } from 'react-icons/fa';
import {BiLogOutCircle} from 'react-icons/bi'
import {MdArticle, MdOutlineCases} from 'react-icons/md'
import {GiHamburgerMenu} from 'react-icons/gi'

const menuItems = [
	{
		id: 1,
		label: "Ma'lumotlarim",
		icon: FaUserTie,
		link: '/myInformation',
	},
	{
		id: 2,
		label: 'Maqolalarim',
		icon: MdArticle,
		link: '/article',
	},
	{
		id: 3,
		label: "Sho'balar",
		icon: MdOutlineCases,
		link: '/sessionTable',
	},
	{
		id: 4,
		label: (
			<Button
			style={{border:'none', backgroundColor:'transparent'}}
			className={classNames(
				'text-md font-medium text-text-light',
			)}
				onClick={() => {
					localStorage.removeItem('token');
				}}>
				Chiqish
			</Button>
		),
		icon: BiLogOutCircle,
		link: '/',
	},
];

export default function Sidebar() {
	const [toggleCollapse, setToggleCollapse] = useState(false);

	const [isCollapsible, setIsCollapsible] = useState(false);

	const [btnToggle, setBtnToggle] = useState(false)

	const wrapperClasses = classNames(
		'h-screen px-4 pt-8 pb-4 bg-primary flex justify-between flex-col w-80',
		{
			['w-90']: !toggleCollapse,
			['w-10']: toggleCollapse,
		},
	);

	const collapseIconClasses = classNames(
		'p-4 rounded bg-primary absolute right-0',
		{
			'rotate-180': toggleCollapse,
		},
	);

	const router = useRouter();

	const activeMenu = useMemo(
		() => menuItems.find((menu) => menu.link === router.pathname),
		[router.pathname],
	);

	const getNavItemClasses = (menu) => {
		return classNames(
			'flex items-center cursor-ponter hover:bg-light-lighter rounded w-full overflow-hidden whitespace-nowrap mb-1',
			{
				['bg-light-lighter']: menu.id,
			},
		);
	};

	const onMouseOver = () => {
		setIsCollapsible(!isCollapsible);
	};

	const handleSidebarToggle = () => {
		setToggleCollapse(!toggleCollapse);
	};

	return (
		<div
			// className={wrapperClasses}
			onMouseEnter={onMouseOver}
			onMouseLeave={onMouseOver}
			style={{ transition: 'width 300ms cubic-bezier(0.2,0,0,1) 0s' }}
			className='side-bar'
			>
			<div className='flex flex-col'>
				<div className='flex items-center justify-between relative'>
					<div className='flex items-center pl-1 gap-4'>
						<FaUserAlt size={30} color='white'/>
						<span
							className={classNames('mt-2 text-lg font-medium text-light', {
								hidden: toggleCollapse,
							})}>
							Foydalanuvchi
						</span>
					</div>
					<button onClick={()=>setBtnToggle(p => !p)}  className='bar-burgerbtn'>
						<GiHamburgerMenu size={30} color='white'/>
					</button>
				</div>
				<div style={{marginTop:'50px'}} className={`menu-item ${btnToggle ? 'active' : ''}`}>
					{menuItems.map(({ icon: Icon, ...menu }) => {
						const classes = getNavItemClasses(menu);
						return (
							<div className={classes}>
								<Link href={menu.link} style={{ width: '100%' }} className='side-link'>
									<div className='flex py-2 px-1 items-center w-full h-full'>
										<div>
											<Icon  size={20} style={{marginRight:'10px'}} className='side-icon'/>
										</div>
										{!toggleCollapse && (
											<span
												className={classNames(
													'text-md font-medium text-text-light',
												)}>
												{menu.label}
											</span>
										)}
									</div>
								</Link>
							</div>
						);
					})}
				</div>
			</div>
			<div></div>
		</div>
	);
}


