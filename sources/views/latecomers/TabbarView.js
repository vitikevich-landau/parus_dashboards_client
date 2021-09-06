import {JetView} from "webix-jet";
import {enterCollection} from "../../models/enterCollection";
import {exitCollection} from "../../models/exitCollection";
import {URL_TIMESHEET_ARRIVAL, URL_TIMESHEET_LEAVE} from "../../models/config";
import {reloadTimeSheetTables} from "jet-views/latecomers/timesheet/config";
import {API_SERVICE_URL} from "../../config";
import reloadLatecomersTable from "jet-views/latecomers/functions";

export class TabbarView extends JetView {
	config() {
		/***
		 * 	prev active tab
		 * */
		let prevTab = "workSheet";
		
		return {
			view: "tabbar",
			id: "tabbar",
			multiview: true,
			optionWidth: 220,
			height: 36,
			options: [
				{value: "Табель", id: "workSheet"},
				{value: "ВХОД/ВЫХОД", id: "timeSheet"},
			],
			on: {
				onAfterTabClick(id, e) {
					if (prevTab !== id) {
						if (id === "timeSheet") {
							reloadTimeSheetTables(URL_TIMESHEET_ARRIVAL, enterCollection, $$("enter:datatable"));
							reloadTimeSheetTables(URL_TIMESHEET_LEAVE, exitCollection, $$("exit:datatable"));
						} else {
							reloadLatecomersTable(`${API_SERVICE_URL}/latecomers`, $$("latecomers"));
						}
					}
					
					prevTab = id;
				}
			}
		};
	}
}