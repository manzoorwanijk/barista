/**
 * Internal dependencies
 */
import { switchUserToAdmin } from './switch-user-to-admin';
import { switchUserToTest } from './switch-user-to-test';
import { visitAdminPage } from './visit-admin-page';

/**
 * Activates an installed plugin.
 *
 * @param {string} slug Plugin slug.
 */
export async function activatePlugin(slug, page) {
	// await switchUserToAdmin();
	await visitAdminPage('plugins.php', null, page);
	const disableLink = await page.$(`tr[data-slug="${slug}"] .deactivate a`);

	if (disableLink) {
		await switchUserToTest();
		return;
	}

	await page.click(`tr[data-slug="${slug}"] .activate a`);

	await page.isVisible(`tr[data-slug="${slug}"] .deactivate a`);

	// await switchUserToTest();
}
