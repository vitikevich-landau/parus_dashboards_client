import {JetView} from "webix-jet";

export default class DatatableView extends JetView {
	config() {
		return {template: "Datatable..."};
		// return {
		// 	view: "datatable",
		// 	id: "datatable",
		// 	columns: [
		// 		{id: "fullname", header: "ФИО", fillspace: true},
		// 		{id: "cumulate", header: "Накопительный", adjust: "header"},
		// 		{id: "current_day", header: "Текущий"}
		// 	]
		// };
	}
}