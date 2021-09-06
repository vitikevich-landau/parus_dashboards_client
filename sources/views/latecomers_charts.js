import LineChartView from "jet-views/dashboards/latecomers/LineChartView";
import DatatableView from "jet-views/dashboards/latecomers/DatatableView";
import PieChartView from "jet-views/dashboards/latecomers/PieChartView";
import BarChartView from "jet-views/dashboards/latecomers/BarChartView";
import ControlSidebar from "jet-views/dashboards/latecomers/ControlSidebar";

export default {
	rows: [
		{
			view: "toolbar",
			elements: [
				{},
				{
					view: "icon",
					icon: "mdi mdi-menu",
					click: () => {
						const $$controls = $$("latecomers:control_panel");
						
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
					id: "latecomers_charts",
					rows: [
						{
							cols: [
								{
									gravity: .6,
									rows: [
										{
											template: "За месяц",
											height: 35,
											css: {
												"font-size": "140%",
												"color": "darkred",
												"text-align": "right"
											}
										},
										PieChartView
									]
								},
								{view: "resizer"},
								LineChartView,
							]
						},
						{view: "resizer"},
						{
							cols: [
								DatatableView,
								{view: "resizer"},
								BarChartView
							]
						},
					]
				},
				ControlSidebar
			],
		}
	]
};
