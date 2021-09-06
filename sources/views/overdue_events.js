import ControlSidebar from "jet-views/dashboards/overdue_events/ControlSidebar";
import {JetView} from "webix-jet";
import GageChartView from "jet-views/dashboards/overdue_events/GageChartView";
import StackedBarChartView from "jet-views/dashboards/overdue_events/StackedBarChartView";
import LineChartView from "jet-views/dashboards/overdue_events/LineChartView";


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
								LineChartView,
								{view: "resizer"},
								StackedBarChartView,
								{view: "resizer"},
								{
									cols: [
										GageChartView,
									],
								}
							]
						},
						ControlSidebar
					],
				},
			]
		};
	}
}

