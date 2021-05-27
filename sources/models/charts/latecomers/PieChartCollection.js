import {LATECOMERS_PIE_CHART_URL} from "../../../config";
import {BaseChartCollection} from "./BaseChartCollection";

class PieChartCollection extends BaseChartCollection {
	constructor(chartId) {
		super(chartId);
	}
	
	url(day, month, year) {
		return `${LATECOMERS_PIE_CHART_URL}/${day}/${month}/${year}`;
	}
}

export const pieChartCollection = new PieChartCollection("latecomers:pie_chart");