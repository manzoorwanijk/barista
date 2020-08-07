import React from 'react';
import { __ } from '@wordpress/i18n';
import { useDisclosure } from '@chakra-ui/hooks';

import { Button, ButtonSize, NewEntityOption } from '@eventespresso/components';
import { CalendarAlt } from '@eventespresso/icons';
import { Container as FormContainer } from '@edtrUI/datetimes/dateForm/multiStep';

type AddSingleDateProps = {
	isOnlyButton?: boolean;
};

const AddSingleDate: React.FC<AddSingleDateProps> = ({ isOnlyButton }) => {
	const { isOpen, onClose, onOpen: onAddNew } = useDisclosure();

	const output = (
		<>
			<Button
				buttonText={isOnlyButton ? __('Add New Date') : __('Add Single Date')}
				onClick={onAddNew}
				buttonSize={isOnlyButton ? ButtonSize.BIG : null}
				buttonType='primary'
				icon={isOnlyButton && CalendarAlt}
			/>
			{isOpen && <FormContainer isOpen={true} onClose={onClose} />}
		</>
	);

	if (isOnlyButton) {
		return output;
	}

	return (
		<NewEntityOption
			className={'ee-new-entity-option__single-datetime'}
			description={__('Add a single date\nthat only occurs once')}
			icon={CalendarAlt}
			title={__('Single Date')}
		>
			{output}
		</NewEntityOption>
	);
};

export default AddSingleDate;
