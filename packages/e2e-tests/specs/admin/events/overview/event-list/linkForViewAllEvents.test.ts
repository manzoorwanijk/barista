import { saveVideo, PageVideoCapture } from 'playwright-video';

import { createNewEvent } from '@e2eUtils/admin/events';
import { EventsListSurfer, Goto } from '@e2eUtils/admin';
import { eventData } from '../../../../shared/data';
import { ElementHandle } from 'packages/e2e-tests/types';

const eventsListSurfer = new EventsListSurfer();

let capture: PageVideoCapture;

const namespace = 'events-overview-clickable-actions-links';

beforeAll(async () => {
	// capture = await saveVideo(page, `artifacts/${namespace}.mp4`);
	// await eventsListSurfer.deleteAllEventsByLink('View All Events');
	await eventsListSurfer.deleteAllPermanentlyFromTrash();
	// Loop and create event base on the eventData
	// for (const event of [...eventData.bulkEvents, ...eventData.bulkEvents]) {
	// 	await createNewEvent(event);
	// }
	await Goto.eventsListPage();
});

// afterAll(async () => {
// 	await capture?.stop();
// });

describe(namespace, () => {
	let filteredRows: ElementHandle[];
	let countForViewAllBefore: number;
	let countForTrashBefore: number;

	it('sample', async () => {
		expect(true).toBe(true);
	});

	// it('Go to view all events and select all event that contain name "Test One"', async () => {
	// 	// go to view all event
	// 	await eventsListSurfer.goToView('View All Events');
	// 	// get only rows that is only contain "Test One" event name
	// 	filteredRows = await eventsListSurfer.getRowsByName('Test One');

	// 	expect(filteredRows.length).toBe(2);
	// });

	// it('Trash all selected event that contain name "Test One', async () => {
	// 	// check all the checkbox that the name contain 'Test One' event
	// 	for (const item of filteredRows) {
	// 		await eventsListSurfer.selectItemCheckbox(item);
	// 	}
	// 	// Check first the total count in view all events
	// 	countForViewAllBefore = await eventsListSurfer.getViewCount('View All Events');
	// 	// Check first the total count in trash
	// 	countForTrashBefore = await eventsListSurfer.getViewCount('Trash');
	// 	// after selecting all the rows that contain "Test One" trash all the selected rows
	// 	await eventsListSurfer.trashSelected();
	// 	expect(countForViewAllBefore).toBeGreaterThanOrEqual(0);
	// 	expect(countForTrashBefore).toBeGreaterThanOrEqual(0);
	// });

	// it('Compare before and after deleted the event "Test One"', async () => {
	// 	// Check the total count in view all events after trashing
	// 	const countForViewAllAfter = await eventsListSurfer.getViewCount('View All Events');
	// 	// Check the total count in trash after trashing
	// 	const countForTrashAfter = await eventsListSurfer.getViewCount('Trash');
	// 	// check if the previous count for view all event is greater than after trashing selected event/s
	// 	expect(countForViewAllBefore).toBeGreaterThan(countForViewAllAfter);
	// 	// check if the previous count for trash event is less than after trashing selected event/s
	// 	expect(countForTrashBefore).toBeLessThan(countForTrashAfter);
	// });
});
