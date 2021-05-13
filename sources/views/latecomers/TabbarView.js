import {JetView} from "webix-jet";

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
				{value: "ВЫХОД/ВХОД", id: "timeSheet"},
			]
		};
	}
}