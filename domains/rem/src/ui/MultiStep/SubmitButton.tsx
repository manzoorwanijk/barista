import React from 'react';
import { __ } from '@wordpress/i18n';

import { Button, ButtonProps, ButtonType } from '@eventespresso/components';
import { useGenerateDates } from '../generatedDates';
import { useSubmitForm, useFormState } from '../../data';

const SubmitButton: React.FC<ButtonProps> = (props) => {
	// rDates and gDates, no exDates
	const generateDates = useGenerateDates();
	const { getData } = useFormState();
	const submitForm = useSubmitForm(getData(), generateDates);
	return (
		<Button
			buttonText={__('Submit')}
			buttonType={ButtonType.PRIMARY}
			isDisabled={!generateDates.length}
			onClick={submitForm}
			type='submit'
			{...props}
		/>
	);
};

export default SubmitButton;
