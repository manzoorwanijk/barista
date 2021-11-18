import { ActiveEventsTest, Goto } from '@e2eUtils/admin';
import { eventData } from '../../../../shared/data';
import { ElementHandle } from 'packages/e2e-tests/types';

const activeEventsTest = new ActiveEventsTest();

beforeAll(async () => {
	await Goto.eventsListPage();
});

describe('This Month link test', () => {
	let eventFirstItem: ElementHandle;
	let startDate: string;

	it('Create new event for active now ', async () => {
		// Create new event for active now
		eventFirstItem = await activeEventsTest.createEventForActiveNow(eventData.todayOnly);
		// Assert return value if we already created event
		expect(eventFirstItem).toBeTruthy();
	});

	it('Trigger the edit of event and create a date format for update start date event', async () => {
		// Create new event for active now
		startDate = await activeEventsTest.createStartingDateFormat();
		// Assert return value if we already created formatted date
		expect(startDate).toBeTruthy();
	});

	it('Update the starting date of the new created event to this month date to make the event active now', async () => {
		// go to event link and return total count events
		const countBeforeUpdate = await activeEventsTest.viewLinkAndCountEvents('This Month');
		// Create new event for active now
		const countAfterUpdate = await activeEventsTest.updateStartingDateEvent(
			eventFirstItem,
			startDate,
			'This Month'
		);
		// Assert return value event update and it is already active this month
		expect(countBeforeUpdate).toBeLessThan(countAfterUpdate);
	});
});
