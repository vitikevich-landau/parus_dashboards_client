import {JetView} from "webix-jet";
import TimeEditorPopupView from "jet-views/latecomers/timesheet/TimeEditorPopupView";

export class TabbarView extends JetView {
	config() {
		return {
			view: "tabbar",
			id: "tabbar",
			multiview: true,
			optionWidth: 220,
			height: 36,
			options: [
				{value: "Табель", id: "workSheet"},
				{value: "Прибытие/Выбытие", id: "timeSheet"},
			]
		};
	}
}