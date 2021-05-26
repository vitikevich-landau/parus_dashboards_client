import {JetView} from "webix-jet";
import {COLORS} from "../../../config";
import {lineChartCollection} from "../../../models/charts/LineChartCollection";


export default class LineChartView extends JetView {
	config() {
		return {
			view: "chart",
			id: "latecomers:line_chart",
			height: 350,
			type: "line",
			value: "#val#",
			// borderless: true,
			label: "#val#",
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
				title: "Количество",
				template: function (v) {
					return (v % 1 ? "" : v);
				},
			},
			tooltip: {
				template: "Опозданий: #val#"
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