import {JetView} from "webix-jet";
import {datatableDetailsCollection} from "../../../models/charts/latecomers/DatatableDetailsCollection";

export default class DatatableView extends JetView {
	config() {
		return {
			id: "latecomers:details",
			view: "datatable",
			gravity: .5,
			columns: [
				{id: "ROWNUM", header: "#", adjust: "data"},
				{id: "FULLNAME", header: "ФИО", fillspace: true},
				// {id: "OP_DAY", header: "Сегодня", adjust: "header"},
				{
					id: "OP_MONTH",
					header: "С начала года",
					adjust: "header",
					css: {
						"text-align": "center"
					}
				},
			],
			select: true
		};
	}
	
	init(_$view, _$) {
		super.init(_$view, _$);
		
		_$view.parse(datatableDetailsCollection.data);
	}
}