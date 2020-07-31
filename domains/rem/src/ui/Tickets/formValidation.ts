import { __ } from '@wordpress/i18n';
import * as yup from 'yup';
import { isValid } from 'date-fns';

import { yupToFinalFormErrors } from '@eventespresso/form';
import { DateAndTime, TicketFormShape } from './types';
import { IntervalType } from '@eventespresso/services';

export const validate = async (values: TicketFormShape): Promise<any> => {
	return await yupToFinalFormErrors(validationSchema, values);
};

const requiredMessage = () => __('Required');
const dateMessage = () => __('End Date & Time must be set later than the Start Date & Time');

/**
 * switches required schema based on the value of isShared
 */
const requiredWhenIsSharedEquals = <T extends any>(
	isSharedEquals: boolean,
	objectShape: yup.ObjectSchemaDefinition<yup.ObjectSchema['shape']>
): yup.WhenOptionsBuilderFunction<T> => {
	return ((isShared: boolean, schema: yup.ObjectSchema) => {
		// if isShared equals the expected value
		if (isShared === isSharedEquals) {
			// make the field required and set its shape
			return schema.required(requiredMessage).shape(objectShape);
		}
		// otherwise return the actual schema
		return schema;
	}) as yup.WhenOptionsBuilderFunction<T>;
};

const dateTimeShape = {
	// make date and time required
	date: yup.date().required(requiredMessage).typeError(requiredMessage),
	time: yup
		.date()
		.required(requiredMessage)
		.typeError(requiredMessage)
		.when(
			// we need to transform time to make sure that
			// year, month and date are same as that of date
			'date',
			(date: Date, schema: yup.DateSchema) => {
				// if the date is valid
				if (isValid(date)) {
					// transform the time to set year month and date from adjacent date input
					return schema.transform((value) => {
						if (isValid(value)) {
							const time = new Date(value);
							time.setFullYear(date.getFullYear());
							time.setMonth(date.getMonth());
							time.setDate(date.getDate());
							return time;
						}
						return value;
					});
				}
				// otherwise return the original schema
				return schema;
			}
		),
};

const dateTimeSchema = yup.object<DateAndTime>().when(
	'isShared',
	// make it required when `isShared` is true
	requiredWhenIsSharedEquals(true, dateTimeShape)
);

const ticketSalesSchema = yup.object().when(
	'isShared',
	// make it required when `isShared` is fase
	requiredWhenIsSharedEquals(false, {
		unitValue: yup.number().required(requiredMessage),
		unit: yup
			.string()
			.oneOf<IntervalType>(['months', 'weeks', 'days', 'hours', 'minutes'])
			.required(requiredMessage),
		position: yup.string().oneOf(['before', 'after']).required(requiredMessage),
		startOrEnd: yup.string().oneOf(['start', 'end']).required(requiredMessage),
	})
);

const validationSchema = yup.object<TicketFormShape>({
	name: yup
		.string()
		.required(() => __('Name is required'))
		.min(3, () => __('Name must be at least three characters')),
	ticketSalesStart: ticketSalesSchema,
	ticketSalesEnd: ticketSalesSchema,
	dateTimeStart: dateTimeSchema,
	dateTimeEnd: dateTimeSchema.when(
		['dateTimeStart'], // validate end dates based on start dates
		(dateTimeStart: DateAndTime, schema: yup.ObjectSchema<DateAndTime>): yup.ObjectSchema<DateAndTime> => {
			// if we have a start date
			if (dateTimeStart?.date) {
				// set the minimum value for end dates to be those of start dates.
				// it's assumed that transformation of times has already been done
				// to make sure that year, month and date is compared correctly for time inputs
				return schema.shape<DateAndTime>({
					date: dateTimeShape.date.min(dateTimeStart?.date, dateMessage),
					time: dateTimeShape.time.min(dateTimeStart?.time, dateMessage),
				});
			}
			return schema;
		}
	),
});
