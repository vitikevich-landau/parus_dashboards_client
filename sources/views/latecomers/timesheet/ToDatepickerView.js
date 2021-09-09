import DatepickerView from "jet-views/latecomers/timesheet/DatepickerView";
import {employeesFilter, fromDateFilter, toDateFilter} from "../../../utils/functions";
import {enterCollection} from "../../../models/enterCollection";
import {exitCollection} from "../../../models/exitCollection";

export class ToDatepickerView extends DatepickerView {
	config() {
		return {
			...super.config(),
			label: "По",
			id: "to:datepicker",
			on: {
				onChange: function (newValue, oldValue, config) {
					const $$from = $$("from:datepicker");
					let fromValue = $$from.getValue();
					
					if (fromValue) {
						fromValue = webix.Date.datePart(fromValue, true);
					}
					
					$$from.getPopup().getBody().config.maxDate =
						newValue === null ? undefined : newValue;
					$$from.refresh();
					
					enterCollection.filter(
						v => fromDateFilter(v, fromValue)
							&& toDateFilter(v, newValue)
							&& employeesFilter(v)
					);
					exitCollection.filter(
						v => fromDateFilter(v, fromValue)
							&& toDateFilter(v, newValue)
							&& employeesFilter(v)
					);
				}
			}
		};
	}
}