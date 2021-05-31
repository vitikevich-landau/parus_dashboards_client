import {JetView} from "webix-jet";
import {COLORS} from "../../../config";
import {lineChartCollection} from "../../../models/charts/latecomers/LineChartCollection";


export default class LineChartView extends JetView {
	config() {
		return {
			view: "chart",
			id: "latecomers:line_chart",
			// height: 350,
			type: "line",
			value: "#VAL#",
			// borderless: true,
			label: "#VAL#",
			item: {
				borderColor: COLORS.c_1293f8,
				shadow: true,
				radius: 5,
			},
			line: {
				color: COLORS.c_1293f8,
				width: 3
			},
			xAxis: {
				template: "#DAY#",
				title: "День"
			},
			offset: 0,
			yAxis: {
				title: "Количество",
				template: function (v) {
					return (v % 1 ? "" : v);
				},
			},
			tooltip: {
				template: obj => {
					if (obj.FIO_LIST) {
						const names = obj.FIO_LIST.split(";").filter(v => v);
						return names.join("<br>");
					}
					return "Нет данных";
				}
			},
			// legend: {
			// 	values: [
			// 		{
			// 			text: new Date().toLocaleString("default", {month: "long"}),
			// 			color: COLORS.c_1293f8
			// 		}
			// 	],
			// 	align: "center",
			// 	valign: "top",
			// 	layout: "x",
			// 	// width: 100,
			// 	// margin: 8
			// },
		};
	}
	
	init(_$view, _$) {
		super.init(_$view, _$);
		
		_$view.parse(lineChartCollection.data);
	}
}