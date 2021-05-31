import {JetView} from "webix-jet";
import {gageChartCollection} from "../../../models/charts/overdue_events/GageChartCollection";
import {splitArrayByHalf} from "../../../utils/functions";

export default class ControlSidebar extends JetView {
	removeRows(viewId) {
		const $$view = $$(viewId);
		$$view.removeView("firstRow");
		$$view.removeView("secondRow");
		$$view.removeView("catch_error");
	}
	
	addRow(viewId, rowId) {
		$$(viewId).addView({
			id: rowId,
			type: "wide",
			cols: []
		});
	}
	
	addGage(data, viewId) {
		data.forEach(v => {
			const gage = {
				id: webix.uid(),
				view: "gage",
				value: 0,
				minRange: v.MINRANGE,
				maxRange: v.MAXRANGE,
				label: v.LABEL,
				width: 150,
				height: 180,
			};
			
			$$(viewId).addView(gage);
			
			webix.delay(
				() => $$(gage.id).setValue(v.VALUE),
				null,
				null,
				350
			);
		});
	}
	
	config() {
		return {
			id: "overdue_events:control_panel",
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
							
							gageChartCollection.refresh(day, month, year)
								.then(response => {
									const json = response.json();
									const {left, right} = splitArrayByHalf(json);
									
									/***
									 * 	Remove if exists
									 * */
									this.removeRows("scrollview:body");
									
									/***
									 *	Add rows
									 * */
									this.addRow("scrollview:body", "firstRow");
									this.addRow("scrollview:body", "secondRow");
									
									if (json.length) {
										this.addGage(left, "firstRow");
										this.addGage(right, "secondRow");
									} else {
										/***
										 * 	Remove if no data
										 * */
										this.removeRows("scrollview:body");
										
										$$("scrollview:body").addView({
											id: "catch_error",
											type: "clean",
											template: "Нет данных"
										});
									}
									
								})
								.catch(e => {
									/***
									 * 	Remove if exists
									 * */
									this.removeRows("scrollview:body");
									
									$$("scrollview:body").addView({
										id: "catch_error",
										type: "clean",
										template: "Нет данных"
									});
									
									console.log(e);
								})
								.finally(() => {
									console.log("finally");
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