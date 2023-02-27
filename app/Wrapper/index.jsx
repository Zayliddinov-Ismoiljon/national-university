'use client';

import AppBar from '../AppBar/index';

function Wrapper({ children }) {
	return (
		<div className='h-screen justify-start wrapper-body'>
			<div className='w-25 bg-primary pt-2 px-4 font-medium text-start h-100vh'>
				<AppBar />
			</div>
			<div className='bg-light flex-1 p-4 text-white border-1 border-dashed w-70'>
				{children}
			</div>
		</div>
	);
}

export default Wrapper;
