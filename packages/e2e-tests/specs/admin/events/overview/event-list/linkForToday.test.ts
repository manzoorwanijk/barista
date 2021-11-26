import { saveVideo, PageVideoCapture } from 'playwright-video';
import { Goto, ActiveEventsTest } from '@e2eUtils/admin';
import { eventData } from '../../../../shared/data';

const activeEventsTest = new ActiveEventsTest();

const namespace = 'events-today-clickable-actions-links';
let capture: PageVideoCapture;

beforeAll(async () => {
	// capture = await saveVideo(page, `artifacts/${namespace}.mp4`);
	// delete all events from view all events link
	await activeEventsTest.deleteAllEventsByLink('View All Events');
	// delete permanently all events at trash link
	await activeEventsTest.deleteAllPermanentlyFromTrash();
	await Goto.eventsListPage();
});

// afterAll(async () => {
// 	await capture?.stop();
// });

describe('Today link test', () => {
	let startDate: string;

	it('Count event list for this today link before creating new', async () => {
		// go to event link and return total count events
		const countBeforeUpdate = await activeEventsTest.viewLinkAndCountEvents('Today');
		// assert count this today link, before creating active event this today
		expect(countBeforeUpdate).toBe(0);
	});

	it('Create new event for active now ', async () => {
		// Create new event for active now
		const eventFirstItem = await activeEventsTest.createEventForActiveNow(eventData.todayOnly);
		// Assert return value if we already created event
		expect(eventFirstItem).toBe(1);
	});

	it('Trigger the edit of event and create a date format for update start date event', async () => {
		// Create new event for active now
		startDate = await activeEventsTest.createStartingDateFormat();
		// Assert return value if we already created formatted date
		expect(startDate).toBeTruthy();
	});

	it('Update the starting date of the new created event to today date to make the event active now', async () => {
		// Create new event for active now
		const countAfterUpdate = await activeEventsTest.updateStartingDateEvent(startDate, 'Today');
		// Assert return value event update and it is already active today
		expect(countAfterUpdate).toBe(1);
	});
});
