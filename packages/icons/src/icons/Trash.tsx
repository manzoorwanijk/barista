import * as React from 'react';

function SvgTrash(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg
			aria-hidden='true'
			className='trash_svg__ee-svg'
			fill='currentColor'
			height='1.25rem'
			viewBox='0 0 20 20'
			width='1.25rem'
			{...props}
		>
			<path d='M12 4h3c.6 0 1 .4 1 1v1H3V5c0-.6.5-1 1-1h3c.2-1.1 1.3-2 2.5-2s2.3.9 2.5 2zM8 4h3c-.2-.6-.9-1-1.5-1S8.2 3.4 8 4zM4 7h11l-.9 10.1c0 .5-.5.9-1 .9H5.9c-.5 0-.9-.4-1-.9L4 7z' />
		</svg>
	);
}

export default SvgTrash;
