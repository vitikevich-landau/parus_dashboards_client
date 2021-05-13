import {JetView} from "webix-jet";
import latecomers_toolbar from "jet-views/latecomers/latecomers_toolbar";
import LatecomersDatatableView from "jet-views/latecomers/LatecomersDatatableView";
import EmployeesListView from "jet-views/latecomers/timesheet/EmployeesListView";
import EmployeesMultiselectView from "jet-views/latecomers/timesheet/EmployeesMultiselectView";
import {FromDatepickerView} from "jet-views/latecomers/timesheet/FromDatepickerView";
import {ToDatepickerView} from "jet-views/latecomers/timesheet/ToDatepickerView";
import {ExcelExportIconView} from "jet-views/latecomers/timesheet/ExcelExportIconView";
import ArrivalDatatableView from "jet-views/latecomers/timesheet/ArrivalDatatableView";
import LeaveDatatableView from "jet-views/latecomers/timesheet/LeaveDatatableView";
import {ExcelExportDatatableView} from "jet-views/latecomers/timesheet/ExcelExportDatatableView";

export class TabbarCellsView extends JetView {
	config() {
		return {
			animate: {
				type: "slide",
				// direction:"top",
				duration: 350
			},
			cells: [
				{
					id: "workSheet",
					rows: [
						latecomers_toolbar,
						LatecomersDatatableView
					],
				},
				{
					id: "timeSheet",
					cols: [
						EmployeesListView,
						{
							rows: [
								{
									cols: [
										EmployeesMultiselectView,
										FromDatepickerView,
										ToDatepickerView,
										{},
										ExcelExportIconView,
									]
								},
								{
									cols: [
										{header: "ВЫХОД", body: LeaveDatatableView, id: "tabbar:exit"},
										{header: "ВХОД", body: ArrivalDatatableView, id: "tabbar:enter"},
										ExcelExportDatatableView
									]
								}
							]
						}
					]
				}
			]
		};
	}
	
	init(_$view, _$) {
		super.init(_$view, _$);
		
		/***
		 * 	url change, store reload
		 * */
	}
	
	ready(_$view, _$url) {
		super.ready(_$view, _$url);
		
		webix.html.addCss(
			$$("tabbar:exit")
				.getNode()
				.getElementsByClassName("webix_accordionitem_label")
				[0],
			"red"
		);
		
		webix.html.addCss(
			$$("tabbar:enter")
				.getNode()
				.getElementsByClassName("webix_accordionitem_label")
				[0],
			"green"
		);
		
	}
	
}