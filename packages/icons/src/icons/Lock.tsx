import withClassName from '../withClassName';
import { IconProps } from '../types';

const Lock = (props: IconProps): JSX.Element => {
	return (
		<svg
			viewBox='0 0 20 20'
			aria-hidden='true'
			fill='currentColor'
			height='1.5em'
			width='1.5em'
			className='ee-svg--lock'
			{...props}
		>
			<path d='M15 9h-1V6c0-2.2-1.8-4-4-4S6 3.8 6 6v3H5c-.5 0-1 .5-1 1v7c0 .5.5 1 1 1h10c.5 0 1-.5 1-1v-7c0-.5-.5-1-1-1zm-4 7H9l.4-2.2c-.5-.2-.9-.8-.9-1.3 0-.8.7-1.5 1.5-1.5s1.5.7 1.5 1.5c0 .6-.3 1.1-.9 1.3L11 16zm1-7H8V6c0-1.1.9-2 2-2s2 .9 2 2v3z' />
		</svg>
	);
};

export default withClassName(Lock, 'lock');
