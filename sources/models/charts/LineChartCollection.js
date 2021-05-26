import {BaseChartCollection} from "./BaseChartCollection";
import {Utils} from "jet-views/dashboards/Utils";
import {LATECOMERS_LINE_CHART_URL} from "../../config";

class LineChartCollection extends BaseChartCollection {
	constructor(chartId) {
		super(chartId);
	}
	
	url() {
		const {month, year} = Utils.monthYear();
		
		return `${LATECOMERS_LINE_CHART_URL}/${month}/${year}`;
	}
}

export const lineChartCollection = new LineChartCollection("latecomers:line_chart");