import {JetView} from "webix-jet";
import {employees} from "../../../models/employees";
import {employeesFilter, fromDateFilter, toDateFilter} from "../../../utils/functions";
import {enterCollection} from "../../../models/enterCollection";
import {exitCollection} from "../../../models/exitCollection";

export default class EmployeesMultiselectView extends JetView {
	config() {
		return {
			view: "multiselect",
			id: "employees:multiselect",
			width: 300,
			options: {
				data: employees,
			},
			suggest: {
				body: {
					yCount: 15,
					data: employees,
					template: "#FULLNAME#"
				},
				selectAll: true,
			},
			on: {
				onChange: function (newValue, oldValue, config) {
					const fromValue = $$("from:datepicker").getValue();
					const toValue = $$("to:datepicker").getValue();
					
					enterCollection.filter(
						v => fromDateFilter(v, fromValue)
							&& toDateFilter(v, toValue)
							&& employeesFilter(v)
					);
					exitCollection.filter(
						v => fromDateFilter(v, fromValue)
							&& toDateFilter(v, toValue)
							&& employeesFilter(v)
					);
				}
			}
		};
	}
	
	init(_$view, _$) {
		super.init(_$view, _$);
		
		employees.waitData.then(() => {
			_$view.setValue(employees.data.order);
		});
	}
	
}