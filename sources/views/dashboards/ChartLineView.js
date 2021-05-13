import {JetView} from "webix-jet";
import {API_SERVICE_URL, COLORS} from "../../config";


export default class ChartLineView extends JetView {
	config() {
		const today = new Date();
		const month = today.getMonth() + 1;
		const year = today.getFullYear();
		
		return {
			view: "chart",
			id: "chartLine",
			// data: chartCollection,
			url: `${API_SERVICE_URL}/dashboards/chart/${month}/${year}`,
			height: 350,
			type: "line",
			value: "#lates#",
			// borderless: true,
			item: {
				borderColor: COLORS.c_1293f8,
			},
			line: {
				color: COLORS.c_1293f8,
				width: 3
			},
			xAxis: {
				template: "#day#",
				title: "Дни"
			},
			offset: 0,
			yAxis: {
				title: "Значение",
				template: function (v) {
					return (v % 1 ? "" : v);
				},
			},
			tooltip: {
				template: "Количество: #lates#"
			},
			// legend: {
			// 	values: [
			// 		{
			// 			text: today.toLocaleString("default", {month: "long"}),
			// 			color: COLORS.c_1293f8
			// 		}
			// 	],
			// 	align: "right",
			// 	valign: "middle",
			// 	layout: "y",
			// 	width: 100,
			// 	margin: 8
			// },
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