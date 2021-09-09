import {JetView} from "webix-jet";


export default class DatepickerView extends JetView {
	config() {
		return {
			view: "datepicker",
			labelWidth: 30,
			labelAlign: "right",
			width: 160,
		};
	}
}