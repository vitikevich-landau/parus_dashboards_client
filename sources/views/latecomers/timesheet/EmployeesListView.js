import {JetView} from "webix-jet";
import {employees} from "../../../models/employees";
import {exitCollection} from "../../../models/exitCollection";
import {enterCollection} from "../../../models/enterCollection";

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
						const dataSrote =
							from.config.id === "exit:datatable"
								? exitCollection
								: enterCollection;
						
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

}