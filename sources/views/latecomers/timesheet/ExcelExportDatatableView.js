import BaseDatatableView from "jet-views/latecomers/timesheet/BaseDatatableView";

export class ExcelExportDatatableView extends BaseDatatableView {
	config() {
		const {view, columns} = super.config();
		
		return {
			view,
			id: "excel:export",
			hidden: true,
			columns
		};
	}
}