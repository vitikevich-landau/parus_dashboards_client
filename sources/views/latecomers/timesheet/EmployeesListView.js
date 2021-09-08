import {JetView} from "webix-jet";
import {employees} from "../../../models/employees";
import {exitCollection} from "../../../models/exitCollection";
import {enterCollection} from "../../../models/enterCollection";
import {foundByRelID} from "jet-views/latecomers/timesheet/config";

export default class EmployeesListView extends JetView {
	config() {
		return {
			view: "list",
			id: "employees_list",
			width: 300,
			// data: records,
			template: "#ROWNUM#. #FULLNAME#",
			select: true,
			drag: true,
			scroll: "auto",
			on: {
				onBeforeDrop: function (context, e) {
					const {from} = context;
					
					if (from !== this) {
						
						webix.confirm({
							title: "Внимание!",
							type: "confirm-warning",
							text: "Это приведёт к удалению из БД. Удалить запись?"
						})
							.then(() => {
								const {REL_ID} = from.getItem(context.start);
								const {exit, enter} = foundByRelID(REL_ID);
								
								exitCollection.remove(exit.id);
								enterCollection.remove(enter.id);
								
								webix.message({
									text: `Запись: "${enter.FULLNAME}" удалена`,
									type: `success`,
									expire: 8000
								});
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
	
}