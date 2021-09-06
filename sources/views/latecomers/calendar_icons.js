export default {
	icons: {
		//default "today" icon
		today: {
			template: function () {
				return "<span class='webix_cal_icon_today webix_cal_icon'>"
					+ webix.i18n.calendar.today
					+ "</span>";
			},
			on_click: {
				"webix_cal_icon_today": function () {
					this.setValue(new Date());
					this.callEvent("onTodaySet", [this.getSelectedDate()]);
				}
			}
		},
		//default "clear" icon
		clear: {
			template: function () {
				return "<span class='webix_cal_icon_clear webix_cal_icon'>"
					+ webix.i18n.calendar.clear
					+ "</span>";
			},
			on_click: {
				"webix_cal_icon_clear": function () {
					this.setValue("");
					this.callEvent("onDateClear", [this.getSelectedDate()]);
				}
			}
		}
	}
};