import ControlSidebar from "jet-views/dashboards/overdue_events/ControlSidebar";
import {JetView} from "webix-jet";
import GageChartView from "jet-views/dashboards/overdue_events/GageChartView";
import ComplexChartView from "jet-views/dashboards/overdue_events/ComplexChartView";


export default class OverdueEventsView extends JetView {
	config() {
		return {
			rows: [
				{
					view: "toolbar",
					elements: [
						{},
						{
							view: "icon",
							icon: "mdi mdi-menu",
							click: () => {
								const $$controls = $$("overdue_events:control_panel");
								
								if ($$controls.isVisible()) {
									$$controls.hide();
								} else {
									$$controls.show();
								}
							}
						},
					]
				},
				{
					cols: [
						{
							rows: [
								ComplexChartView,
								{view: "resizer"},
								{
									cols: [
										GageChartView,
									],
								}
							]
						},
						// {view: "resizer"},
						ControlSidebar
					],
				},
			]
		};
	}
}

