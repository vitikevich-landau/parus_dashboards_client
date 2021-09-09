import {throttle} from "../utils/functions";
import {API_SERVICE_URL} from "../config";

export const URL_TIMESHEET_ARRIVAL = API_SERVICE_URL + "/timesheet/arrival";
export const URL_TIMESHEET_LEAVE = API_SERVICE_URL + "/timesheet/leave";

export const proxyWithThrottle = url => webix.proxy("rest", url, {
	// save: throttle(function (view, params) {
	// 	return webix.proxy.rest.save.call(this, view, params);
	// }, 1500)
	save: throttle(function (view, params) {
		const promise = webix.proxy.rest.save.call(this, view, params);
		/***
		 * 	Debug
		 * */
		promise
			.then(response => response.json())
			.then(json => console.log(json));
		
		return promise;
	}, 500)
});

export function loadData(url) {
	return function () {
		return webix.ajax().get(url)
			.then(response => response.json())
			.then(json => {
				return json.map(v => {
					const data = {...v};
					const [date] = v["DT"].split("T");
					const [, time] = v["TM"].split("T");
					const [year, month, day] = date.split("-");
					const [hours, minutes] = time.split(":");
					
					data["DT"] = webix.Date.datePart(new Date(Date.UTC(year, month - 1, day)), true);
					data["TM"] = new Date(Date.UTC(year, month - 1, day, hours, minutes));
					
					return data;
				});
			});
	};
}