import { ucFirst } from '@eventespresso/utils';
import { WPListTable, BulkActionsPosition } from '../../WPListTable';
import { ElementHandle } from '../../../../types';
import { Goto } from '@e2eUtils/admin';

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

	/**
	 * remove all events from test data that has status like "ACTIVE" or "EXPIRED" etc.
	 */
	filterOutEventsWithStatus = async (status: string) => {
		// go to view all event
		const countallEvents = await this.goToViewAndCount('View All Events');

		const filteredRows = await this.getRowsByStatus(ucFirst(status));
		console.log({ filter: filteredRows.length, capital: ucFirst(status), countallEvents });

		for (const item of filteredRows) {
			await this.selectItemCheckbox(item);
		}

		// await this.trashSelected();
	};

	getDefaultPerPage = async (): Promise<number> => {
		// click screen option to get the pagination set
		await page.click('#show-settings-link');
		// get the default per page
		const paginationEvents = await (await page.$('#espresso_events_default_per_page')).getAttribute('value');
		// get how many set of page in pagination

		return Number(paginationEvents);
	};

	getTotalPagePagination = async () => {
		// get how many set of page in pagination
		const totalPages = await (await page.$('span.total-pages')).innerText();

		return Number(totalPages);
	};

	detleteAllEventsByPaginate = async (totalPages: number) => {
		// loop the pagination per page
		for (let pages = 1; pages < totalPages; pages++) {
			// trash all selected events
			await this.trashAll();
		}
	};

	detleteAllEventsPermanently = async (totalPages: number) => {
		// loop the pagination per page
		for (let pages = 1; pages < totalPages; pages++) {
			// trash all selected events
			await this.selectAll();
			await this.selectBulkAction({ label: 'Delete Permanently' });
			await this.applyBulkAction();
		}
	};

	deleteAllEventsByLink = async (linkname: string) => {
		await Goto.eventsListPage();

		// go to view all event
		await this.goToViewAndCount(linkname);
		// const defaultPage = await this.getDefaultPerPage();
		const totalPage = await this.getTotalPagePagination();
		await this.detleteAllEventsByPaginate(totalPage);
		await this.trashAll();
	};

	confirmAllDeletePermanently = async () => {
		// select all the event checkbox that is selected to delete permanently
		await this.checkAllDeletePermanently();
		// check the confirmation checkbox for delete permanently
		await this.checkConfirmDeletePermanently();
		// click the confirm button to delete event/s permanently
		await Promise.all([page.waitForLoadState(), page.click('text="Confirm"')]);
		// go back to event page
		await Goto.eventsListPage();
	};

	deleteAllPermanentlyFromTrash = async () => {
		await Goto.eventsListPage();
		await this.goToView('Trash');
		// const defaultPage = await this.getDefaultPerPage();
		const totalPage = await this.getTotalPagePagination();

		// loop the pagination per page
		for (let pages = 0; pages < totalPage; pages++) {
			const tableRows = await this.getListItems();
			const filteredRows = await Promise.all(
				tableRows.map(async (row) => {
					return await (
						await row.$('th.check-column .ee-event-list-bulk-select-event')
					).getAttribute('value');
				})
			);
			await this.selectAll();
			await page.selectOption('select#bulk-action-selector-', { value: 'delete_events' });
			await this.applyBulkAction();

			for (const iterator of filteredRows) {
				await page.check(
					`#eventespressoadmin-pageseventsform-sectionsconfirmeventdeletionform-events-${iterator}-yes-lbl`
				);
			}

			// check the confirmation checkbox for delete permanently
			await this.checkConfirmDeletePermanently();
			// click the confirm button to delete event/s permanently
			await Promise.all([page.waitForLoadState(), page.click('text="Confirm"')]);
			await Goto.eventsListPage();
			await this.goToViewAndCount('Trash');
		}
	};
}
