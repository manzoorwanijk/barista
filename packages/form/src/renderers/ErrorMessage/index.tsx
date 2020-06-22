import React from 'react';

import { FormErrorMessage } from '@eventespresso/adapters';

import './style.scss';

interface Props {
	message?: string;
}

const ErrorMessage: React.FC<Props> = ({ message }) => {
	return message ? <FormErrorMessage className='ee-form-error-message'>{message}</FormErrorMessage> : null;
};

export default React.memo(ErrorMessage);
