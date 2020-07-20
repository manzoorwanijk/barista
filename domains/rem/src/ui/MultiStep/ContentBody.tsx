import React from 'react';

import { ExclusionPattern, RecurrencePattern } from '../recurrence';
import { DatetimeDetails } from '../datetimeDetails';
import { GeneratedDates } from '../generatedDates';
import Steps from './Steps';
import Tickets from '../Tickets';
import { useStepsState } from '../../context';

const ContentBody: React.FC = () => {
	const { current } = useStepsState();

	return (
		<div>
			<Steps current={current} />
			{current === 0 && <RecurrencePattern />}
			{current === 1 && <ExclusionPattern />}
			{current === 2 && <DatetimeDetails />}
			{current === 3 && <Tickets />}
			{current === 4 && <GeneratedDates />}
		</div>
	);
};

export default ContentBody;
