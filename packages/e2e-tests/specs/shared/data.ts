import { NOW } from '@eventespresso/constants';
import { sub, add } from '@eventespresso/dates';

export const data = [
	{
		name: '1',
		// This date is in the past
		startDate: sub('days', NOW, 40),
		endDate: sub('days', NOW, 38),
	},
	{
		name: '2',
		// This date is in the past
		startDate: sub('days', NOW, 10),
		endDate: sub('days', NOW, 9),
	},
	{
		name: '3',
		// This date is in the current month
		startDate: NOW,
		endDate: add('days', NOW, 2),
	},
	{
		name: '4',
		isTrashed: true,
	},
	{
		name: '5',
	},
	{
		name: '6',
	},
];

export const eventData = {
	bulkEvents: [
		// data to use for nultiple insertion of events like paginations and others
		{ title: 'Test One', description: 'Some description for test one event' },
		{ title: 'Test Two', description: 'Some description for test two event' },
		{ title: 'Test Three', description: 'Some description for test three event' },
		{ title: 'Test Four', description: 'Some description for test four event' },
	],
	expired: {
		// data for expired event
		title: 'Test expired event',
		description: 'Some description for expired event',
	},
	active: {
		// data for event that is currently active (start date < now && end date > now)
		title: 'Test active event',
		description: 'Some description for active event',
	},
	todayOnly: {
		// data for event starting and ending today
		title: 'Test today event',
		description: 'Some description for today event',
	},
	upcomingNextMonthOne: { title: 'Test One', description: 'Some description for test one event' },
	upcomingNextMonthTwo: { title: 'Test Two', description: 'Some description for test two event' },
	upcomingNextMonthThree: { title: 'Test Three', description: 'Some description for test three event' },
	upcomingNextMonthFour: { title: 'Test Four', description: 'Some description for test four event' },
};
