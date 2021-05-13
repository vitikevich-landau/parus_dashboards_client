import TimeSheetCollection from "./TimeSheetCollection";
import {URL_TIMESHEET_LEAVE} from "./config";

class LeaveCollection extends TimeSheetCollection {
	constructor(url) {
		super(url);
	}
}

export const leaveCollection = new LeaveCollection(URL_TIMESHEET_LEAVE);