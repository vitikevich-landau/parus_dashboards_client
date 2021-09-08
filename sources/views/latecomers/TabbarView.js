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
		let emplIDs = null;
		
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
						/***
						 * 	Drop filters
						 * */
						
						if (id === "timeSheet") {
							if (emplIDs) {
								$$("employees:multiselect").setValue(emplIDs.split(","));
							}
							
							$$("from:datepicker").setValue(null);
							$$("to:datepicker").setValue(null);
							
							$$("timeSheet").disable();
							
							Promise.all([
								reloadTimeSheetTables(URL_TIMESHEET_ARRIVAL, enterCollection, $$("enter:datatable")),
								reloadTimeSheetTables(URL_TIMESHEET_LEAVE, exitCollection, $$("exit:datatable"))
							])
								.catch(() => webix.message({type: "error", text: "Ошибка соединения с сервером"}))
								.finally(() => $$("timeSheet").enable());
						} else {
							reloadLatecomersTable(`${API_SERVICE_URL}/latecomers`, $$("latecomers"));
						}
					}
					
					prevTab = id;
					
					if (!emplIDs) {
						emplIDs = $$("employees:multiselect").getValue();
						
					}
				}
			}
		};
	}
}