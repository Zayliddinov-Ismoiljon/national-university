'use client';

import React, { useState,useEffect  } from 'react';
import Header from '../../app/Header/index';
import { Image } from 'next/image';
import { BASE_URL } from '../api';

function Session() {
	const [speakers, setSpeakers] = useState([]);

	useEffect(() => {
		const options = {
			method: 'GET',
			headers: {},
		};

		fetch(
			`${BASE_URL}/api/v1/speaker/getAll`,
			options,
		)
			.then((reponse) => reponse.json())
			.then((data) => {
				setSpeakers(data.body);
			});
	}, []);

	return (
		<>
			<Header />
			<div className='sessions'>
				<div className='container'>
					<h1 className='sessions__title'>Speakers</h1>
					{speakers.map((item, i) => (
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

export default Session;
