import { WPListTable, BulkActionsPosition } from '../../WPListTable';
import { ElementHandle } from '../../../../types';

export class EventsListSurfer extends WPListTable {
	/**
	 * Resets the list filters
	 */
	resetFilters = async (position?: BulkActionsPosition): Promise<void> => {
		const nav = await this.getTableNavWrapper(position);

		const resetLink = await nav.$('text="Reset Filters"');

		// hit the reset filters button and wait for the page load
		await Promise.all([page.waitForNavigation(), resetLink.click()]);
	};

	/**
	 * Get the name of an event from <tr /> handle
	 */
	getEventName = async (item: ElementHandle): Promise<string> => {
		return await (await item.$('td.column-name a.row-title')).innerText();
	};

	/**
	 * Capitalize first letter of words or sentence
	 */
	capitalizeFirstLetter = (text: string): string => {
		return text.charAt(0).toUpperCase() + text.slice(1);
	};

	/**
	 * Get the status of an event from <tr /> handle
	 */
	getEventStatus = async (item: ElementHandle): Promise<string> => {
		return await (await item.$('td.column-name .ee-status-text-small')).innerText();
	};

	/**
	 *  Get the list of event rows filtered by name
	 */
	getRowsByName = async (name: string): Promise<ElementHandle[]> => {
		const tableRows = await this.getListItems();
		const filteredRows = (
			await Promise.all(
				tableRows.map(async (row) => {
					const title = await this.getEventName(row);
					return title === name ? row : null;
				})
			)
		).filter(Boolean);

		return filteredRows;
	};

	/**
	 *  Get the list of event rows filtered by status
	 */
	getRowsByStatus = async (status: string): Promise<ElementHandle[]> => {
		const tableRows = await this.getListItems();
		const filteredRows = (
			await Promise.all(
				tableRows.map(async (row) => {
					const title = await this.getEventStatus(row);
					return title === status ? row : null;
				})
			)
		).filter(Boolean);

		return filteredRows;
	};

	/**
	 *  Delete seleted rows in event list that contain example "Test One"
	 */
	selectEventToTrash = async (name: string): Promise<void> => {
		// get only rows that is contain i.e "Test One" event name
		const filteredRows = await this.getRowsByName(name);
		// check all the checkbox that the name contain i.e. 'Test One' event
		for (const item of filteredRows) {
			await this.selectItemCheckbox(item);
		}

		// trash all selected events
		await this.trashSelected();
	};

	getDefaultPerPage = async (): Promise<{
		totalPages: number;
		paginationEvents: number;
	}> => {
		// click screen option to get the pagination set
		await page.click('#show-settings-link');
		// get the default per page
		const paginationEvents = await (await page.$('#espresso_events_default_per_page')).getAttribute('value');
		// get how many set of page in pagination
		const totalPages = await (await page.$('span.total-pages')).innerText();

		return { totalPages: Number(totalPages), paginationEvents: Number(paginationEvents) };
	};

	/**
	 * remove all events from test data that has status like "ACTIVE" or "EXPIRED" etc.
	 */
	filterOutEventsWithStatus = async (status: string) => {
		// go to view all event
		const countallEvents = await this.viewLinkAndCountEvents('View All Events');

		const filteredRows = await this.getRowsByStatus(this.capitalizeFirstLetter(status));
		console.log({ filter: filteredRows.length, capital: this.capitalizeFirstLetter(status), countallEvents });

		for (const item of filteredRows) {
			await this.selectItemCheckbox(item);
		}

		// await this.trashSelected();
	};
}
