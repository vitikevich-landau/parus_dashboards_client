import {JetView} from "webix-jet";
import {configs} from "jet-views/latecomers/timesheet/config";

export class ExcelExportDatatableView extends JetView {
	config() {
		const {columns} = configs;
		return {
			view: "datatable",
			id: "excel:export",
			hidden: true,
			columns
		};
	}
}