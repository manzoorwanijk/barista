import { saveVideo, PageVideoCapture } from 'playwright-video';
import { Goto, EventsListSurfer, createNewEvent } from '@e2eUtils/admin';
import { eventData } from '../../../../shared/data';

const eventsListSurfer = new EventsListSurfer();

const namespace = 'events-trash-clickable-actions-links';
let capture: PageVideoCapture;

beforeAll(async () => {
	capture = await saveVideo(page, `artifacts/${namespace}.mp4`);
	// delete all events from view all events link
	await eventsListSurfer.deleteAllEventsByLink('View All Events');
	// delete permanently all events at trash link
	await eventsListSurfer.deleteAllPermanentlyFromTrash();
	// Loop and create event base on the eventData
	for (const args of Object.values(eventData)) {
		await createNewEvent(args);
	}
	await Goto.eventsListPage();
});

afterAll(async () => {
	await capture?.stop();
});

describe('Trash link test', () => {
	it('Count event at trash', async () => {
		// count trash link
		const countBeforeRestore = await eventsListSurfer.getViewCount('Trash');
		// go to view all link
		await eventsListSurfer.goToView('View All Events');
		// assert to confirm that trash is empty
		expect(countBeforeRestore).toBe(0);
	});

	it('Trash event that contain name "Test One" and "Test Two"', async () => {
		// select all event that contain name Test One
		await eventsListSurfer.selectEventToTrash('Test One');
		// get the number and elements of rows availble
		const countAfterTrash = await eventsListSurfer.goToViewAndCount('Trash');
		// assert to confirm that trash is not empty
		expect(countAfterTrash).toBe(2);
	});

	it('Restore first event row in trash link', async () => {
		// get the first event in trash
		const firstItem = await eventsListSurfer.getFirstListItem();
		// got to "restore from trash" action link for the selected first event
		const restoreLink = await eventsListSurfer.getItemActionLinkByText(firstItem, 'Restore from Trash');
		await page.goto(restoreLink);
		// check again the trash count if it is already less than before
		const countAfterRestore = await eventsListSurfer.getViewCount('View All Events');
		// assert the before and after trash count
		expect(countAfterRestore).toBe(8);
	});

	it('Count the remaing event inside trash', async () => {
		// get the number and elements of rows available
		const countBeforeDeletePermanently = await eventsListSurfer.goToViewAndCount('Trash');
		// assert the remaining event in trash
		expect(countBeforeDeletePermanently).toBe(1);
	});

	it('Delete permanently the first event row in trash link', async () => {
		// get the first event in trash
		const firstItemForDeletePermanently = await eventsListSurfer.getFirstListItem();
		// get IDs by its event
		const filteredRows = await eventsListSurfer.getEventID([firstItemForDeletePermanently]);
		// got to "Delete Permanently" action link for the selected first event
		const deletePermanentlyLink = await eventsListSurfer.getItemActionLinkByText(
			firstItemForDeletePermanently,
			'Delete Permanently'
		);
		await page.goto(deletePermanentlyLink);

		// select all the event checkbox to delete permanently
		await eventsListSurfer.checkEventToDeletePermanently(filteredRows);
		// confirmation for delete permanently
		await eventsListSurfer.confirmAllDeletePermanently();
		// check again the trash count if it is already less than before
		const countAfterDeletePermanently = await eventsListSurfer.getViewCount('Trash');
		// assert the before and after trash count
		expect(countAfterDeletePermanently).toBe(0);
	});
});
