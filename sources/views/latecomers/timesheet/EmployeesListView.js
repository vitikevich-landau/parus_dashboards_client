import {JetView} from "webix-jet";
import {employees} from "../../../models/employees";
import {leaveCollection} from "../../../models/LeaveCollection";
import {arrivalCollection} from "../../../models/ArrivalCollection";

export default class EmployeesListView extends JetView {
	config() {
		return {
			view: "list",
			id: "employees_list",
			width: 300,
			// data: records,
			template: "#index#. #FULLNAME#",
			select: true,
			drag: true,
			scroll: "auto",
			on: {
				onBeforeDrop: function (context, e) {
					const {from} = context;
					
					if (from !== this) {
						const dataSrote =
							from.config.id === "right"
								? leaveCollection.getData()
								: arrivalCollection.getData();
						
						webix.confirm({
							title: "Внимание!",
							type: "confirm-warning",
							text: "Это приведёт к удалению из БД. Удалить запись?"
						})
							.then(() => {
								dataSrote.remove(context.start);
							});
					}
					
					return false;
				}
			}
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