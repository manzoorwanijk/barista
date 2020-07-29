import { includes } from 'ramda';

import { DATETIME_FIELDS, DATETIME_INPUT_FIELDS } from './datetimeFields';

export const isDatetimeField = (_: unknown, field: string): boolean => includes(field, DATETIME_FIELDS);

export const isDatetimeInputField = (_: unknown, field: string): boolean => includes(field, DATETIME_INPUT_FIELDS);
