import {JetView, plugins} from "webix-jet";
import {createState, link} from "jet-restate";
import TimeEditorPopupView from "jet-views/latecomers/timesheet/TimeEditorPopupView";


export default class TopView extends JetView {
	config() {
		const toolbar = {
			view: "toolbar",
			css: "webix_dark",
			elements: [
				{view: "icon", icon: "mdi mdi-menu", click: () => $$("sidebar:menu").toggle()},
				{view: "label", label: "PARUS BUSINESS"},
				{},
				// {view: "icon", icon: "mdi mdi-comment", badge: 4},
				// {view: "icon", icon: "mdi mdi-bell", badge: 10}
			]
		};
		
		const sidebar = {
			view: "sidebar",
			id: "sidebar:menu",
			css: "webix_sidebar webix_dark",
			width: 220,
			scroll: "auto",
			data: [
				{
					id: "dashboards",
					icon: "mdi mdi-view-dashboard",
					value: "Панель Мониторинга",
				},
				{
					id: "tables", icon: "mdi mdi-table", value: "Таблицы с данными", data: [
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
		
		return {
			id: "top",
			rows: [
				toolbar,
				{
					cols: [
						sidebar,
						{$subview: true},
					]
				}
			],
		};
	}
	
	init(_$view, _$) {
		super.init(_$view, _$);
		
		/***
		 *  Menu plugin
		 * */
		this.use(plugins.Menu, "sidebar:menu");
		
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