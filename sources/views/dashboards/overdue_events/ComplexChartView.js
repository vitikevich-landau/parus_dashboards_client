import {JetView} from "webix-jet";
import {lineChartCollection} from "../../../models/charts/latecomers/LineChartCollection";
import {complexChartCollection} from "../../../models/charts/overdue_events/ComplexChartCollection";
import {COLORS} from "../../../config";



export default class ComplexChartView extends JetView {
	config() {
		return {
			id: "overdue:complex_chart",
			view: "chart",
			type: "stackedBar",
		};
	}
}
