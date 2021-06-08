import {BaseChartCollection} from "../latecomers/BaseChartCollection";
import {OVERDUE_COMPLEX_CHART_URL} from "../../../config";

class ComplexChartCollection extends BaseChartCollection {
	
	url(day, month, year) {
		return `${OVERDUE_COMPLEX_CHART_URL}/${day}/${month}/${year}`;
	}
}

export const complexChartCollection = new ComplexChartCollection("overdue:complex_chart");