import {JetView} from "webix-jet";
import calendar_icons from "jet-views/latecomers/calendar_icons";

const {icons: {today: {template}, clear}} = calendar_icons;

export default class DatepickerView extends JetView {
	config() {
		return {
			view: "datepicker",
			labelWidth: 30,
			labelAlign: "right",
			width: 160,
			icons: [
				{
					template,
					on_click: {
						"webix_cal_icon_today": function () {
							this.setValue(webix.Date.datePart(new Date()), true);
							this.callEvent("onTodaySet", [this.getSelectedDate()]);
						}
					}
				},
				clear
			]
		};
	}
}