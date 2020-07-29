import { useCallback } from 'react';

import { useTimeZoneTime } from '@eventespresso/services';
import { processDateAndTime } from '@eventespresso/edtr-services';
import type { EntityId } from '@eventespresso/data';

import type { RemTicket, StartAndEndDate } from './types';
import useMutateTicket from './useMutateTicket';
import { computeTicketDate } from '../utils';

type Callback = (
	tickets: Array<RemTicket>,
	sharedTickets?: boolean,
	// these are the start and end dates of the related datetime
	startAndEndDate?: StartAndEndDate
) => Promise<Array<EntityId>>;

type MutateTicketsArgs = {
	incrementProgress?: VoidFunction;
};

const useMutateTickets = ({ incrementProgress }: MutateTicketsArgs): Callback => {
	const mutateTicket = useMutateTicket();
	const { siteTimeToUtc } = useTimeZoneTime();

	// Async to make sure that prices are handled before updating the ticket.
	return useCallback(
		async (tickets, sharedTickets, dates) => {
			return await Promise.all(
				tickets.map(async (ticket) => {
					let start: string | Date, end: string | Date;
					if (sharedTickets) {
						const dateAndTime = {
							startDate: ticket.dateTimeStart.date,
							startTime: ticket.dateTimeStart.time,
							endDate: ticket.dateTimeEnd.date,
							endTime: ticket.dateTimeEnd.time,
						};
						({ startDate: start, endDate: end } = processDateAndTime(dateAndTime, siteTimeToUtc));
					} else {
						start = siteTimeToUtc(computeTicketDate(dates, ticket.ticketSalesStart)).toISOString();
						end = siteTimeToUtc(computeTicketDate(dates, ticket.ticketSalesEnd)).toISOString();
					}
					const input = { ...ticket, startDate: start as string, endDate: end as string };
					const ticketId = await mutateTicket(input);
					incrementProgress?.();
					return ticketId;
				})
			);
		},
		[incrementProgress, mutateTicket, siteTimeToUtc]
	);
};

export default useMutateTickets;
