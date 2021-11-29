import { saveVideo, PageVideoCapture } from 'playwright-video';
import { ActiveEventsTest, Goto } from '@e2eUtils/admin';
import { eventData } from '../../../../shared/data';

const activeEventsTest = new ActiveEventsTest();

const namespace = 'events-this-month-clickable-actions-links';
let capture: PageVideoCapture;

beforeAll(async () => {
	capture = await saveVideo(page, `artifacts/${namespace}.mp4`);
	// delete all events from view all events link
	await activeEventsTest.deleteAllEventsByLink('View All Events');
	// delete permanently all events at trash link
	await activeEventsTest.deleteAllPermanentlyFromTrash();
	await Goto.eventsListPage();
});

afterAll(async () => {
	await capture?.stop();
});

describe('This Month link test', () => {
	let startDate: string;

	it('Count event list for this month link before creating new', async () => {
		// go to event link and return total count events
		const countBeforeUpdate = await activeEventsTest.goToViewAndCount('This Month');
		// assert count this month link, before creating active event this month
		expect(countBeforeUpdate).toBe(0);
	});

	it('Create new event for active now ', async () => {
		// Create new event for active now
		const eventFirstItem = await activeEventsTest.createEventForActiveNow(eventData.todayOnly);
		// Assert return value if we already created event, return value should be one
		expect(eventFirstItem).toBe(1);
	});

	it('Trigger the edit of event and create a date format for update start date event', async () => {
		// Create new event for active now
		startDate = await activeEventsTest.createStartingDateFormat();
		// Assert return value if we already created formatted date
		expect(startDate).toBeTruthy();
	});

	it('Update the starting date of the new created event to this month date to make the event active now', async () => {
		// Create new event for active now
		const countAfterUpdate = await activeEventsTest.updateStartingDateEvent(startDate, 'This Month');
		// assert count this month link, after creating active event this month
		expect(countAfterUpdate).toBe(1);
	});
});
