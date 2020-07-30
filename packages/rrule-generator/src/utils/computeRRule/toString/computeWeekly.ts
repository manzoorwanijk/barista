import RRule, { Options, WeekdayStr } from 'rrule';

import { RRuleState } from '../../../state';
import { weekdayStringToNumber } from './utils';

const computeWeekly = ({ interval, days }: RRuleState['repeat']['weekly']): Partial<Options> => {
	const byweekday = Object.entries(days).reduce((activeDays, [day, isDayActive]) => {
		// `day` will be 'MO', 'TU' ...
		if (isDayActive) {
			// calculate numeric weekday from string
			const weekday = weekdayStringToNumber(day as WeekdayStr);
			return [...activeDays, weekday];
		}
		return activeDays;
	}, []);
	return {
		freq: RRule.WEEKLY,
		interval,
		byweekday,
	};
};

export default computeWeekly;
