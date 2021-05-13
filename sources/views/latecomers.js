import {JetView} from "webix-jet";
import {TabbarView} from "jet-views/latecomers/TabbarView";
import {TabbarCellsView} from "jet-views/latecomers/TabbarCellsView";

export default class Latecomers extends JetView {
	config() {
		return {
			rows: [
				TabbarView,
				TabbarCellsView
			]
		};
	}
}