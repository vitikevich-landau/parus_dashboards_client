import {loadData, proxyWithThrottle, URL_TIMESHEET_LEAVE} from "./config";

export const exitCollection = new webix.DataCollection({
	url: loadData(URL_TIMESHEET_LEAVE),
	save: proxyWithThrottle(URL_TIMESHEET_LEAVE),
});
