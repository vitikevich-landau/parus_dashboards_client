import LineChartView from "jet-views/dashboards/latecomers/LineChartView";
import DatatableView from "jet-views/dashboards/latecomers/DatatableView";
import PieChartView from "jet-views/dashboards/latecomers/PieChartView";
import BarChartView from "jet-views/dashboards/latecomers/BarChartView";

export default {
	cols: [
		{
			id: "latecomers_charts",
			rows: [
				{
					cols: [
						PieChartView,
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
				}
			]
		},
		{view: "resizer"},
		// {template: "control panel", width: 280}
	],
};
