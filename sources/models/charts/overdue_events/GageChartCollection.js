import {BaseChartCollection} from "../latecomers/BaseChartCollection";
import {OVERDUE_GAGE_CHART_URL} from "../../../config";

class GageChartCollection extends BaseChartCollection {
	
	url(day, month, year) {
		return `${OVERDUE_GAGE_CHART_URL}/${day}/${month}/${year}`;
	}
}

export const gageChartCollection = new GageChartCollection("scrollview:gage");