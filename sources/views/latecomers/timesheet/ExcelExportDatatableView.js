import {JetView} from "webix-jet";
import {configs} from "jet-views/latecomers/timesheet/config";

export class ExcelExportDatatableView extends JetView {
	config() {
		const {columns} = configs;
		const extendedCols = [
			...columns,
			...columns.map(v => ({...v, id: `${v.id}-ADD`}))
		];
		
		console.log(extendedCols);
		
		return {
			view: "datatable",
			id: "excel:export",
			hidden: true,
			columns: extendedCols
		};
	}
}