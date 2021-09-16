import {proxyWithThrottle, URL_TIMESHEET_LEAVE} from "./config";

export const exitCollection = new webix.DataCollection({
	save: proxyWithThrottle(URL_TIMESHEET_LEAVE),
});
