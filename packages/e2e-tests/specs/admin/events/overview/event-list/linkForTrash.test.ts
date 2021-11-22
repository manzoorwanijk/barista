import { saveVideo, PageVideoCapture } from 'playwright-video';
import { Goto, EventsListSurfer, createNewEvent } from '@e2eUtils/admin';
import { eventData } from '../../../../shared/data';

const eventsListSurfer = new EventsListSurfer();

const namespace = 'events-trash-clickable-actions-links';
let capture: PageVideoCapture;

beforeAll(async () => {
	// capture = await saveVideo(page, `artifacts/${namespace}.mp4`);
	// Loop and create event base on the eventData
	// for (const args of [...eventData.bulkEvents, ...eventData.bulkEvents]) {
	// 	await createNewEvent(args);
	// }
	await Goto.eventsListPage();
});

// afterAll(async () => {
// 	await capture?.stop();
// });

describe('Trash link test', () => {
	let countBeforeRestore: number = 0;
	let countBeforeDeletePermanently: number = 0;

	it('Trash event that contain name "Test One"', async () => {
		await eventsListSurfer.filterOutEventsWithStatus('Upcoming');
		// delete rows that contain "Test One" name of event
		await eventsListSurfer.selectEventToTrash('Test one');
		// get the number and elements of rows availble
		countBeforeRestore = await eventsListSurfer.viewLinkAndCountEvents('Trash');
		// assert to confirm that trash is not empty
		expect(countBeforeRestore).toBeGreaterThan(0);
	});

	it('Restore first event row in trash link', async () => {
		// get the first event in trash
		const firstItem = await eventsListSurfer.getFirstListItem();
		// got to "restore from trash" action link for the selected first event
		const restoreLink = await eventsListSurfer.getItemActionLinkByText(firstItem, 'Restore from Trash');
		await page.goto(restoreLink);
		// check again the trash count if it is already less than before
		const countAfterRestore = await eventsListSurfer.getViewCount('Trash');
		// assert the before and after trash count
		expect(countBeforeRestore).toBeGreaterThan(countAfterRestore);
	});

	it('Count the remaing event inside trash', async () => {
		// get the number and elements of rows available
		countBeforeDeletePermanently = await eventsListSurfer.viewLinkAndCountEvents('Trash');
		// assert the remaining event in trash
		expect(countBeforeDeletePermanently).toBeGreaterThan(0);
	});

	it('Delete permanently the first event row in trash link', async () => {
		// get the first event in trash
		const firstItemForDeletePermanently = await eventsListSurfer.getFirstListItem();
		// got to "Delete Permanently" action link for the selected first event
		const deletePermanentlyLink = await eventsListSurfer.getItemActionLinkByText(
			firstItemForDeletePermanently,
			'Delete Permanently'
		);
		await page.goto(deletePermanentlyLink);
		// select all the event checkbox that is selected to delete permanently
		await eventsListSurfer.checkAllDeletePermanently();
		// check the confirmation checkbox for delete permanently
		await eventsListSurfer.checkConfirmDeletePermanently();
		// click the confirm button to delete event/s permanently
		await Promise.all([page.waitForLoadState(), page.click('text="Confirm"')]);
		// go back to event page
		await Goto.eventsListPage();
		// check again the trash count if it is already less than before
		const countAfterDeletePermanently = await eventsListSurfer.getViewCount('Trash');
		// assert the before and after trash count
		expect(countBeforeDeletePermanently).toBeGreaterThan(countAfterDeletePermanently);
	});
});
