import {BaseChartCollection} from "./BaseChartCollection";
import {LATECOMERS_BAR_CHART_URL} from "../../../config";

class BarChartCollection  extends BaseChartCollection{
	url() {
		return LATECOMERS_BAR_CHART_URL;
	}
}

export const barChartCollection = new BarChartCollection("latecomers:bar_chart");