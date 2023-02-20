'use client';

import Sidebar from '../Sidebar/index'

function Layout({children}) {
	return (
		<div className='h-screen justify-start layout-body'>
			<Sidebar />
			<div className='flex-1 p-4 text-white border-1 border-dashed'>
        {children}
      </div>
		</div>
	);
}

export default Layout