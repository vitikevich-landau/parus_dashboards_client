import {JetView} from "webix-jet";
import {gageChartCollection} from "../../../models/charts/overdue_events/GageChartCollection";
import {splitArrayByHalf} from "../../../utils/functions";
import {complexChartCollection} from "../../../models/charts/overdue_events/ComplexChartCollection";
import {COLORS} from "../../../config";
import {
	GAGE_ANIMATE_DELAY,
	addRow,
	addGage,
	removeRows
} from "jet-views/dashboards/overdue_events/utils";


export default class ControlSidebar extends JetView {
	
	
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
							
							const $$parent = $$("overdue:complex_chart").getParentView();
							$$parent.removeView("overdue:complex_chart");
							$$parent.addView({
								id: "overdue:complex_chart",
								view: "chart",
								type: "stackedBar",
							}, 0);
							
							complexChartCollection.refresh(day, month, year)
								.then(response => {
									const json = response.json();
									const step = 50;
									const max = Math.max(...json.map(v => v.NMAX));
									const res = max + (step % max) - (max % Math.pow(10, step.toString().length));
									const end = res > max ? res : res + step;
									const shift = 15;
									
									
									const $$parent = $$("overdue:complex_chart").getParentView();
									$$parent.removeView("overdue:complex_chart");
									
									$$parent.addView({
										id: "overdue:complex_chart",
										view: "chart",
										type: "stackedBar",
										// scale: "logarithmic",
										xAxis: {
											template: "#DAY#",
											title: "День",
										},
										yAxis: {
											title: "Количество",
											start: 0,
											step,
											end
										},
										legend: {
											values: [
												{text: "Просроченные (Завершенные)", color: COLORS.c_ee4339},
												{text: "Просроченные (Открытые)", color: COLORS.c_eed236},
												{text: "Остальные", color: COLORS.c_eeeeee},
												{text: "Просроченные", color: COLORS.c_1293f8, markerType: "item"}
											],
											valign: "middle",
											align: "right",
											layout: "x"
										},
										on: {
											onItemClick(id, e, node) {
												const type = node.getAttribute("userdata");
												const {DAY, M, Y} = this.getItem(id);
												
												/***
												 * 	Remove if exists
												 * */
												removeRows("scrollview:body");
												
												gageChartCollection.refresh(DAY, M, Y, type)
													.then(response => {
														const json = response.json();
														let {left, right} = splitArrayByHalf(json);
														
														/***
														 * 	Add current date
														 * */
														left = left.map(v => ({...v, PLACEHOLDER: new Date(Y, +M - 1, DAY)}));
														right = right.map(v => ({...v, PLACEHOLDER: new Date(Y, +M - 1, DAY)}));
														
														/***
														 *	Add rows
														 * */
														addRow("scrollview:body", "firstRow");
														addRow("scrollview:body", "secondRow");
														
														if (json.length) {
															addGage(left, "firstRow");
															addGage(right, "secondRow");
														} else {
															/***
															 * 	Remove if no data
															 * */
															removeRows("scrollview:body");
															
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
														removeRows("scrollview:body");
														
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
										},
										series: [
											{
												value: o => o.VAL_ZAKR ? o.VAL_ZAKR + shift : o.VAL_ZAKR,
												color: COLORS.c_ee4339,
												label: "#VAL_ZAKR#",
											},
											{
												value: o => o.VAL_OTKR ? o.VAL_OTKR + shift : o.VAL_OTKR,
												color: COLORS.c_eed236,
												label: "#VAL_OTKR#",
											},
											{
												value: o => o.VAL_OTHER ? o.VAL_OTHER + shift : o.VAL_OTHER,
												color: COLORS.c_eeeeee,
												label: "#VAL_OTHER#",
											},
											{
												type: "line",
												value: "#VAL_ACC#",
												label: "#VAL_ACC#",
												color: COLORS.c_1293f8,
												// offset:false,
												item: {
													borderColor: COLORS.c_1293f8,
													shadow: true,
													radius: 5,
													type: "s"
												},
												line: {
													color: COLORS.c_1293f8,
													width: 3
												},
												tooltip: {
													template: obj => {
														if (obj.FIO_LIST) {
															const names = obj.FIO_LIST
																.split(";")
																.filter(v => v)
																.map((v, i) => `${i + 1}. ${v}`);
															return names.join("<br>");
														}
														return "Нет данных";
													}
												},
											}
										],
									}, 0);
									
									const $$chart = $$("overdue:complex_chart");
									
									$$chart.parse(json);
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