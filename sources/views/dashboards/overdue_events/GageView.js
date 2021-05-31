import {JetView} from "webix-jet";

export default class GageView extends JetView {
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
}