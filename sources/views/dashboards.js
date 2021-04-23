import {chartCollection} from "../models/chartCollection";
import ChartLineView from "jet-views/dashboards/ChartLineView";
import DatatableView from "jet-views/dashboards/DatatableView";
import ChartPieView from "jet-views/dashboards/ChartPieView";

// chartCollection
// 	.waitData
// 	.then(() => console.log(chartCollection.serialize()));

export default {
	cols: [
		{
			rows: [
				{
					cols: [
						ChartPieView,
						ChartLineView,
					]
				},
				DatatableView
			]
		},
		{view: "resizer"},
		{template: "control panel", width: 280}
	],
	
};
