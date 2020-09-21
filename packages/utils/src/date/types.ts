import { IntervalType } from './addSub';

export type TzDateFn = (date: Date | string | number, timezone: string) => Date;

export type Intervals = { [key in IntervalType]?: string };

export type ShiftDateArgs = {
	unit: IntervalType;
	value: number;
	type: 'earlier' | 'later';
};
