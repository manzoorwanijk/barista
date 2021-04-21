import { EntityListParser } from './EntityListParser';
import type { EntityType } from '../../../types';

interface Props {
	capacity?: string;
	entityType: EntityType;
	name?: string;
	quantity?: string;
}

export const editEntityCard = async ({ capacity, entityType, name, quantity }: Props) => {
	const parser = new EntityListParser(entityType);
	const entityList = parser.getRootSelector();

	if (name) {
		await page.click(`${entityList} .entity-card-details__name`);
		await page.type(`${entityList} .entity-card-details__name`, name);

		const waitForListUpdate = await parser.createWaitForListUpdate();
		await page.click(parser.getRootSelector()); // click outside of the inline input
		await waitForListUpdate();
	}

	if (capacity || quantity) {
		await page.click(`${entityList} .ee-entity-details__value .ee-tabbable-text`);
		await page.type(`${entityList} .ee-entity-details__value .ee-inline-edit__input`, capacity || quantity);

		const waitForListUpdate = await parser.createWaitForListUpdate();
		await page.click(parser.getRootSelector()); // click outside of the inline input
		await waitForListUpdate();
	}
};
