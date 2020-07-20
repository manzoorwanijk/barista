import React, { useState, useCallback } from 'react';
import { __ } from '@wordpress/i18n';

import { Box } from '@eventespresso/adapters';
import { Button, SelectInput } from '@eventespresso/components';
import { entityListToSelectOptions, AnyObject } from '@eventespresso/services';
import { useDatetimes, useDatetimeItem } from '@eventespresso/edtr-services';

interface DateTemplateProps {
	setTemplate: (date: AnyObject) => void;
}

const DateTemplate: React.FC<DateTemplateProps> = ({ setTemplate }) => {
	const [selectedDateId, setSelectedDateId] = useState('');
	const onChangeValue = useCallback((value) => setSelectedDateId(value), []);

	const options = entityListToSelectOptions(useDatetimes(), { label: __('Select...'), value: '' });

	const datetime = useDatetimeItem({ id: selectedDateId }) || {};

	const onClickSet = useCallback(() => setTemplate(datetime), [datetime, setTemplate]);

	return (
		<Box display='flex' flexDirection='column' alignItems='center'>
			<Button buttonText={__('Write the datails manually.')} onClick={onClickSet} />
			<span>{__('Or')}</span>
			<p>{__('select an existing datetime to use as a template.')}</p>
			<Box display='flex'>
				<SelectInput options={options} onChangeValue={onChangeValue} margin='var(--ee-margin-smaller)' />
				<Button buttonText={__('Select')} onClick={onClickSet} isDisabled={!selectedDateId} />
			</Box>
		</Box>
	);
};

export default DateTemplate;
