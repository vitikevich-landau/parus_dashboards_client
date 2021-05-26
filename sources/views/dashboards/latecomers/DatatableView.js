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
				{id: "OP_DAY", header: "Сегодня", adjust: "header"},
				{id: "OP_MONTH", header: "За месяц", adjust: "header"},
			],
			select: true
		};
	}
	
	init(_$view, _$) {
		super.init(_$view, _$);
		
		_$view.parse(datatableDetailsCollection.data);
	}
	
	urlChange(_$view, _$url) {
		super.urlChange(_$view, _$url);
		
		datatableDetailsCollection.refresh().then(() => {
			const {pull} = datatableDetailsCollection.data.data;
			const data = Object.values(pull);
			const values = data.map(v => v.OP_MONTH);
			const max = Math.max(...values);
			
			_$view.eachRow(row => {
				const currRow = _$view.getItem(row);
				
				if (currRow.OP_MONTH === max) {
					_$view.addRowCss(currRow.id, "datatable-skipped");
				} else if (currRow.OP_MONTH) {
					_$view.addRowCss(currRow.id, "latecomers-active");
				}
			});
		});
	}
	
	
}