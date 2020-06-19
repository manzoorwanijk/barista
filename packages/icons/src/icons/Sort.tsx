import * as React from 'react';

function SvgSort(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg
			aria-hidden='true'
			className='sort_svg__ee-svg'
			fill='currentColor'
			height='1.25rem'
			viewBox='0 0 20 20'
			width='1.25rem'
			{...props}
		>
			<path d='M11 7H1l5 7zm-2 7h10l-5-7z' />
		</svg>
	);
}

export default SvgSort;
