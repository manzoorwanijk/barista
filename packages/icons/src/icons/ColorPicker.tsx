import withClassName from '../withClassName';
import { IconProps } from '../types';

const ColorPicker = (props: IconProps): JSX.Element => {
	return (
		<svg
			viewBox='0 0 24 24'
			fill='currentColor'
			aria-hidden='true'
			height='1.5em'
			width='1.5em'
			className='ee-svg--color-picker'
			{...props}
		>
			<path d='M17.8 2.2c-1-1-2.6-1-3.6 0L12.4 4l-.7-.7c-.4-.4-1-.4-1.4 0l-.8.7c-.4.4-.4 1 0 1.4l5 5c.4.4 1 .4 1.4 0l.7-.7c.4-.4.4-1 0-1.4l-.6-.7 1.8-1.8c1-1 1-2.6 0-3.6zM4.4 12c-2.2 2.2-.9 3.2-2.9 5.8l.7.7c2.6-2 3.6-.7 5.8-2.9l5.1-5.1-3.6-3.6L4.4 12z' />
		</svg>
	);
};

export default withClassName(ColorPicker, 'color-picker');
