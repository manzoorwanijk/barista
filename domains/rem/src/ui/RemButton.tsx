import React from 'react';
import { useDisclosure } from '@chakra-ui/hooks';
import { __ } from '@wordpress/i18n';

import { Button, NewEntityOption } from '@eventespresso/components';
import { Rem } from '@eventespresso/icons';

import Modal from './Modal';

const RemButton: React.FC = () => {
	const { isOpen, onOpen, ...disclosure } = useDisclosure();

	return (
		<>
			<NewEntityOption
				className={'ee-new-entity-option__recurring-datetime'}
				description={__('Add multiple dates in bulk\nthat follow a recurring pattern')}
				icon={Rem}
				title={__('Recurring Dates')}
			>
				<Button buttonType='primary' onClick={onOpen}>
					{__('Add Recurring Dates')}
				</Button>
				{isOpen && <Modal isOpen={true} {...disclosure} />}
			</NewEntityOption>
		</>
	);
};

export default RemButton;
