import DatepickerView from "jet-views/latecomers/timesheet/DatepickerView";
import {arrivalCollection} from "../../../models/ArrivalCollection";
import {employeesFilter, fromDateFilter, toDateFilter} from "../../../utils/functions";
import {leaveCollection} from "../../../models/LeaveCollection";

export class ToDatepickerView  extends DatepickerView {
	config() {
		return {
			...super.config(),
			label: "По",
			id: "to:datepicker",
			on: {
				onChange: function (newValue, oldValue, config) {
					const $$from = $$("from:datepicker")
					const fromValue = $$from.getValue();
					
					$$from.getPopup().getBody().config.maxDate =
						newValue === null ? undefined : newValue
					$$from.refresh();
					
					arrivalCollection.getData().filter(
						v => fromDateFilter(v, fromValue)
							&& toDateFilter(v, newValue)
							&& employeesFilter(v)
					);
					leaveCollection.getData().filter(
						v => fromDateFilter(v, fromValue)
							&& toDateFilter(v, newValue)
							&& employeesFilter(v)
					);
				}
			}
		};
	}
}