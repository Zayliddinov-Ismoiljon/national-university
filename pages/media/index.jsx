'use client';

import { useEffect, useState } from 'react';
import Header from '../../app/Header';
import { BASE_URL } from '../api';

function Media() {
	const [media, setMedia] = useState([]);

	useEffect(() => {
		const options = {
			method: 'GET',
			headers: {},
		};

		fetch(`${BASE_URL}/api/v1/media/getAll`, options)
			.then((response) => response.json())
			.then((data) => {
				setMedia(data.body);
			});
	}, []);

	return (
		<>
			<Header />

			<div className='container'>
				<div className='media'>
					<h1 className='media__title'>Galeriya</h1>
				</div>
				<iframe
					width='560'
					height='315'
					className='iframe'
					src='https://www.youtube.com/embed/iXC0hCKyGvQ'
					title='YouTube video player'
					frameborder='0'
					allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
					allowfullscreen></iframe>
				<ul className='media__list'>
					{media.map((item, i) => (
						<li className='media__item' key={i}>
							<img src={item.path} alt='image' className='media__pic' />
						</li>
					))}
				</ul>
			</div>
		</>
	);
}

export default Media;
