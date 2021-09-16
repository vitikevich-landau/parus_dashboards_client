import {proxyWithThrottle, URL_TIMESHEET_ARRIVAL} from "./config";

export const enterCollection = new webix.DataCollection({
	save: proxyWithThrottle(URL_TIMESHEET_ARRIVAL),
});
