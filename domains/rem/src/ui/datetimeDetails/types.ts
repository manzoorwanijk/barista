import type { UpdateDatetimeInput } from '@eventespresso/edtr-services';
import type { IntervalType } from '@eventespresso/services';

export interface DatetimeDetailsProps {
	onClose?: VoidFunction;
}

export interface DateFormShape extends UpdateDatetimeInput {
	duration?: number;
	unit?: IntervalType;
}
