import {loadData, proxyWithThrottle, URL_TIMESHEET_ARRIVAL} from "./config";

export const enterCollection = new webix.DataCollection({
	url: loadData(URL_TIMESHEET_ARRIVAL),
	save: proxyWithThrottle(URL_TIMESHEET_ARRIVAL),
});
