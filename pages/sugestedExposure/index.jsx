'use client';

import { useEffect, useState } from 'react';
import { Image } from 'next/image';
import Header from '../../app/Header/index';
import { BASE_URL } from '../api';

function SugestedExposure() {
	const [sugestSpeakers, setSugestSpeakers] = useState([]);

	useEffect(() => {
		const options = {
			method: 'GET',
			headers: {},
		};

		fetch(
			`${BASE_URL}/api/v1/speaker/getAllInvited`,
			options,
		)
			.then((response) => response.json())
			.then((data) => {
				setSugestSpeakers(data.body);
			});
	}, []);

	return (
		<>
			<Header />
			<div className='sessions'>
				<div className='container'>
					<h1 className='sessions__title'>Speakers</h1>
					{sugestSpeakers.map((item, i) => (
						<div className='sessions__current' key={i}>
							<div className='sessions__info'>
								<Image
									src={item.imagePath}
									alt='images'
									className='sessions__img'
								/>
								<h4 className='sessions__name'>{item.fullName}</h4>
							</div>
							<p className='sessions__text'>{item.description}</p>
						</div>
					))}
				</div>
			</div>
		</>
	);
}

export default SugestedExposure;
