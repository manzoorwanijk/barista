import React from 'react';
import { __, sprintf } from '@wordpress/i18n';

import Start from '../Start';
import Repeat from '../Repeat';
import End from '../End';
import { RRuleGeneratorProps } from '../types';
import { useRRuleState, useStateListener } from '../../hooks';
import { withConfig, withState } from '../../context';

import '../../styles/index.css';
import './styles.scss';

const RRuleGenerator: React.FC<RRuleGeneratorProps> = (props) => {
	// set up state listener
	useStateListener(props);

	const { hideEnd, hideError, hideStart, id = 'rrule' } = props;
	const { error } = useRRuleState();

	return (
		<div className='rrule-generator'>
			{!hideError && error && (
				<div className='rrule-generator__alert-danger'>
					{sprintf(
						__('You provided an invalid RRule value to component. %s is not a correct RRule string.'),
						error.name
					)}
				</div>
			)}

			{!hideStart && <Start id={`${id}-start`} />}

			<Repeat id={`${id}-repeat`} />

			{!hideEnd && <End id={`${id}-end`} />}
		</div>
	);
};

export default withConfig(withState(RRuleGenerator));
