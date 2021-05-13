import {proxyWithThrottle, URL_TIMESHEET_LEAVE} from "./config";

export default class TimeSheetCollection {
	constructor(url) {
		this._url = url;
		this._data = new webix.DataCollection({
			save: proxyWithThrottle(this._url),
			on: {
				onBeforeLoad: function () {
					console.log("onBeforeLoad");
					// console.log($$("left"));
				},
				onAfterLoad: function () {
					console.log("onAfterLoad");
					// console.log($$("left"));
				}
			}
		});
	}
	
	refresh() {
		this._data.clearAll();
		this._data.load({
			$proxy: true,
			load: (view, params) => {
				return webix.ajax().get(this._url)
					.then(response => response.json())
					.then(json => {
						return json.map(v => {
							// console.log(json);
							const data = {...v};
							const [date] = v["DT"].split("T");
							const [_, time] = v["TM"].split("T");
							const [year, month, day] = date.split("-");
							const [hours, minutes] = time.split(":");
							
							data["DT"] = new Date(Date.UTC(year, month - 1, day));
							data["TM"] = new Date(Date.UTC(year, month - 1, day, hours, minutes));
							
							return data;
						});
					});
			}
		});
		
	}
	
	getData() {
		return this._data;
	}
}