import {JetView} from "webix-jet";
import SidebarMenuView from "jet-views/SidebarMenuView";
import {timeEditorPopup as exitTimeEditorPopup} from "jet-views/latecomers/timesheet/exit_time_editor";
import {timeEditorPopup as enterTimeEditorPopup} from "jet-views/latecomers/timesheet/enter_time_editor";
import {date} from "jet-views/latecomers/timesheet/config";


export default class TopView extends JetView {
	config() {
		const toolbar = {
			view: "toolbar",
			css: "webix_dark",
			elements: [
				{view: "icon", icon: "mdi mdi-menu", click: () => $$("left_sidebar:menu").toggle()},
				{view: "label", label: "PARUS BUSINESS"},
				{},
				// {view: "icon", icon: "mdi mdi-comment", badge: 4},
				// {view: "icon", icon: "mdi mdi-bell", badge: 10}
			]
		};
		
		return {
			id: "top",
			rows: [
				toolbar,
				{
					cols: [
						SidebarMenuView,
						{$subview: true},
					]
				}
			],
		};
	}
	
	init(_$view, _$) {
		super.init(_$view, _$);
		
		webix.Date.startOnMonday = true;
		
		/***
		 *  Set Locale
		 * */
		webix.i18n.setLocale("ru-RU");
		
		/***
		 *  disable browser context menu
		 * */
		_$view.$view.oncontextmenu = () => false;
		
		webix.ui(exitTimeEditorPopup);
		webix.ui(enterTimeEditorPopup);
		
		webix.editors.$popup.date = date;
	}
}