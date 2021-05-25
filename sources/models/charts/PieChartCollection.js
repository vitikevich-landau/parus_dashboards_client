import {PIE_CHART_URL} from "../../config";
import {BaseChartCollection} from "./BaseChartCollection";
import {Utils} from "jet-views/dashboards/Utils";

class PieChartCollection extends BaseChartCollection {
	constructor(chartId) {
		super(chartId);
	}
	
	url() {
		const {month, year} = Utils.monthYear();
		
		return `${PIE_CHART_URL}/${month}/${year}`;
	}
}

export const pieChartCollection = new PieChartCollection("latecomers:pie_chart");