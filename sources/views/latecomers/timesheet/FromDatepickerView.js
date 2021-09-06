import DatepickerView from "jet-views/latecomers/timesheet/DatepickerView";
import {employeesFilter, fromDateFilter, toDateFilter} from "../../../utils/functions";
import {enterCollection} from "../../../models/enterCollection";
import {exitCollection} from "../../../models/exitCollection";

export class FromDatepickerView extends DatepickerView {
	config() {
		return {
			...super.config(),
			id: "from:datepicker",
			label: "С",
			on: {
				onChange: function (newValue, oldValue, config) {
					const $$to = $$("to:datepicker");
					const toValue = $$to.getValue();
					
					$$to.getPopup().getBody().config.minDate = newValue;
					$$to.refresh();
					
					enterCollection.filter(
						v => fromDateFilter(v, newValue)
							&& toDateFilter(v, toValue)
							&& employeesFilter(v)
					);
					exitCollection.filter(
						v => fromDateFilter(v, newValue)
							&& toDateFilter(v, toValue)
							&& employeesFilter(v)
					);
				}
			}
		};
	}
}