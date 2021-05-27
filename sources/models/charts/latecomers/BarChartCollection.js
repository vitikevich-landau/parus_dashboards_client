import {BaseChartCollection} from "./BaseChartCollection";
import {LATECOMERS_BAR_CHART_URL} from "../../../config";

class BarChartCollection extends BaseChartCollection {
	url(day, month, year) {
		return `${LATECOMERS_BAR_CHART_URL}/${day}/${month}/${year}`;
	}
}

export const barChartCollection = new BarChartCollection("latecomers:bar_chart");