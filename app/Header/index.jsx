'use client';

import Link from 'next/link';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useState } from 'react';

function Header() {
	const [active, setActive] = useState(false);
	
	return (
		<header className='header'>
			<div className='container'>
				<nav className='nav'>
					<a href='/'>
						<img
							src='https://chem-bukhsu.uz/uz/images/logo.png'
							alt='logo'
							className='logo'
						/>
					</a>
					<ul className='nav__list'>
						<li className='nav__item'>
							<Link className='nav__link' href='/'>
								BOSH SAHIFA
							</Link>
						</li>
						<li className='nav__item'>
							<p className='nav__link data-link'>ILMIY MA'LUMOTLAR</p>
							<ul className='link-list'>
								<li className='link-item'>
									<Link
										className='link-link'
										href='https://chem-bukhsu.uz/media/Sertifikat.pdf'
										target='_blank'>
										Sertifikat
									</Link>
								</li>
								<li className='link-item'>
									<Link
										className='link-link'
										href='https://chem-bukhsu.uz/uploads/axb_xati_1-sirkular.pdf'
										target='_blank'>
										Birinchi sirkulyar axborot xati
									</Link>
								</li>
								<li className='link-item'>
									<Link
										className='link-link'
										href='https://chem-bukhsu.uz/uploads/axb_xati_2-sircullar.pdf'
										target='_blank'>
										Ikkinchi sirkulyar axborot xati
									</Link>
								</li>
								<li className='link-item'>
									<Link
										className='link-link'
										href='https://chem-bukhsu.uz/uploads/dastur.pdf'
										target='_blank'>
										Konferensiya dasturi
									</Link>
								</li>
								<li className='link-item'>
									<Link className='link-link' href='/session'>
										Yalpi majlis maruzachilari
									</Link>
								</li>
								<li className='link-item'>
									<Link className='link-link' href='/mainExposure'>
										Asosiy maruzachilar
									</Link>
								</li>
								<li className='link-item'>
									<Link className='link-link' href='/sugestedExposure'>
										Taklif etilgan maruzachilar
									</Link>
								</li>
								<li className='link-item'>
									<Link
										className='link-link'
										href='https://chem-bukhsu.uz/uploads/tuplam_2022.pdf'
										target='_blank'>
										Konferensiya materiallari
									</Link>
								</li>
							</ul>
						</li>
						<li className='nav__item'>
							<Link className='nav__link' href='/media'>
								MEDIA
							</Link>
						</li>
						<li className='nav__item'>
							<Link className='nav__link' href='#'>
								KONTAKT
							</Link>
						</li>
						<li className='nav__item'>
							<Link className='nav__link' href='/login'>
								KIRISH
							</Link>
						</li>
						<li className='nav__item'>
							<Link className='nav__link' href='/register'>
								RO'YXATDAN O'TISH
							</Link>
						</li>
					</ul>

					<div className={`MENU-BAR ${active ? 'active' : ''}`}>
						<Link href='/' className='bar-link'>
							Bosh sahifa
						</Link>
						<Link href='/media' className='bar-link'>
							Media
						</Link>
						<Link
							href='/https://chem-bukhsu.uz/media/Sertifikat.pdf'
							className='bar-link'
							target={'_blank'}>
							Birinchi sirkulyar axborot xati
						</Link>
						<Link
							href='https://chem-bukhsu.uz/uploads/axb_xati_2-sircullar.pdf'
							target={'_blank'}
							className='bar-link'>
							Ikkinchi sirkulyar axborot xati
						</Link>
						<Link
							href='https://chem-bukhsu.uz/uploads/dastur.pdf'
							target={'_blank'}
							className='bar-link'>
							Konrferensiya dasturi
						</Link>
						<Link href='/session' className='bar-link'>
							Yalpi majlis ishtirokchilari
						</Link>
						<Link href='/mainExposure' className='bar-link'>
							Asosiy maruzachilar
						</Link>
						<Link href='/sugestedExposure' className='bar-link'>
							Taklif etilgan ma'ruzachilar
						</Link>
						<Link
							href='https://chem-bukhsu.uz/uploads/tuplam_2022.pdf'
							className='bar-link'
							target={'_blank'}>
							Konferensiya dasturlari
						</Link>
					</div>
					<button
						className='burger-btn'
						onClick={() => {
							setActive((p) => !p);
						}}>
						<GiHamburgerMenu size={30} color='blue' />
					</button>
				</nav>
			</div>
		</header>
	);
}

export default Header;
