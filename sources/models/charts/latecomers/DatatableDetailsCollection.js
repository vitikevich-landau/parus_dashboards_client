import {BaseChartCollection} from "./BaseChartCollection";
import {LATECOMERS_DETAILS_DATATABLE_URL} from "../../../config";

class DatatableDetailsCollection extends BaseChartCollection {
	constructor(chartId) {
		super(chartId);
	}
	
	url(day, month, year) {
		return `${LATECOMERS_DETAILS_DATATABLE_URL}/${day}/${month}/${year}`;
	}
}

export const datatableDetailsCollection = new DatatableDetailsCollection("latecomers:details");