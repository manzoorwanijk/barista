import { saveVideo, PageVideoCapture } from 'playwright-video';

import { createNewEvent, EDTRGlider } from '@e2eUtils/admin/events';
import { EventsListSurfer, Goto } from '@e2eUtils/admin';
import { eventList } from '../../../../shared/data';

const eventsListSurfer = new EventsListSurfer();
const edtrGlider = new EDTRGlider();

let capture: PageVideoCapture;

const namespace = 'events-overview-clickable-actions-links';

beforeAll(async () => {
	capture = await saveVideo(page, `artifacts/${namespace}.mp4`);
	// Loop and create event base on the eventList
	for (const args of [...eventList, ...eventList]) {
		await createNewEvent(args);
	}
	await Goto.eventsListPage();
});

afterAll(async () => {
	await capture?.stop();
});

describe(namespace, () => {
	it('View all events link test', async () => {
		// first click view all events
		await eventsListSurfer.goToView('View All Events');

		// get the number and elements of rows availble
		const count = await eventsListSurfer.getItemCount();

		if (count) {
			// get only rows that is only contain "Test One" event name
			const filteredRows = await eventsListSurfer.getRowsByName('Test One');

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

			// Check the total count in view all events after trashing
			const countForViewAllAfter = await eventsListSurfer.getViewCount('View All Events');
			// Check the total count in trash after trashing
			const countForTrashAfter = await eventsListSurfer.getViewCount('Trash');

			// check if the previous count for view all event is greater than after trashing selected event/s
			expect(countForViewAllBefore).toBeGreaterThan(countForViewAllAfter);
			// check if the previous count for trash event is less than after trashing selected event/s
			expect(countForTrashBefore).toBeLessThan(countForTrashAfter);
		}
	});

	it('Trash link test', async () => {
		// first go to "Trash" link
		await eventsListSurfer.goToView('Trash');

		// get the number and elements of rows availble
		const countBeforeRestore = await eventsListSurfer.getViewCount('Trash');

		// check if there is event in trash
		if (countBeforeRestore) {
			// get the first event in trash
			const firstItem = await eventsListSurfer.getFirstListItem();
			// got to "restore from trash" action link for the selected first event
			const restoreLink = await eventsListSurfer.getItemActionLinkByText(firstItem, 'Restore from Trash');
			await page.goto(restoreLink);

			// check again the trash count if it is already less than before
			const countAfterRestore = await eventsListSurfer.getViewCount('Trash');
			// assert the before and after trash count
			expect(countBeforeRestore).toBeGreaterThan(countAfterRestore);
		}

		// go to "Trash" link again
		await eventsListSurfer.goToView('Trash');
		// get the number and elements of rows availble
		const countBeforeDeletePermanently = await eventsListSurfer.getViewCount('Trash');

		// check if there is event in trash
		if (countBeforeDeletePermanently) {
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
		}
		const eventFirstItem = await eventsListSurfer.getFirstListItem();
		const eventEditLink = await eventsListSurfer.getItemActionLinkByText(eventFirstItem, 'Edit');
		await page.goto(eventEditLink);
		// await Promise.all([page.waitForNavigation(), page.click('button#popover-trigger-7')]);
		// await clickLabel('Edit Event Date');
		await page.click('button#popover-trigger-7');
		// const dateToday = new Date();
		// const dateToday = formatDateTime(dateToday);
		// const startDate = await fillDateTicketForm({ startDate: dateToday });
		// console.log({ dateToday });

		// await page.fill('.date-range-picker__start-input input', 'December 11, 2021 8:00 AM');
		// const intlOptions: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric', year: 'numeric' };
		// const startDate = Intl.DateTimeFormat('en-US', intlOptions).format(new Date());
		// console.log({ startDate });

		// 1. trigger button for edit start and end dates inside event dates container
		// 2. Update and set start date into todays date in edit event date form
		// 3. Count Todays link list and assert before and after count
		// 3. Count This month link list and assert before and after count
		expect(0).toBe(0);
	});

	it('Draft link test', async () => {
		// first go to "Draft" link
		await eventsListSurfer.goToView('Draft');
		// Check first the total count in draft
		const countBeforeDraft = await eventsListSurfer.getViewCount('Draft');
		//create a draft event
		await createNewEvent({
			title: 'Draft test event',
			description: 'Draft test description',
			shouldPublish: false,
		});
		// go back to event list page
		await Goto.eventsListPage();
		// go to draft link
		await eventsListSurfer.goToView('Draft');
		// get total count in draft
		const countAfterDraft = await eventsListSurfer.getViewCount('Draft');
		// assert draft if countAfterDraft is greater than countBeforeDraft
		expect(countAfterDraft).toBeGreaterThan(countBeforeDraft);

		// get the raft first item to edit
		const draftFirstItem = await eventsListSurfer.getFirstListItem();
		// got Edit link for the selected draft first item
		const draftEditLink = await eventsListSurfer.getItemActionLinkByText(draftFirstItem, 'Edit');
		await page.goto(draftEditLink);
		// save or publish the selected item
		await edtrGlider.saveEvent();
		// go back to event list page
		await Goto.eventsListPage();
		// go to Draft link
		await eventsListSurfer.goToView('Draft');
		// count again the draft list
		const countAfterDraftEdit = await eventsListSurfer.getViewCount('Draft');
		// then assert the before and after edit or publish the draft item
		expect(countAfterDraft).toBeGreaterThan(countAfterDraftEdit);
	});

	it('Today and This month link test', async () => {
		// go to this month link first to count the event list
		await eventsListSurfer.goToView('This Month');
		// count the event list inside the this month link
		const countMonthBeforeUpdate = await eventsListSurfer.getItemCount();
		// go to today link first to count the event list
		await eventsListSurfer.goToView('Today');
		// count the event list inside the today link
		const countTodayBeforeUpdate = await eventsListSurfer.getItemCount();
		// go to view all events link first to count the available event for date start update
		await eventsListSurfer.goToView('View All Events');
		// create new event for today and month link test
		await createNewEvent(eventList[0]);
		await Goto.eventsListPage();

		// get the first event in view all event link
		const eventFirstItem = await eventsListSurfer.getFirstListItem();
		// then go to edit link for the first selected event
		const eventEditLink = await eventsListSurfer.getItemActionLinkByText(eventFirstItem, 'Edit');
		await page.goto(eventEditLink);
		// click the edit start and end dates button at the event dates to update the start date into todays date
		await page.click('button#popover-trigger-7');
		// initialize date for start date update
		const dateToday = new Date();
		// format the date into something like "November 12, 2021 8:56 PM"
		const intlOptions: Intl.DateTimeFormatOptions = {
			month: 'long',
			day: 'numeric',
			year: 'numeric',
			hour: 'numeric',
			minute: '2-digit',
			hour12: true,
		};
		const startDate = Intl.DateTimeFormat('en-US', intlOptions).format(dateToday);

		// focus first the start date field
		await page.focus('.date-range-picker__start-input input');
		// then fill in the start date field into todays date
		await page.fill('.date-range-picker__start-input input', startDate);
		//  click save to update the start date
		await page.click('button:has-text("save")');
		// go back to event list
		await Goto.eventsListPage();
		// go to this month link for count ckecking
		await eventsListSurfer.goToView('This Month');
		// count the event list inside the this month link after update the start date into todays date
		const countMonthAfterUpdate = await eventsListSurfer.getItemCount();
		// go to this today link for count ckecking
		await eventsListSurfer.goToView('Today');
		// count the event list inside the today link after update the start date into todays date
		const countTodayAfterUpdate = await eventsListSurfer.getItemCount();
		// assert the before and after count event at the today link after the start date updated
		expect(countTodayBeforeUpdate).toBeLessThan(countTodayAfterUpdate);
		// assert the before and after count event at the this month link after the start date updated
		expect(countMonthBeforeUpdate).toBeLessThan(countMonthAfterUpdate);
	});
});
