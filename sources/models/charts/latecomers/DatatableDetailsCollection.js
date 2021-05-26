import {BaseChartCollection} from "./BaseChartCollection";
import {LATECOMERS_DETAILS_DATATABLE_URL} from "../../../config";

class DatatableDetailsCollection extends BaseChartCollection {
	constructor(chartId) {
		super(chartId);
	}
	
	url() {
		return LATECOMERS_DETAILS_DATATABLE_URL;
	}
}

export const datatableDetailsCollection = new DatatableDetailsCollection("latecomers:details");