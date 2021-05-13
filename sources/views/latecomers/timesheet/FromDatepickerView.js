import DatepickerView from "jet-views/latecomers/timesheet/DatepickerView";
import {arrivalCollection} from "../../../models/ArrivalCollection";
import {leaveCollection} from "../../../models/LeaveCollection";
import {employeesFilter, fromDateFilter, toDateFilter} from "../../../utils/functions";

export class FromDatepickerView extends DatepickerView {
	config() {
		return {
			...super.config(),
			id: "from:datepicker",
			label: "С",
			on: {
				onChange: function (newValue, oldValue, config) {
					const $$to =  $$("to:datepicker");
					const toValue = $$to.getValue();
					
					$$to.getPopup().getBody().config.minDate = newValue
					$$to.refresh();
					
					arrivalCollection.getData().filter(
						v => fromDateFilter(v, newValue)
							&& toDateFilter(v, toValue)
							&& employeesFilter(v)
					);
					leaveCollection.getData().filter(
						v => fromDateFilter(v, newValue)
							&& toDateFilter(v, toValue)
							&& employeesFilter(v)
					);
				}
			}
		};
	}
}