import {JetView} from "webix-jet";
import {pieCollection} from "../../models/chartCollection";
import {API_SERVICE_URL, COLORS} from "../../config";

export default class ChartPieView extends JetView {
	config() {
		const today = new Date();
		const month = today.getMonth() + 1;
		const year = today.getFullYear();
		
		// const colors = Object.values(COLORS);
		
		return {
			// width: 500,
			gravity: .52,
			url: `${API_SERVICE_URL}/dashboards/pie/${month}/${year}`,
			view: "chart",
			type: "donut",
			value: "#count#",
			tooltip: "#fullname#",
			pieInnerText: "#count#",
			// borderless: true,
			legend: {
				template: (obj) => obj.fullname.split(" ")[0],
				align: "left",
				valign: "middle",
				layout: "y",
				width: 100,
				margin: 8
			},
			css: "pie-inner-text",
			on: {
				onBeforeLoad: function () {
					webix.extend(this, webix.ProgressBar);
					this.showProgress();
				},
				onAfterLoad: function () {
					this.hideProgress();
				}
			}
		};
	}
	
	init(_$view, _$) {
		super.init(_$view, _$);
	}
	
}