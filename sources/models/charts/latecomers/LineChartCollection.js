import {BaseChartCollection} from "./BaseChartCollection";
import {LATECOMERS_LINE_CHART_URL} from "../../../config";

class LineChartCollection extends BaseChartCollection {
	constructor(chartId) {
		super(chartId);
	}
	
	url(day, month, year) {
		return `${LATECOMERS_LINE_CHART_URL}/${day}/${month}/${year}`;
	}
}

export const lineChartCollection = new LineChartCollection("latecomers:line_chart");