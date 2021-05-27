import {JetView} from "webix-jet";
import {pieChartCollection} from "../../../models/charts/latecomers/PieChartCollection";
import {datatableDetailsCollection} from "../../../models/charts/latecomers/DatatableDetailsCollection";
import {lineChartCollection} from "../../../models/charts/latecomers/LineChartCollection";
import {barChartCollection} from "../../../models/charts/latecomers/BarChartCollection";

export default class ControlSidebar extends JetView {
	config() {
		return {
			id: "latecomers:control_panel",
			rows: [
				{
					id: "calendar",
					view: "calendar",
					events: webix.Date.isHoliday,
					icons: [
						{
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
					],
					on: {
						onChange: (date, config) => {
							const [selected] = date;
							const year = selected.getFullYear();
							const month = selected.getMonth() + 1;
							const day = selected.getDate();
							
							pieChartCollection.refresh(day, month, year);
							lineChartCollection.refresh(day, month, year);
							barChartCollection.refresh(day, month, year);
							
							const $$details = $$("latecomers:details");
							
							console.log($$details);
							
							datatableDetailsCollection.refresh(day, month, year)
								.then(() => {
									const {pull} = datatableDetailsCollection.data.data;
									const data = Object.values(pull);
									const values = data.map(v => v.OP_MONTH);
									const max = Math.max(...values);
									
									$$details.eachRow(row => {
										const currRow = $$details.getItem(row);
										
										if (currRow.OP_MONTH === max) {
											$$details.addRowCss(currRow.id, "datatable-skipped");
										} else if (currRow.OP_MONTH) {
											$$details.addRowCss(currRow.id, "latecomers-active");
										}
									});
								});
							
						}
					}
				},
				{}
			]
		};
	}
	
	init(_$view, _$) {
		super.init(_$view, _$);
		
		$$("calendar").selectDate(new Date());
	}
}