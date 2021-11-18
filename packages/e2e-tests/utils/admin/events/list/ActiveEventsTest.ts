import { Goto, DateFormatter } from '@e2eUtils/admin';
import { createNewEvent } from '@e2eUtils/admin/events';
import { ElementHandle } from 'packages/e2e-tests/types';
import { EventsListSurfer } from './EventsListSurfer';

export class ActiveEventsTest extends EventsListSurfer {
	/**
	 *
	 * Create new event for active now link
	 */
	createEventForActiveNow = async (event: { title: string; description: string }): Promise<ElementHandle> => {
		// create new event for today and month link test
		await createNewEvent(event);
		await Goto.eventsListPage();
		// go to view all events link first to count the available event for date start update
		await this.goToView('View All Events');
		// get the first event in view all event link
		return await this.getFirstListItem();
	};

	/**
	 *
	 * Trigger the edit of event and create a date format for event start update
	 */

	createStartingDateFormat = async (): Promise<string> => {
		// initialize date for start date update
		const dateToday = new Date();
		// format the date into something like "November 12, 2021 8:56 PM"
		return await DateFormatter.eventStartDateFormat(dateToday);
	};

	/**
	 *
	 * Update the starting date of the new created event to todays date to make the event active now
	 */
	updateStartingDateEvent = async (element: ElementHandle, startDate: string, link: string) => {
		// go to view all events link first to count the available event for date start update
		await this.goToView('View All Events');
		// get the first event in view all event link
		const eventFirstItem = await this.getFirstListItem();
		// then go to edit link for the first selected event
		const eventEditLink = await this.getItemActionLinkByText(eventFirstItem, 'Edit');
		await page.goto(eventEditLink);
		// click the edit start and end dates button at the event dates to update the start date into todays date
		await page.click('button#popover-trigger-7');
		// focus first the start date field
		await page.focus('.date-range-picker__start-input input');
		// then fill in the start date field into todays date
		await page.fill('.date-range-picker__start-input input', startDate);
		//  click save to update the start date
		await page.click('button:has-text("save")');
		// go back to event list
		await Goto.eventsListPage();
		// count the event list inside the specific link after update the start date
		return await this.viewLinkAndCountEvents(link);
	};
}
