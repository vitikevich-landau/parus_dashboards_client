import {JetView} from "webix-jet";
import {employees} from "../../../models/employees";
import {arrivalCollection} from "../../../models/ArrivalCollection";
import {leaveCollection} from "../../../models/LeaveCollection";
import {employeesFilter, fromDateFilter, toDateFilter} from "../../../utils/functions";

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
					
					arrivalCollection.getData().filter(
						v => fromDateFilter(v, fromValue)
							&& toDateFilter(v, toValue)
							&& employeesFilter(v)
					);
					leaveCollection.getData().filter(
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