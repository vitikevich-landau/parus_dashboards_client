import {JetView} from "webix-jet";
import {barChartCollection} from "../../../models/charts/latecomers/BarChartCollection";
import {COLORS} from "../../../config";

export default class BarChartView extends JetView {
	config() {
		return {
			id: "latecomers:bar_chart",
			view: "chart",
			type: "bar",
			value: "#VAL#",
			label: "#VAL#",
			color: COLORS.c_1293f8,
			xAxis: {
				template: "#MONTH#",
				title: "Месяц"
			},
			yAxis: {
				title: "Количество",
				template: function (v) {
					return (v % 5 ? "" : v);
				},
			},
		};
	}
	
	init(_$view, _$) {
		super.init(_$view, _$);
		
		_$view.parse(barChartCollection.data);
	}
	
	urlChange(_$view, _$url) {
		super.urlChange(_$view, _$url);
		
		barChartCollection.refresh();
	}

}