const ticketsListSelector = '#ee-entity-list-tickets .ee-entity-list__card-view';

/**
 * Helper class to deal with EDTR.
 */
export class EDTRGlider {
	/**
	 * Returns event edit URL, inside EDTR
	 */
	getEventEditUrl = async () => {
		const url = await page.$eval('.nav-tab-wrapper >> text=Edit Event', (el) => el.getAttribute('href'));
		return url;
	};

	/**
	 * Returns the permalink of the event, inside EDTR
	 */
	getEventPermalink = async () => {
		// It is assumed to have plain permalink structure for the site
		// For pretty permalinks, the selector will become "#edit-slug-box #sample-permalink a"
		return await page.$eval('#edit-slug-box #sample-permalink', (el) => el.getAttribute('href'));
	};

	/**
	 * Sets the maximum registrations value.
	 */
	setMaxRegistrations = async (value: number, updateEvent = true) => {
		await page.fill('#max-registrants', String(value));

		await this.saveEvent(updateEvent);
	};

	/**
	 * Updates the event by clicking the Publish/update button
	 */
	saveEvent = async (save = true) => {
		if (save) {
			await Promise.all([page.waitForNavigation(), page.click('#publish')]);
			await this.waitForEdtr2Load();
		}
	};

	/**
	 * Enable/Disable questions for registrants
	 */
	questionsForRegistrant = async (
		registrants: 'primary' | 'additional' = 'primary',
		{ personalInfo = false, address = false } = {},
		updateEvent = true
	) => {
		const selector = `#espresso_events_Registration_Form_Hooks_Extend_${registrants}_questions_metabox`;

		const metabox = await page.$(selector);

		if (personalInfo) {
			await metabox.$eval('text=Personal Information', (e) => e.closest('p').querySelector('input').click());
		}
		if (address) {
			await metabox.$eval('text=Address Information', (e) => e.closest('p').querySelector('input').click());
		}

		await this.saveEvent(updateEvent);
	};

	/**
	 * Wait for EDTR to load.
	 */
	waitForEdtr2Load = async () => {
		// Wait for tickets list lazy load
		await page.waitForSelector(ticketsListSelector);
	};
}
