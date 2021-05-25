import {JetView} from "webix-jet";
import {API_SERVICE_URL, COLORS} from "../../config";
import {lineChartCollection} from "../../models/charts/LineChartCollection";


export default class LineChartView extends JetView {
	config() {
		return {
			view: "chart",
			id: "line_chart",
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
		};
	}
	
	init(_$view, _$) {
		super.init(_$view, _$);
		
		_$view.parse(lineChartCollection.data);
	}
	
	urlChange(_$view, _$url) {
		super.urlChange(_$view, _$url);
		
		lineChartCollection.refresh();
	}
}