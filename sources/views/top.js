import {JetView} from "webix-jet";
import TimeEditorPopupView from "jet-views/latecomers/timesheet/TimeEditorPopupView";
import SidebarMenuView from "jet-views/SidebarMenuView";


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
		
		/***
		 *  Set Locale
		 * */
		webix.i18n.setLocale("ru-RU");
		
		/***
		 *  disable browser context menu
		 * */
		_$view.$view.oncontextmenu = () => false;
	}
	
	
	ready(_$view, _$url) {
		super.ready(_$view, _$url);
		
		/***
		 * 	Add popups to App
		 * */
		this._leftPopup = new TimeEditorPopupView(
			this.app,
			"Arrival time editor",
			"left"
		);
		
		this._rightPopup = new TimeEditorPopupView(
			this.app,
			"Leave time editor",
			"right"
		);
		
		webix.ui(
			this._leftPopup.config()
		);
		
		webix.ui(
			this._rightPopup.config()
		);
	}
	
}