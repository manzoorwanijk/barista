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
	let countBeforeUpdate: number;
	let countAfterCreateNewEvent: number;

	it('Count event list for this month link before creating new', async () => {
		// go to event link and return total count events
		countBeforeUpdate = await activeEventsTest.goToViewAndCount('This Month');
		// assert count this month link, before creating active event this month
		expect(countBeforeUpdate).toBe(0);
	});

	it('Create new event for active now ', async () => {
		// create new event and return newly event counts and number of events added
		const { createNewEvent, countAddedEvent } = await activeEventsTest.createActiveEvent(eventData.todayOnly);
		countAfterCreateNewEvent = createNewEvent;
		// assert before and after creating new event
		expect(createNewEvent).toBe(countAddedEvent);
	});

	it('Trigger the edit of event and create a date format for update start date event', async () => {
		// Create new event for active now
		startDate = eventData.todayOnly.startDate;
		// Assert return value if we already created formatted date
		expect(startDate).toBeTruthy();
	});

	it('Update the starting date of the new created event to this month date to make the event active now', async () => {
		// Create new event for active now
		const countAfterUpdate = await activeEventsTest.updateStartingDateEvent(startDate, 'This Month');
		//count event added
		const countAddedEvent = countAfterUpdate - countAfterCreateNewEvent;
		// assert count this month link, after creating active event this month
		expect(countAfterUpdate).toBe(countAfterCreateNewEvent + countAddedEvent);
	});
});
