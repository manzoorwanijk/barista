import { __ } from '@eventespresso/i18n';
import { FormWithConfig } from '@eventespresso/ee-components';
import { Heading, Upsell, UpsellProps } from '@eventespresso/ui-components';
import { FormSpy } from '@eventespresso/form';

import useUpsellFormConfig from './useUpsellFormConfig';
import { Footer } from './Footer';

const subscription = { values: true };

export const UpsellForm: React.FC = () => {
	const formConfig = useUpsellFormConfig();

	return (
		<>
			<Heading>{__('Upsell configuration')}</Heading>
			<FormWithConfig {...formConfig} columns={1}>
				<FormSpy<UpsellProps> subscription={subscription}>
					{({ values }) => (
						<>
							<Upsell {...values} templateId='base' />
							<Footer />
						</>
					)}
				</FormSpy>
			</FormWithConfig>
		</>
	);
};
