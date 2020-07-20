import React from 'react';
import { __ } from '@wordpress/i18n';

import { ModalWithAlert } from '@eventespresso/components';

import { ContentBody, ContentFooter } from '../MultiStep';
import { withContext } from '../../context';
import useCancelButtonProps from './useCancelButtonProps';

import './styles.scss';

interface ModalProps {
	isOpen: boolean;
	onClose: VoidFunction;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
	const cancelButtonProps = useCancelButtonProps(onClose);

	return (
		<ModalWithAlert
			bodyClassName='ee-rem-modal__body'
			cancelButtonProps={cancelButtonProps}
			className='ee-rem-modal'
			footerContent={<ContentFooter />}
			isOpen={isOpen}
			onClose={onClose}
			showAlertOnEscape={false}
			title={__('Recurring Events Manager')}
			withBorder
		>
			<ContentBody />
		</ModalWithAlert>
	);
};

export default withContext(Modal);
