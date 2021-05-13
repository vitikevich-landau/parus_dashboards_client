import TimeSheetCollection from "./TimeSheetCollection";
import {URL_TIMESHEET_ARRIVAL} from "./config";

class ArrivalCollection extends TimeSheetCollection {
	constructor(url) {
		super(url);
	}
}

export const arrivalCollection = new ArrivalCollection(URL_TIMESHEET_ARRIVAL);