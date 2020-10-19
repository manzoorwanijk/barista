import React, { useCallback, useState } from 'react';
import styled from '@emotion/styled';
import { __ } from '@eventespresso/i18n';

import { Button } from '../Button';
import { Collapse } from '@eventespresso/adapters';

import type { DebugInfoProps } from './types';

const Pre = styled.pre`
	border-radius: 5px;
	box-sizing: border-box;
	padding: 1em 2em;
	color: #a9ce47;
	background-color: #26203d;
`;

const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

const DebugInfo: React.FC<DebugInfoProps> = ({ data, asJson = true, asCollapse = true }) => {
	const [show, setShow] = useState(false);

	// define it here to avoid conditional call of hook
	const handleToggle = useCallback(() => setShow((v) => !v), [setShow]);

	if (!isDev) {
		return null;
	}

	const dataToRender = asJson ? JSON.stringify(data, null, 2) : data;

	const output = <Pre>{dataToRender}</Pre>;

	if (!asCollapse) {
		return output;
	}

	const buttonText = show ? __('Hide Debug Info') : __('Show Debug Info');

	return (
		<>
			<Button className='ee-debug-info-btn' buttonText={buttonText} onClick={handleToggle} />
			<Collapse isOpen={show}>{output}</Collapse>
		</>
	);
};

export default DebugInfo;
