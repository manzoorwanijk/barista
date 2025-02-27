export class DateFormatter {
	// "November 24, 2021 8:00 am" becomes "November 2021"
	static monthYearDateFromat = async (date: string) => {
		const intlOptions: Intl.DateTimeFormatOptions = { month: 'long', year: 'numeric' };
		const startDate = Intl.DateTimeFormat('en-US', intlOptions).format(new Date(date.trim()));

		return startDate;
	};
}
