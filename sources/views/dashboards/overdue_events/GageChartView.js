import {JetView} from "webix-jet";
import {gageChartCollection} from "../../../models/charts/overdue_events/GageChartCollection";
import {splitArrayByHalf} from "../../../utils/functions";
import {addGage, addRow, removeRows} from "jet-views/dashboards/overdue_events/utils";

export default class GageChartView extends JetView {
	config() {
		return {
			id: "scrollview:gage",
			view: "scrollview",
			scroll: "auto",
			// height: 360,
			body: {
				id: "scrollview:body",
				type: "space",
				rows: [
					{
						id: "firstRow",
						type: "wide",
						cols: []
					},
					{
						id: "secondRow",
						type: "wide",
						cols: []
					}
				]
			}
		};
	}
	
	ready(_$view, _$url) {
		super.ready(_$view, _$url);
		const today = new Date();
		const day = today.getDate();
		const month = today.getMonth() + 1;
		const year = today.getFullYear();
		
		
		gageChartCollection.refresh(day, month, year)
			.then(response => {
				const json = response.json();
				const {left, right} = splitArrayByHalf(json);
				
				removeRows("scrollview:body");
				
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
			.catch(error => {
				console.log(error);
				removeRows("scrollview:body");
			});
	}
}