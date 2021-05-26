import {JetView} from "webix-jet";
import {pieChartCollection} from "../../../models/charts/latecomers/PieChartCollection";

export default class PieChartView extends JetView {
	config() {
		return {
			id: "latecomers:pie_chart",
			// width: 500,
			gravity: .5,
			view: "chart",
			type: "donut",
			value: "#VAL#",
			tooltip: "#FULLNAME#",
			pieInnerText: "#VAL#",
			// borderless: true,
			legend: {
				template: (obj) => obj.FULLNAME.split(" ")[0],
				align: "left",
				valign: "middle",
				layout: "y",
				width: 100,
				margin: 8
			},
			css: "pie-inner-text",
		};
	}
	
	init(_$view, _$) {
		super.init(_$view, _$);
		
		_$view.parse(pieChartCollection.data);
	}
	
	urlChange(_$view, _$url) {
		super.urlChange(_$view, _$url);
		
		pieChartCollection.refresh();
	}

}