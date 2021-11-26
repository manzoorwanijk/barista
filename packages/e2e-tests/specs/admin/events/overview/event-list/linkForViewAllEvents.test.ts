import { saveVideo, PageVideoCapture } from 'playwright-video';

import { createNewEvent } from '@e2eUtils/admin/events';
import { EventsListSurfer, Goto } from '@e2eUtils/admin';
import { eventData } from '../../../../shared/data';
import { ElementHandle } from 'packages/e2e-tests/types';

const eventsListSurfer = new EventsListSurfer();

let capture: PageVideoCapture;

const namespace = 'events-overview-clickable-actions-links';

beforeAll(async () => {
	capture = await saveVideo(page, `artifacts/${namespace}.mp4`);
	await eventsListSurfer.deleteAllEventsByLink('View All Events');
	await eventsListSurfer.deleteAllPermanentlyFromTrash();
	// Loop and create event base on the eventData
	for (const event of [...eventData.bulkEvents, ...eventData.bulkEvents]) {
		await createNewEvent(event);
	}
	await Goto.eventsListPage();
});

afterAll(async () => {
	await capture?.stop();
});

describe('View all events link test', () => {
	let filteredRows: ElementHandle[];

	it('Go to view all events and select all event that contain name "Test One"', async () => {
		// go to view all event
		await eventsListSurfer.goToView('View All Events');
		// get only rows that is only contain "Test One" event name
		filteredRows = await eventsListSurfer.getRowsByName('Test One');
		// assert filtered events, filtered rows should equal to two
		expect(filteredRows.length).toBe(2);
	});

	it('Trash all selected event that contain name "Test One', async () => {
		// check all the checkbox that the name contain 'Test One' event
		for (const item of filteredRows) {
			await eventsListSurfer.selectItemCheckbox(item);
		}
		// Check first the total count in view all events
		const countForViewAllBefore = await eventsListSurfer.getViewCount('View All Events');
		// Check first the total count in trash
		const countForTrashBefore = await eventsListSurfer.getViewCount('Trash');
		// after selecting all the rows that contain "Test One" trash all the selected rows
		await eventsListSurfer.trashSelected();
		// assert view all events before deletion happen, count before deletion should equal to 8
		expect(countForViewAllBefore).toBe(8);
		// assert trash before deletion happen, count before deletion should equal to 8
		expect(countForTrashBefore).toBe(0);
	});

	it('Compare before and after deleted the event "Test One"', async () => {
		// Check the total count in view all events after trashing
		const countForViewAllAfter = await eventsListSurfer.getViewCount('View All Events');
		// Check the total count in trash after trashing
		const countForTrashAfter = await eventsListSurfer.getViewCount('Trash');
		// assert event count from view all events it should equal to 6
		expect(countForViewAllAfter).toBe(6);
		// assert event count from trash it should equal to two
		expect(countForTrashAfter).toBe(2);
	});
});
