import {JetView} from "webix-jet";
import {employees} from "../../../models/employees";

export default class EmployeesListView extends JetView {
	config() {
		return {
			view: "list",
			width: 300,
			// data: records,
			template: "#index#. #FULLNAME#",
			select: true,
			drag: "source",
			scroll: "auto",
		};
	}
	
	init(_$view, _$) {
		super.init(_$view, _$);
		
		_$view.parse(employees);
		
		_$view.$view.oncontextmenu = () => false;
	}
	
	ready(_$view, _$url) {
		super.ready(_$view, _$url);
		
		/***
		 * 	Add dynamic indexes
		 * */
		_$view.data.each(function (obj, i) {
			obj.index = i + 1;
		});
		
		_$view.refresh();
		
	}
}