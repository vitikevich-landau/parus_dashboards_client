import {JetView, plugins} from "webix-jet";

export default class SidebarMenuView extends JetView {
	
	config() {
		return {
			view: "sidebar",
			id: "left_sidebar:menu",
			css: "webix_sidebar webix_dark",
			width: 240,
			scroll: "auto",
			data: [
				{
					id: "dashboards",
					icon: "mdi mdi-view-dashboard",
					value: "Панель Мониторинга",
					data: [
						{id: "latecomers_charts", value: "Опоздания"},
						{id: "overdue_events", value: "Просроченные события"}
					]
				},
				{
					id: "tables",
					icon: "mdi mdi-table",
					value: "Таблицы с данными",
					data: [
						{id: "data", value: "График дежурства"},
						{id: "latecomers", value: "Табель"},
					]
				},
				// {
				//   id: "layouts",
				//   icon: "mdi mdi-view-column",
				//   value: "Layouts",
				//   data: [
				//     {id: "accordions", value: "Accordions"},
				//     {id: "portlets", value: "Portlets"}
				//   ]
				// }
			]
		};
	}
	
	init(_$view, _$) {
		super.init(_$view, _$);
		
		_$view.open("dashboards");
		
		/***
		 *  Menu plugin
		 * */
		this.use(plugins.Menu, "left_sidebar:menu");
		
	}
}